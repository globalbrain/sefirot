import { parse as parseContentDisposition } from '@tinyhttp/content-disposition'
import { parse as parseCookie } from '@tinyhttp/cookie'
import { FetchError, type FetchOptions, type FetchResponse } from 'ofetch'
import { stringify } from 'qs'
import { saveAs } from '../support/File'
import { getHttpStatusCode, objectToFormData } from '../support/Http'

type Config = ReturnType<typeof import('../stores/HttpConfig').useHttpConfig>
type BuiltRequest = [url: string, options: FetchOptions]

export type HttpRequestOptions = FetchOptions & {
  /**
   * Prevent this request from recursively recovering the application session.
   * Authentication bootstrap requests should disable session recovery.
   */
  sessionRecovery?: false
}

const xsrfRefreshes = new WeakMap<Config, Promise<void>>()
const sessionRecoveries = new WeakMap<Config, Promise<boolean>>()

async function runSingleFlight<T>(
  activeRequests: WeakMap<Config, Promise<T>>,
  config: Config,
  request: () => Promise<T>
): Promise<T> {
  const activeRequest = activeRequests.get(config)
  if (activeRequest) {
    return activeRequest
  }

  const nextRequest = Promise.resolve().then(request)
  activeRequests.set(config, nextRequest)

  try {
    return await nextRequest
  } finally {
    if (activeRequests.get(config) === nextRequest) {
      activeRequests.delete(config)
    }
  }
}

export class Http {
  private config: Config

  constructor(options: Config) {
    this.config = options
  }

  private async ensureXsrfToken(): Promise<string | undefined> {
    if (!this.config.xsrfUrl) {
      return undefined
    }

    let xsrfToken = parseCookie(document.cookie)['XSRF-TOKEN']

    if (!xsrfToken) {
      await this.refreshXsrfToken()
      xsrfToken = parseCookie(document.cookie)['XSRF-TOKEN']
    }

    return xsrfToken
  }

  private async refreshXsrfToken(): Promise<void> {
    const xsrfUrl = this.config.xsrfUrl
    if (!xsrfUrl) {
      return
    }

    return runSingleFlight(xsrfRefreshes, this.config, async () => {
      await this.config.client(...(await this.buildRequest(
        xsrfUrl,
        { method: 'HEAD' }
      )))
    })
  }

  private async recoverSession(): Promise<boolean> {
    const recoverSession = this.config.recoverSession
    if (!recoverSession) {
      return false
    }

    return runSingleFlight(sessionRecoveries, this.config, async () => {
      return recoverSession()
    })
  }

  private async buildRequest(url: string, _options: HttpRequestOptions = {}): Promise<BuiltRequest> {
    const { method, params, query, ...options } = _options
    delete options.sessionRecovery

    const xsrfToken = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method || '')
      && (await this.ensureXsrfToken())

    const queryString = stringify(
      { ...params, ...query },
      { encodeValuesOnly: true, ...this.config.stringifyOptions }
    )

    return [
      `${url}${queryString ? `?${queryString}` : ''}`,
      {
        baseURL: this.config.baseUrl,
        method,
        credentials: 'include',
        ...options,
        headers: {
          Accept: 'application/json',
          ...(await this.config.headers()),
          ...(xsrfToken && { 'X-Xsrf-Token': xsrfToken }),
          ...(this.config.lang && { 'Accept-Language': this.config.lang }),
          ...options.headers
        }
      }
    ]
  }

  private async execute<T>(
    url: string,
    options: HttpRequestOptions,
    send: (request: BuiltRequest) => Promise<T>
  ): Promise<T> {
    const attempt = async (
      xsrfRecovered = false,
      sessionRecovered = false
    ): Promise<T> => {
      try {
        return await send(await this.buildRequest(url, options))
      } catch (error) {
        const status = getHttpStatusCode(error)

        if (status === 419 && this.config.xsrfUrl && !xsrfRecovered) {
          await this.refreshXsrfToken()
          return attempt(true, sessionRecovered)
        }

        const canRecoverSession =
          options.sessionRecovery !== false
          && this.config.recoverSession != null
          && !sessionRecovered

        if (status === 401 && canRecoverSession) {
          if (await this.recoverSession()) {
            return attempt(xsrfRecovered, true)
          }
        }

        throw error
      }
    }

    return attempt()
  }

  private async performRequest<T>(url: string, options: HttpRequestOptions = {}): Promise<T> {
    return this.execute(
      url,
      options,
      (request) => this.config.client(...request)
    )
  }

  private async performRequestRaw<T>(
    url: string,
    options: HttpRequestOptions = {}
  ): Promise<FetchResponse<T>> {
    // 'raw' is unavailable in useRequestFetch() during SSR, but performRequestRaw is only
    // called by download, which runs client-side, so asserting raw's existence is safe
    return this.execute(
      url,
      options,
      (request) => this.config.client.raw!(...request)
    )
  }

  async get<T = any>(url: string, options?: HttpRequestOptions): Promise<T> {
    return this.performRequest<T>(url, { method: 'GET', ...options })
  }

  async head<T = any>(url: string, options?: HttpRequestOptions): Promise<T> {
    return this.performRequest<T>(url, { method: 'HEAD', ...options })
  }

  async post<T = any>(url: string, body?: any, options?: HttpRequestOptions): Promise<T> {
    if (body && !(body instanceof FormData)) {
      let hasFile = false

      const payload = JSON.stringify(body, (_, value) => {
        if (value instanceof Blob) {
          hasFile = true
          return undefined
        }
        return value
      })

      if (hasFile) {
        const formData = objectToFormData(body, undefined, undefined, true)
        formData.append(this.config.payloadKey, payload)
        body = formData
      } else {
        body = payload
      }
    }

    return this.performRequest<T>(url, { method: 'POST', body, ...options })
  }

  async put<T = any>(url: string, body?: any, options?: HttpRequestOptions): Promise<T> {
    return this.performRequest<T>(url, { method: 'PUT', body, ...options })
  }

  async patch<T = any>(url: string, body?: any, options?: HttpRequestOptions): Promise<T> {
    return this.performRequest<T>(url, { method: 'PATCH', body, ...options })
  }

  async delete<T = any>(url: string, options?: HttpRequestOptions): Promise<T> {
    return this.performRequest<T>(url, { method: 'DELETE', ...options })
  }

  async upload<T = any>(url: string, body?: any, options?: HttpRequestOptions): Promise<T> {
    return this.post<T>(url, objectToFormData(body), options)
  }

  async download(url: string, options?: HttpRequestOptions): Promise<void> {
    const { _data: blob, headers } =
      await this.performRequestRaw<Blob>(url, { method: 'GET', responseType: 'blob', ...options })

    let filename
    try {
      filename = parseContentDisposition(headers.get('Content-Disposition') || '').parameters.filename
    } catch {}

    saveAs(blob, filename as string | undefined)
  }
}

export function isFetchError(e: unknown): e is FetchError {
  return e instanceof FetchError || (e instanceof Error && e.name === 'FetchError')
}

export { FetchError, type FetchOptions, type FetchRequest, type FetchResponse } from 'ofetch'
