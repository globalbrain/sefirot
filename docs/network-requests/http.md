# Http <Badge text="3.9.0" />

`Http` module provides a set of functions for making HTTP requests.

## `Http`

The `Http` class. It uses [ofetch](https://github.com/unjs/ofetch) under the hood so that it can be smoothly used together with Nuxt.

This class deeply integrates with [Laravel Sanctum](https://laravel.com/docs/sanctum), which is the authentication system used by Laravel. When instantiating the class, it will automatically checks for cookies and set the `X-XSRF-TOKEN` header. When cookies are missing, it will automatically make a request to the Laravel Sanctum endpoint to obtain it.

```ts
import { Http } from '@globalbrain/sefirot/lib/http/Http'

const http = new Http()

const res = http.get('https://example.com')
```

### `static config`

Sets the default configuration for all requests.

```ts
import { type FetchOptions } from 'ofetch'

class Http {
  static config(options: HttpOptions): void
}

interface HttpOptions {
  /**
   * The base URL for all requests.
   * @default '/'
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
   * The language to use for Accept-Language header.
   * 
   * @default undefined
   */
  lang?: 'en' | 'ja'
  /**
   * If you call `http.post` with a file, it will be send as `multipart/form-data`.
   * The rest of the body will be send as JSON string. This option allows you to
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
  stringifyOptions?: IStringifyOptions
}

interface HttpClient {
  <T = any>(request: FetchRequest, options?: FetchOptions): Promise<T>
  raw<T = any>(request: FetchRequest, options?: FetchOptions): Promise<FetchResponse<T>>
}
```

### `get`

Performs a `GET` request.

```ts
import { type FetchOptions } from 'ofetch'

class Http {
  get<T = any>(url: string, fetchOptions?: FetchOptions, stringifyOptions?: IStringifyOptions): Promise<T>
}
```

### `head`

Performs a `HEAD` request.

```ts
import { type FetchOptions } from 'ofetch'

class Http {
  head<T = any>(url: string, fetchOptions?: FetchOptions, stringifyOptions?: IStringifyOptions): Promise<T>
}
```

### `post`

Performs a `POST` request.

```ts
import { type FetchOptions } from 'ofetch'

class Http {
  post<T = any>(url: string, fetchOptions?: FetchOptions, stringifyOptions?: IStringifyOptions): Promise<T>
}
```

### `put`

Performs a `PUT` request.

```ts
import { type FetchOptions } from 'ofetch'

class Http {
  put<T = any>(url: string, fetchOptions?: FetchOptions, stringifyOptions?: IStringifyOptions): Promise<T>
}
```

### `patch`

Performs a `PATCH` request.

```ts
import { type FetchOptions } from 'ofetch'

class Http {
  patch<T = any>(url: string, fetchOptions?: FetchOptions, stringifyOptions?: IStringifyOptions): Promise<T>
}
```

### `delete`

Performs a `DELETE` request.

```ts
import { type FetchOptions } from 'ofetch'

class Http {
  delete<T = any>(url: string, fetchOptions?: FetchOptions, stringifyOptions?: IStringifyOptions): Promise<T>
}
```

### `upload`

Performs a `POST` request with `multipart/form-data` content type. Useful for uploading files. It also handles nested body structures as well.

```ts
import { type FetchOptions } from 'ofetch'

class Http {
  upload<T = any>(url: string, fetchOptions?: FetchOptions, stringifyOptions?: IStringifyOptions): Promise<T>
}
```

### `download`

Download a file from the response. Use this method when you want browser to save a file to local disk.

```ts
import { type FetchOptions } from 'ofetch'

class Http {
  download<T = any>(url: string, fetchOptions?: FetchOptions, stringifyOptions?: IStringifyOptions): Promise<T>
}
```
