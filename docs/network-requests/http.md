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

### `static xsrfUrl`

Holds the static URL for the Laravel Sanctum endpoint.

```ts
class Http {
  // @default '/api/csrf-cookie'
  static xsrfUrl: string
}
```

### `get`

Performs a `GET` request.

```ts
import { type FetchOptions } from 'ofetch'

class Http {
  get<T = any>(url: string, options?: FetchOptions): Promise<T>
}
```

### `head`

Performs a `HEAD` request.

```ts
import { type FetchOptions } from 'ofetch'

class Http {
  head<T = any>(url: string, options?: FetchOptions): Promise<T>
}
```

### `post`

Performs a `POST` request.

```ts
import { type FetchOptions } from 'ofetch'

class Http {
  post<T = any>(
    url: string,
    body?: any,
    options?: FetchOptions
  ): Promise<T>
}
```
### `put`

Performs a `PUT` request.

```ts
import { type FetchOptions } from 'ofetch'

class Http {
  put<T = any>(
    url: string,
    body?: any,
    options?: FetchOptions
  ): Promise<T>
}
```

### `patch`

Performs a `PATCH` request.

```ts
import { type FetchOptions } from 'ofetch'

class Http {
  patch<T = any>(
    url: string,
    body?: any,
    options?: FetchOptions
  ): Promise<T>
}
```

### `delete`

Performs a `DELETE` request.

```ts
import { type FetchOptions } from 'ofetch'

class Http {
  delete<T = any>(url: string, options?: FetchOptions): Promise<T>
}
```

### `upload`

Performs a `POST` request with `multipart/form-data` content type. Useful for uploading files. It also handles nested body structures as well.

```ts
import { type FetchOptions } from 'ofetch'

class Http {
  upload<T = any>(
    url: string,
    body?: any,
    options?: FetchOptions
  ): Promise<T>
}
```

### `download`

Download a file from the response. Use this method when you want browser to save a file to local disk.

```ts
import { type FetchOptions } from 'ofetch'

class Http {
  download<T = any>(url: string, options?: FetchOptions): Promise<T>
}
```
