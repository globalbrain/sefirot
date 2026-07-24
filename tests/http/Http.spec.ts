import { Readable } from 'node:stream'
import { type FetchOptions, type FetchResponse, Http } from 'sefirot/http/Http'
import { type HttpClient, useHttpConfig } from 'sefirot/stores/HttpConfig'

vi.mock('sefirot/support/File', () => ({
  saveAs: vi.fn()
}))

describe('http/Http', () => {
  beforeEach(() => {
    document.cookie = 'XSRF-TOKEN=; Max-Age=0; Path=/'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('refreshes a stale Sanctum CSRF token and retries once after a 419', async () => {
    document.cookie = 'XSRF-TOKEN=stale; Path=/'
    let requestCount = 0
    const recoverSession = vi.fn(async () => true)

    const client = vi.fn(async (request, options) => {
      if (request === '/api/csrf-cookie') {
        document.cookie = 'XSRF-TOKEN=fresh; Path=/'
        return
      }

      requestCount++

      if (requestCount === 1) {
        expect(xsrfHeader(options)).toBe('stale')
        throw httpError(419)
      }

      expect(xsrfHeader(options)).toBe('fresh')
      return 'ok'
    })

    const http = setupHttp(client, { recoverSession })

    await expect(http.post('/api/items', { name: 'item' })).resolves.toBe('ok')
    expect(recoverSession).not.toHaveBeenCalled()
    expect(client.mock.calls.map(([request]) => request)).toEqual([
      '/api/items',
      '/api/csrf-cookie',
      '/api/items'
    ])
  })

  it('shares a CSRF refresh across concurrent 419 responses', async () => {
    document.cookie = 'XSRF-TOKEN=stale; Path=/'
    const attempts = new Map<string, number>()
    let releaseRefresh: () => void
    const refresh = new Promise<void>((resolve) => {
      releaseRefresh = resolve
    })

    const client = vi.fn(async (request) => {
      if (request === '/api/csrf-cookie') {
        await refresh
        document.cookie = 'XSRF-TOKEN=fresh; Path=/'
        return
      }

      const url = String(request)
      const attempt = (attempts.get(url) ?? 0) + 1
      attempts.set(url, attempt)

      if (attempt === 1) {
        throw httpError(419)
      }

      return url
    })

    const config = useHttpConfig()
    config.apply({ client })
    const requests = Promise.all([
      new Http(config).post('/api/one'),
      new Http(config).post('/api/two')
    ])

    await vi.waitFor(() => {
      expect(client.mock.calls.filter(([request]) => request === '/api/csrf-cookie')).toHaveLength(1)
    })

    releaseRefresh!()

    await expect(requests).resolves.toEqual(['/api/one', '/api/two'])
  })

  it('does not retry a second 419 response', async () => {
    document.cookie = 'XSRF-TOKEN=stale; Path=/'

    const client = vi.fn(async (request) => {
      if (request === '/api/csrf-cookie') {
        document.cookie = 'XSRF-TOKEN=fresh; Path=/'
        return
      }

      throw httpError(419)
    })

    const http = setupHttp(client)

    await expect(http.post('/api/items')).rejects.toMatchObject({ status: 419 })
    expect(client.mock.calls.map(([request]) => request)).toEqual([
      '/api/items',
      '/api/csrf-cookie',
      '/api/items'
    ])
  })

  it('can recover the session after repairing a 419', async () => {
    document.cookie = 'XSRF-TOKEN=stale; Path=/'
    let requestCount = 0
    const recoverSession = vi.fn(async () => true)

    const client = vi.fn(async (request) => {
      if (request === '/api/csrf-cookie') {
        document.cookie = 'XSRF-TOKEN=fresh; Path=/'
        return
      }

      requestCount++
      if (requestCount === 1) {
        throw httpError(419)
      }
      if (requestCount === 2) {
        throw httpError(401)
      }

      return 'ok'
    })
    const http = setupHttp(client, { recoverSession })

    await expect(http.post('/api/items')).resolves.toBe('ok')
    expect(recoverSession).toHaveBeenCalledOnce()
    expect(client.mock.calls.map(([request]) => request)).toEqual([
      '/api/items',
      '/api/csrf-cookie',
      '/api/items',
      '/api/items'
    ])
  })

  it('recovers the application session and rebuilds the request after a 401', async () => {
    document.cookie = 'XSRF-TOKEN=valid; Path=/'
    let requestCount = 0
    const recoverSession = vi.fn(async () => true)

    const client = vi.fn(async (request, options) => {
      requestCount++

      if (requestCount === 1) {
        expect(xsrfHeader(options)).toBe('valid')
        throw httpError(401)
      }

      expect(xsrfHeader(options)).toBe('valid')
      return 'ok'
    })

    const http = setupHttp(client, { recoverSession })

    await expect(http.post('/api/items')).resolves.toBe('ok')
    expect(recoverSession).toHaveBeenCalledOnce()
    expect(client).toHaveBeenCalledTimes(2)
  })

  it('does not retry a 401 when the application session cannot be restored', async () => {
    const recoverSession = vi.fn(async () => false)
    const error = httpError(401)
    const client = vi.fn(async (request) => {
      if (request === '/api/csrf-cookie') {
        return
      }

      throw error
    })
    const http = setupHttp(client, { recoverSession })

    await expect(http.get('/api/items')).rejects.toBe(error)
    expect(recoverSession).toHaveBeenCalledOnce()
    expect(client).toHaveBeenCalledOnce()
  })

  it('does not recover a second 401 response', async () => {
    const recoverSession = vi.fn(async () => true)
    const client = vi.fn(async () => {
      throw httpError(401)
    })
    const http = setupHttp(client, { recoverSession })

    await expect(http.get('/api/items')).rejects.toMatchObject({ status: 401 })
    expect(recoverSession).toHaveBeenCalledOnce()
    expect(client).toHaveBeenCalledTimes(2)
  })

  it('can opt an authentication bootstrap request out of session recovery', async () => {
    const recoverSession = vi.fn(async () => true)
    const client = vi.fn(async (request) => {
      if (request === '/api/csrf-cookie') {
        return
      }

      throw httpError(401)
    })
    const http = setupHttp(client, { recoverSession })

    await expect(
      http.get('/api/auth/check', { sessionRecovery: false })
    ).rejects.toMatchObject({ status: 401 })

    expect(recoverSession).not.toHaveBeenCalled()
    expect(client).toHaveBeenCalledOnce()
  })

  it('still repairs a bootstrap request after a 419 without recovering the session', async () => {
    document.cookie = 'XSRF-TOKEN=stale; Path=/'
    const recoverSession = vi.fn(async () => true)
    let requestCount = 0

    const client = vi.fn(async (request) => {
      if (request === '/api/csrf-cookie') {
        document.cookie = 'XSRF-TOKEN=fresh; Path=/'
        return
      }

      requestCount++
      if (requestCount === 1) {
        throw httpError(419)
      }

      return 'ok'
    })
    const http = setupHttp(client, { recoverSession })

    await expect(
      http.post('/api/auth/exchange', undefined, { sessionRecovery: false })
    ).resolves.toBe('ok')

    expect(recoverSession).not.toHaveBeenCalled()
    expect(client).toHaveBeenCalledTimes(3)
  })

  it('shares session recovery across concurrent 401 responses', async () => {
    const attempts = new Map<string, number>()
    let releaseRecovery: () => void
    const recovery = new Promise<void>((resolve) => {
      releaseRecovery = resolve
    })
    const recoverSession = vi.fn(async () => {
      await recovery
      return true
    })

    const client = vi.fn(async (request) => {
      const url = String(request)
      const attempt = (attempts.get(url) ?? 0) + 1
      attempts.set(url, attempt)

      if (attempt === 1) {
        throw httpError(401)
      }

      return url
    })

    const config = useHttpConfig()
    config.apply({ client, recoverSession })

    const requests = Promise.all([
      new Http(config).get('/api/one'),
      new Http(config).get('/api/two')
    ])

    await vi.waitFor(() => {
      expect(client).toHaveBeenCalledTimes(2)
    })
    expect(recoverSession).toHaveBeenCalledOnce()

    releaseRecovery!()

    await expect(requests).resolves.toEqual(['/api/one', '/api/two'])
    expect(client).toHaveBeenCalledTimes(4)
  })

  it('reuses a completed recovery for a delayed 401 from the same session', async () => {
    const attempts = new Map<string, number>()
    let releaseDelayedResponse: () => void
    const delayedResponse = new Promise<void>((resolve) => {
      releaseDelayedResponse = resolve
    })
    const recoverSession = vi.fn(async () => true)

    const client = vi.fn(async (request) => {
      const url = String(request)
      const attempt = (attempts.get(url) ?? 0) + 1
      attempts.set(url, attempt)

      if (url === '/api/two' && attempt === 1) {
        await delayedResponse
      }

      if (attempt === 1) {
        throw httpError(401)
      }

      return url
    })
    const http = setupHttp(client, { recoverSession })

    const firstRequest = http.get('/api/one')
    const delayedRequest = http.get('/api/two')

    await expect(firstRequest).resolves.toBe('/api/one')
    releaseDelayedResponse!()
    await expect(delayedRequest).resolves.toBe('/api/two')

    expect(recoverSession).toHaveBeenCalledOnce()
  })

  it('samples the recovery generation after asynchronous request construction', async () => {
    let releaseHeaders: () => void
    const delayedHeaders = new Promise<void>((resolve) => {
      releaseHeaders = resolve
    })
    let headerRequestCount = 0
    const headers = vi.fn(async () => {
      headerRequestCount++
      if (headerRequestCount === 1) {
        await delayedHeaders
      }
      return {}
    })
    const recoverSession = vi.fn(async () => true)
    let recoveryRequestCount = 0
    const client = vi.fn(async (request) => {
      const url = String(request)

      if (url === '/api/recover') {
        recoveryRequestCount++
        if (recoveryRequestCount === 1) {
          throw httpError(401)
        }
        return url
      }

      if (recoverSession.mock.calls.length < 2) {
        throw httpError(401)
      }

      return url
    })
    const config = useHttpConfig()
    config.apply({ client, headers, recoverSession })
    const http = new Http(config)

    const requestBuiltAfterRecovery = http.get('/api/after-recovery')
    await vi.waitFor(() => {
      expect(headers).toHaveBeenCalledOnce()
    })

    await expect(http.get('/api/recover')).resolves.toBe('/api/recover')
    expect(recoverSession).toHaveBeenCalledOnce()

    releaseHeaders!()

    await expect(requestBuiltAfterRecovery).resolves.toBe('/api/after-recovery')
    expect(recoverSession).toHaveBeenCalledTimes(2)
  })

  it('does not recover status-shaped errors thrown while building a request', async () => {
    const error = httpError(401)
    const headers = vi.fn(async () => {
      throw error
    })
    const recoverSession = vi.fn(async () => true)
    const client = vi.fn()
    const config = useHttpConfig()
    config.apply({ client, headers, recoverSession })
    const http = new Http(config)

    await expect(http.get('/api/items')).rejects.toBe(error)

    expect(headers).toHaveBeenCalledOnce()
    expect(recoverSession).not.toHaveBeenCalled()
    expect(client).not.toHaveBeenCalled()
  })

  it.each([401, 419])('does not retry a %i response with a one-shot body', async (status) => {
    document.cookie = 'XSRF-TOKEN=valid; Path=/'
    const error = httpError(status)
    const recoverSession = vi.fn(async () => true)
    const client = vi.fn(async () => {
      throw error
    })
    const http = setupHttp(client, { recoverSession })

    await expect(
      http.put('/api/items', new ReadableStream())
    ).rejects.toBe(error)

    expect(recoverSession).not.toHaveBeenCalled()
    expect(client).toHaveBeenCalledOnce()
  })

  it('does not retry a response with a Node stream body', async () => {
    document.cookie = 'XSRF-TOKEN=valid; Path=/'
    const error = httpError(401)
    const recoverSession = vi.fn(async () => true)
    const client = vi.fn(async () => {
      throw error
    })
    const http = setupHttp(client, { recoverSession })

    await expect(
      http.put('/api/items', Readable.from('content'))
    ).rejects.toBe(error)

    expect(recoverSession).not.toHaveBeenCalled()
    expect(client).toHaveBeenCalledOnce()
  })

  it('does not retry a response with an async iterable body', async () => {
    document.cookie = 'XSRF-TOKEN=valid; Path=/'

    async function* body(): AsyncGenerator<string> {
      yield 'content'
    }

    const error = httpError(401)
    const recoverSession = vi.fn(async () => true)
    const client = vi.fn(async (_request, options) => {
      for await (const chunk of options?.body as AsyncIterable<string>) {
        expect(chunk).toBe('content')
      }
      throw error
    })
    const http = setupHttp(client, { recoverSession })

    await expect(
      http.put('/api/items', body())
    ).rejects.toBe(error)

    expect(recoverSession).not.toHaveBeenCalled()
    expect(client).toHaveBeenCalledOnce()
  })

  it('does not retry a response with a one-shot sync iterator body', async () => {
    document.cookie = 'XSRF-TOKEN=valid; Path=/'

    function* body(): Generator<string> {
      yield 'content'
    }

    const error = httpError(401)
    const recoverSession = vi.fn(async () => true)
    const client = vi.fn(async (_request, options) => {
      for (const chunk of options?.body as Iterable<string>) {
        expect(chunk).toBe('content')
      }
      throw error
    })
    const http = setupHttp(client, { recoverSession })

    await expect(
      http.put('/api/items', body())
    ).rejects.toBe(error)

    expect(recoverSession).not.toHaveBeenCalled()
    expect(client).toHaveBeenCalledOnce()
  })

  it('does not retry a response with a bare one-shot iterator body', async () => {
    document.cookie = 'XSRF-TOKEN=valid; Path=/'

    const values = ['content']
    const body = {
      next: (): IteratorResult<string> => values.length
        ? { done: false, value: values.shift()! }
        : { done: true, value: undefined }
    }
    const error = httpError(401)
    const recoverSession = vi.fn(async () => true)
    const client = vi.fn(async (_request, options) => {
      const iterator = options?.body as Iterator<string>
      while (!iterator.next().done) {
        // Consume the one-shot body before returning the response.
      }
      throw error
    })
    const http = setupHttp(client, { recoverSession })

    await expect(
      http.put('/api/items', body)
    ).rejects.toBe(error)

    expect(recoverSession).not.toHaveBeenCalled()
    expect(client).toHaveBeenCalledOnce()
  })

  it('does not apply Sanctum behavior to third-party URLs', async () => {
    document.cookie = 'XSRF-TOKEN=secret; Path=/'
    const error = httpError(401)
    const recoverSession = vi.fn(async () => true)
    const client = vi.fn(async (_request, options) => {
      expect(xsrfHeader(options)).toBeNull()
      throw error
    })
    const config = useHttpConfig()
    config.apply({
      baseUrl: 'https://app.example.com',
      client,
      recoverSession
    })
    const http = new Http(config)

    await expect(
      http.post('/items', undefined, {
        baseURL: 'https://example.com'
      })
    ).rejects.toBe(error)

    expect(recoverSession).not.toHaveBeenCalled()
    expect(client).toHaveBeenCalledOnce()
  })

  it('matches request scoping when baseURL is explicitly undefined', async () => {
    document.cookie = 'XSRF-TOKEN=secret; Path=/'
    const error = httpError(401)
    const recoverSession = vi.fn(async () => true)
    const client = vi.fn(async (_request, options) => {
      expect(options?.baseURL).toBeUndefined()
      expect(xsrfHeader(options)).toBeNull()
      throw error
    })
    const config = useHttpConfig()
    config.apply({
      baseUrl: 'https://app.example.com',
      client,
      recoverSession
    })
    const http = new Http(config)

    await expect(
      http.post('/items', undefined, { baseURL: undefined })
    ).rejects.toBe(error)

    expect(recoverSession).not.toHaveBeenCalled()
    expect(client).toHaveBeenCalledOnce()
  })

  it('recovers absolute URLs on the configured application origin', async () => {
    let requestCount = 0
    const recoverSession = vi.fn(async () => true)
    const client = vi.fn(async () => {
      requestCount++
      if (requestCount === 1) {
        throw httpError(401)
      }
      return 'ok'
    })
    const config = useHttpConfig()
    config.apply({
      baseUrl: 'https://app.example.com/api',
      client,
      recoverSession
    })
    const http = new Http(config)

    await expect(
      http.get('https://app.example.com/items')
    ).resolves.toBe('ok')

    expect(recoverSession).toHaveBeenCalledOnce()
    expect(client).toHaveBeenCalledTimes(2)
  })

  it('uses the page origin when the configured base URL is empty', async () => {
    let requestCount = 0
    const recoverSession = vi.fn(async () => true)
    const client = vi.fn(async () => {
      requestCount++
      if (requestCount === 1) {
        throw httpError(401)
      }
      return 'ok'
    })
    const config = useHttpConfig()
    config.apply({
      baseUrl: '',
      client,
      recoverSession
    })
    const http = new Http(config)

    await expect(
      http.get(new URL('/items', location.href).href)
    ).resolves.toBe('ok')

    expect(recoverSession).toHaveBeenCalledOnce()
    expect(client).toHaveBeenCalledTimes(2)
  })

  it('recovers relative application URLs with a relative base URL during SSR', async () => {
    vi.stubGlobal('location', undefined)
    let requestCount = 0
    const recoverSession = vi.fn(async () => true)
    const client = vi.fn(async () => {
      requestCount++
      if (requestCount === 1) {
        throw httpError(401)
      }
      return 'ok'
    })
    const config = useHttpConfig()
    config.apply({
      baseUrl: '/api',
      client,
      recoverSession
    })
    const http = new Http(config)

    await expect(http.get('/items')).resolves.toBe('ok')

    expect(recoverSession).toHaveBeenCalledOnce()
    expect(client).toHaveBeenCalledTimes(2)
  })

  it('does not recover absolute URLs when the application origin is unavailable during SSR', async () => {
    vi.stubGlobal('location', undefined)
    const error = httpError(401)
    const recoverSession = vi.fn(async () => true)
    const client = vi.fn(async () => {
      throw error
    })
    const config = useHttpConfig()
    config.apply({
      baseUrl: '/api',
      client,
      recoverSession
    })
    const http = new Http(config)

    await expect(
      http.get('https://example.com/items')
    ).rejects.toBe(error)

    expect(recoverSession).not.toHaveBeenCalled()
    expect(client).toHaveBeenCalledOnce()
  })

  it.each([
    ' https://example.com/items',
    '\0https://example.com/items',
    '//sefirot.invalid/items'
  ])('does not recover externally resolving URL %j during SSR', async (url) => {
    vi.stubGlobal('location', undefined)
    document.cookie = 'XSRF-TOKEN=secret; Path=/'
    const error = httpError(401)
    const recoverSession = vi.fn(async () => true)
    const client = vi.fn(async (_request, options) => {
      expect(xsrfHeader(options)).toBeNull()
      throw error
    })
    const config = useHttpConfig()
    config.apply({
      baseUrl: '/api',
      client,
      recoverSession
    })
    const http = new Http(config)

    await expect(
      http.post(url)
    ).rejects.toBe(error)

    expect(recoverSession).not.toHaveBeenCalled()
    expect(client).toHaveBeenCalledOnce()
  })

  it('leaves callback errors observable', async () => {
    const error = new Error('Identity provider is unavailable.')
    const recoverSession = vi.fn(async () => {
      throw error
    })
    const client = vi.fn(async (request) => {
      if (request === '/api/csrf-cookie') {
        return
      }

      throw httpError(401)
    })
    const http = setupHttp(client, { recoverSession })

    await expect(http.get('/api/items')).rejects.toBe(error)
    expect(client).toHaveBeenCalledOnce()
  })

  it('leaves CSRF refresh errors observable', async () => {
    document.cookie = 'XSRF-TOKEN=stale; Path=/'
    const refreshError = new Error('CSRF endpoint is unavailable.')

    const client = vi.fn(async (request) => {
      if (request === '/api/csrf-cookie') {
        throw refreshError
      }

      throw httpError(419)
    })
    const http = setupHttp(client)

    await expect(http.post('/api/items')).rejects.toBe(refreshError)
    expect(client).toHaveBeenCalledTimes(2)
  })

  it('does not recover unrelated HTTP errors', async () => {
    const recoverSession = vi.fn(async () => true)
    const client = vi.fn(async () => {
      throw httpError(403)
    })
    const http = setupHttp(client, { recoverSession })

    await expect(http.get('/api/items')).rejects.toMatchObject({ status: 403 })
    expect(recoverSession).not.toHaveBeenCalled()
    expect(client).toHaveBeenCalledOnce()
  })

  it('does not repair a 419 when XSRF support is disabled', async () => {
    const recoverSession = vi.fn(async () => true)
    const client = vi.fn(async () => {
      throw httpError(419)
    })
    const config = useHttpConfig()
    config.apply({
      client,
      recoverSession,
      xsrfUrl: false
    })
    const http = new Http(config)

    await expect(http.post('/api/items')).rejects.toMatchObject({ status: 419 })
    expect(recoverSession).not.toHaveBeenCalled()
    expect(client).toHaveBeenCalledOnce()
  })

  it('applies session recovery to raw download requests', async () => {
    const recoverSession = vi.fn(async () => true)
    const client = Object.assign(
      vi.fn(async () => undefined),
      {
        raw: vi.fn(async () => {
          if (client.raw.mock.calls.length === 1) {
            throw httpError(401)
          }

          return Object.assign(new Response(), {
            _data: new Blob(['content'])
          }) as FetchResponse<Blob>
        })
      }
    )
    const http = setupHttp(client, { recoverSession })

    await expect(http.download('/api/download')).resolves.toBeUndefined()
    expect(recoverSession).toHaveBeenCalledOnce()
    expect(client).not.toHaveBeenCalled()
    expect(client.raw).toHaveBeenCalledTimes(2)
  })
})

function setupHttp(
  client: HttpClient,
  options: {
    recoverSession?: () => Promise<boolean>
  } = {}
): Http {
  const config = useHttpConfig()
  config.apply({ client, ...options })
  return new Http(config)
}

function xsrfHeader(options: unknown): string | null {
  return new Headers((options as FetchOptions | undefined)?.headers).get('X-Xsrf-Token')
}

function httpError(status: number): Error & { status: number } {
  return Object.assign(new Error(`HTTP ${status}`), { status })
}
