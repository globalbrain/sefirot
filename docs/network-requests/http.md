# Http <Badge text="3.9.0" />

`Http` module provides a set of functions for making HTTP requests.

## `Http`

The `Http` class. It uses [ofetch](https://github.com/unjs/ofetch) under the hood so that it can be smoothly used together with Nuxt.

This class deeply integrates with [Laravel Sanctum](https://laravel.com/docs/sanctum), which is the authentication system used by Laravel. Before an unsafe request, it checks for the `XSRF-TOKEN` cookie and sets the `X-XSRF-TOKEN` header. When the cookie is missing, it automatically requests one from the Laravel Sanctum endpoint. If Laravel rejects a stale token with a `419`, it refreshes the token and retries the request once.

```ts
import { Http } from '@globalbrain/sefirot/lib/http/Http'
import { useHttpConfig } from '@globalbrain/sefirot/lib/stores/HttpConfig'

const http = new Http(useHttpConfig())

const res = http.get('https://example.com')
```

### Configuration

Use `useHttpConfig()` to set the default configuration for all requests.

```ts
import { useHttpConfig } from '@globalbrain/sefirot/lib/stores/HttpConfig'

const httpConfig = useHttpConfig()
httpConfig.apply(options)

interface HttpOptions {
  /**
   * The base URL for all requests.
   * @default undefined
   */
  baseUrl?: string
  /**
   * The URL for the Laravel Sanctum endpoint.
   * Set to `false` to skip fetching the CSRF token.
   *
   * @default '/api/csrf-cookie'
   */
  xsrfUrl?: string | false
  /**
   * The HTTP client to use.
   * For example, you can set it to `useRequestFetch()` in Nuxt,
   * or `ofetch.create()` for more customization.
   *
   * @default ofetch
   */
  client?: HttpClient
  /**
   * Attempts to recover the application's server session after a `401`.
   * Return `true` to rebuild and retry the request. Return `false` when
   * the session cannot be recovered. Set to `false` to disable a
   * previously configured callback.
   *
   * @default undefined
   */
  recoverSession?: false | (() => boolean | PromiseLike<boolean>)
  /**
   * Returns additional headers for each request.
   *
   * @default () => ({})
   */
  headers?: () =>
    | Record<string, string>
    | PromiseLike<Record<string, string>>
  /**
   * The language to use for Accept-Language header.
   * 
   * @default undefined
   */
  lang?: 'en' | 'ja'
  /**
   * If you call `http.post` with a file, it will be sent as `multipart/form-data`.
   * The rest of the body will be sent as a JSON string. This option allows you to
   * specify the key for the JSON part. This key should match the key in backend
   * middleware which parses the JSON part. Don't set this option to some common
   * key to avoid conflicts with other parts of the body. (Sending JSON part as
   * string is needed to preserve data types.)
   * 
   * @default '__payload__'
   */
  payloadKey?: string
  /**
   * The options for the stringify function to create a queryString.
   * 
   * @default {}
   */
  stringifyOptions?: import('qs').IStringifyOptions
}

interface HttpClient {
  (
    request: FetchRequest,
    options?: Omit<FetchOptions, 'method'>
  ): Promise<any>
  raw?(
    request: FetchRequest,
    options?: Omit<FetchOptions, 'method'>
  ): Promise<FetchResponse<any>>
}

type HttpRequestOptions = FetchOptions & {
  /**
   * Authentication bootstrap requests should disable session recovery
   * to prevent recursion.
   *
   * @default true
   */
  sessionRecovery?: false
}
```

### Authentication recovery

`Http` has two automatic recovery paths:

- After a `419`, it refreshes the Sanctum CSRF token and retries the request.
- After a `401`, it calls `recoverSession` and retries the request if the
  callback returns `true`.

Configure `recoverSession` once to apply it to all application requests by
default. The callback can restore the Laravel session through any identity
provider:

```ts
httpConfig.apply({
  recoverSession: async () => Boolean(await authenticate())
})
```

Returning `false` leaves the original `401` unchanged. If the callback throws,
its error is propagated. Set `recoverSession` to `false` to remove a previously
configured callback.

Requests used by the recovery flow itself should opt out:

```ts
await http.post('/api/auth/exchange', body, {
  sessionRecovery: false
})
```

`sessionRecovery: false` disables `401` recovery for that request without
disabling CSRF recovery.

Each recovery path retries at most once. Automatic recovery applies only to
requests sent to the application origin (`baseUrl`, or the current page origin
when unset). Concurrent `401` responses share one recovery attempt. Requests
whose bodies cannot be safely sent again, such as streams, are not retried.

### `get`

Performs a `GET` request.

```ts
import { type HttpRequestOptions } from '@globalbrain/sefirot/lib/http/Http'

class Http {
  get<T = any>(url: string, options?: HttpRequestOptions): Promise<T>
}
```

### `head`

Performs a `HEAD` request.

```ts
import { type HttpRequestOptions } from '@globalbrain/sefirot/lib/http/Http'

class Http {
  head<T = any>(url: string, options?: HttpRequestOptions): Promise<T>
}
```

### `post`

Performs a `POST` request.

```ts
import { type HttpRequestOptions } from '@globalbrain/sefirot/lib/http/Http'

class Http {
  post<T = any>(url: string, body?: any, options?: HttpRequestOptions): Promise<T>
}
```

### `put`

Performs a `PUT` request.

```ts
import { type HttpRequestOptions } from '@globalbrain/sefirot/lib/http/Http'

class Http {
  put<T = any>(url: string, body?: any, options?: HttpRequestOptions): Promise<T>
}
```

### `patch`

Performs a `PATCH` request.

```ts
import { type HttpRequestOptions } from '@globalbrain/sefirot/lib/http/Http'

class Http {
  patch<T = any>(url: string, body?: any, options?: HttpRequestOptions): Promise<T>
}
```

### `delete`

Performs a `DELETE` request.

```ts
import { type HttpRequestOptions } from '@globalbrain/sefirot/lib/http/Http'

class Http {
  delete<T = any>(url: string, options?: HttpRequestOptions): Promise<T>
}
```

### `upload`

Performs a `POST` request with `multipart/form-data` content type. Useful for uploading files. It also handles nested body structures as well.

```ts
import { type HttpRequestOptions } from '@globalbrain/sefirot/lib/http/Http'

class Http {
  upload<T = any>(url: string, body?: any, options?: HttpRequestOptions): Promise<T>
}
```

### `download`

Download a file from the response. Use this method when you want browser to save a file to local disk.

```ts
import { type HttpRequestOptions } from '@globalbrain/sefirot/lib/http/Http'

class Http {
  download(url: string, options?: HttpRequestOptions): Promise<void>
}
```
