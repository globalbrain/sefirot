import { parse as parseContentDisposition } from '@tinyhttp/content-disposition'
import { parse as parseCookie } from '@tinyhttp/cookie'
import FileSaver from 'file-saver'
import {
  FetchError,
  type FetchOptions,
  type FetchRequest,
  type FetchResponse,
  ofetch
} from 'ofetch'
import { stringify } from 'qs'
import { type Lang } from '../composables/Lang'
import { isBlob, isError, isFormData, isRequest, isResponse, isString } from '../support/Utils'

export interface HttpClient {
  <T = any>(request: FetchRequest, options?: Omit<FetchOptions, 'method'>): Promise<T>
  raw<T = any>(request: FetchRequest, options?: Omit<FetchOptions, 'method'>): Promise<FetchResponse<T>>
}

export interface HttpOptions {
  baseUrl?: string
  xsrfUrl?: string | false
  client?: HttpClient
  lang?: Lang
  payloadKey?: string
}

export class Http {
  private static baseUrl: string | undefined = undefined
  private static xsrfUrl: string | false = '/api/csrf-cookie'
  private static client: HttpClient = ofetch
  private static lang: Lang | undefined = undefined
  private static payloadKey = '__payload__'

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
    if (options.lang) {
      Http.lang = options.lang
    }
    if (options.payloadKey) {
      Http.payloadKey = options.payloadKey
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
          ...(xsrfToken && { 'X-Xsrf-Token': xsrfToken }),
          ...(Http.lang && { 'Accept-Language': Http.lang }),
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
    if (body && !isFormData(body)) {
      let hasFile = false

      const payload = JSON.stringify(body, (_, value) => {
        if (isBlob(value)) {
          hasFile = true
          return undefined
        }
        return value
      })

      if (hasFile) {
        const formData = this.objectToFormData(body, undefined, undefined, true)
        formData.append(Http.payloadKey, payload)
        body = formData
      } else {
        body = payload
      }
    }

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
    return this.post<T>(url, this.objectToFormData(body), options)
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

  private objectToFormData(obj: any, form?: FormData, namespace?: string, onlyFiles = false) {
    const fd = form || new FormData()
    let formKey: string

    Object.keys(obj).forEach((property) => {
      if (namespace) {
        formKey = `${namespace}[${property}]`
      } else {
        formKey = property
      }

      if (obj[property] === undefined) {
        return
      }

      if (typeof obj[property] === 'object' && !isBlob(obj[property]) && obj[property] !== null) {
        this.objectToFormData(obj[property], fd, property, onlyFiles)
      } else {
        const value = obj[property] === null ? '' : obj[property]
        if (onlyFiles && !isBlob(value)) {
          return
        }
        fd.append(formKey, value)
      }
    })

    return fd
  }
}

export function isFetchError(e: unknown): e is FetchError {
  return (
    e instanceof FetchError
    || (isError(e)
      && (isString((e as FetchError).request) || isRequest((e as FetchError).request))
      && ((e as FetchError).response === undefined || isResponse((e as FetchError).response))
      && e.message.startsWith(
        `[${((e as FetchError).request as Request | undefined)?.method || (e as FetchError).options?.method || 'GET'}] ${
          JSON.stringify(((e as FetchError).request as Request | undefined)?.url || String((e as FetchError).request) || '/')
        }: `
      ))
  )
}

export { FetchError, type FetchOptions, type FetchRequest, type FetchResponse } from 'ofetch'
