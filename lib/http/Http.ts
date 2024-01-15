import { parse as parseContentDisposition } from '@tinyhttp/content-disposition'
import { parse as parseCookie } from '@tinyhttp/cookie'
import FileSaver from 'file-saver'
import { type FetchOptions, type FetchRequest, type FetchResponse, ofetch } from 'ofetch'
import { stringify } from 'qs'

export interface HttpClient {
  <T = any>(request: FetchRequest, options?: Omit<FetchOptions, 'method'>): Promise<T>
  raw<T = any>(request: FetchRequest, options?: Omit<FetchOptions, 'method'>): Promise<FetchResponse<T>>
}

export interface HttpOptions {
  baseUrl?: string
  xsrfUrl?: string | false
  client?: HttpClient
}

export class Http {
  private static baseUrl: string | undefined = undefined
  private static xsrfUrl: string | false = '/api/csrf-cookie'
  private static client: HttpClient = ofetch

  static config(options: HttpOptions) {
    if (options.baseUrl) {
      Http.baseUrl = options.baseUrl
    }
    if (options.xsrfUrl !== undefined) {
      Http.xsrfUrl = options.xsrfUrl
    }
    if (options.client) {
      Http.client = options.client
    }
  }

  private async ensureXsrfToken(): Promise<string | undefined> {
    if (!Http.xsrfUrl) {
      return undefined
    }

    let xsrfToken = parseCookie(document.cookie)['XSRF-TOKEN']

    if (!xsrfToken) {
      await this.head(Http.xsrfUrl)
      xsrfToken = parseCookie(document.cookie)['XSRF-TOKEN']
    }

    return xsrfToken
  }

  private async buildRequest(
    url: string,
    _options: FetchOptions = {}
  ): Promise<[string, FetchOptions]> {
    const { method, params, query, ...options } = _options

    const xsrfToken
      = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method || '') && (await this.ensureXsrfToken())

    const queryString = stringify(
      { ...params, ...query },
      { arrayFormat: 'brackets', encodeValuesOnly: true }
    )

    return [
      `${url}${queryString ? `?${queryString}` : ''}`,
      {
        baseURL: Http.baseUrl,
        method,
        credentials: 'include',
        ...options,
        headers: {
          Accept: 'application/json',
          ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
          ...options.headers
        }
      }
    ]
  }

  private async performRequest<T>(url: string, options: FetchOptions = {}) {
    return Http.client<T>(...(await this.buildRequest(url, options)))
  }

  private async performRequestRaw<T>(url: string, options: FetchOptions = {}) {
    return Http.client.raw<T>(...(await this.buildRequest(url, options)))
  }

  async get<T = any>(url: string, options?: FetchOptions): Promise<T> {
    return this.performRequest<T>(url, { method: 'GET', ...options })
  }

  async head<T = any>(url: string, options?: FetchOptions): Promise<T> {
    return this.performRequest<T>(url, { method: 'HEAD', ...options })
  }

  async post<T = any>(url: string, body?: any, options?: FetchOptions): Promise<T> {
    return this.performRequest<T>(url, { method: 'POST', body, ...options })
  }

  async put<T = any>(url: string, body?: any, options?: FetchOptions): Promise<T> {
    return this.performRequest<T>(url, { method: 'PUT', body, ...options })
  }

  async patch<T = any>(url: string, body?: any, options?: FetchOptions): Promise<T> {
    return this.performRequest<T>(url, { method: 'PATCH', body, ...options })
  }

  async delete<T = any>(url: string, options?: FetchOptions): Promise<T> {
    return this.performRequest<T>(url, { method: 'DELETE', ...options })
  }

  async upload<T = any>(url: string, body?: any, options?: FetchOptions): Promise<T> {
    const formData = this.objectToFormData(body)

    return this.performRequest<T>(url, {
      method: 'POST',
      body: formData,
      ...options
    })
  }

  async download(url: string, options?: FetchOptions): Promise<void> {
    const { _data: blob, headers } = await this.performRequestRaw<Blob>(url, {
      method: 'GET',
      responseType: 'blob',
      ...options
    })

    if (!blob) {
      throw new Error('No blob')
    }

    const { filename = 'download' }
      = parseContentDisposition(headers.get('Content-Disposition') || '')?.parameters || {}

    FileSaver.saveAs(blob, filename as string)
  }

  private objectToFormData(obj: any, form?: FormData, namespace?: string) {
    const fd = form || new FormData()
    let formKey: string

    for (const property in obj) {
      if (Reflect.has(obj, property)) {
        if (namespace) {
          formKey = `${namespace}[${property}]`
        } else {
          formKey = property
        }

        if (obj[property] === undefined) {
          continue
        }

        if (typeof obj[property] === 'object' && !(obj[property] instanceof Blob)) {
          this.objectToFormData(obj[property], fd, property)
        } else {
          fd.append(formKey, obj[property])
        }
      }
    }

    return fd
  }
}

export type { FetchOptions }
