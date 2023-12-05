import { parse as parseContentDisposition } from '@tinyhttp/content-disposition'
import { parse as parseCookie } from '@tinyhttp/cookie'
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import FileSaver from 'file-saver'
import { stringify } from 'qs'

type FetchOptions = AxiosRequestConfig & {
  query?: Record<string, any>
}

export class Http {
  axios: AxiosInstance
  xsrfUrl: string

  constructor(xsrfUrl = '/api/csrf-cookie') {
    this.axios = axios.create()
    this.xsrfUrl = xsrfUrl
  }

  private async ensureXsrfToken(): Promise<string | undefined> {
    let xsrfToken = parseCookie(document.cookie)['XSRF-TOKEN']

    if (!xsrfToken) {
      await this.head(this.xsrfUrl)
      xsrfToken = parseCookie(document.cookie)['XSRF-TOKEN']
    }

    return xsrfToken
  }

  private async buildRequest(
    url: string,
    _options: FetchOptions = {}
  ): Promise<[FetchOptions]> {
    const { method, params, query, ...options } = _options

    const xsrfToken
      = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method || '')
      && (await this.ensureXsrfToken())

    const queryString = stringify(
      { ...params, ...query },
      { arrayFormat: 'brackets', encodeValuesOnly: true }
    )

    return [{
      url: `${url}${queryString ? `?${queryString}` : ''}`,
      method,
      withCredentials: true,
      ...options,
      headers: {
        Accept: 'application/json',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
        ...options.headers
      }
    }]
  }

  private async performRequest<T>(url: string, options: FetchOptions = {}) {
    return (await this.axios.request<T>(...await this.buildRequest(url, options)))
      .data
  }

  private async performRequestRaw<T>(url: string, options: FetchOptions = {}) {
    return this.axios.request<T>(...await this.buildRequest(url, options))
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

        if (
          typeof obj[property] === 'object'
          && !(obj[property] instanceof Blob)
        ) {
          this.objectToFormData(obj[property], fd, property)
        } else {
          fd.append(formKey, obj[property])
        }
      }
    }

    return fd
  }

  async get<T = any>(url: string, options?: FetchOptions) {
    return this.performRequest<T>(url, { method: 'GET', ...options })
  }

  async head<T = any>(url: string, options?: FetchOptions) {
    return this.performRequest<T>(url, { method: 'HEAD', ...options })
  }

  async post<T = any>(url: string, data?: any, options?: FetchOptions) {
    return this.performRequest<T>(url, { method: 'POST', data, ...options })
  }

  async put<T = any>(url: string, data?: any, options?: FetchOptions) {
    return this.performRequest<T>(url, { method: 'PUT', data, ...options })
  }

  async patch<T = any>(url: string, data?: any, options?: FetchOptions) {
    return this.performRequest<T>(url, { method: 'PATCH', data, ...options })
  }

  async delete<T = any>(url: string, options?: FetchOptions) {
    return this.performRequest<T>(url, { method: 'DELETE', ...options })
  }

  async upload<T = any>(url: string, data?: any, options?: FetchOptions) {
    const formData = this.objectToFormData(data)

    return this.performRequest<T>(url, {
      method: 'POST',
      data: formData,
      ...options
    })
  }

  async download(url: string, options?: FetchOptions) {
    const { data: blob, headers } = await this.performRequestRaw<Blob>(url, {
      method: 'GET',
      responseType: 'blob',
      ...options
    })

    if (!blob) {
      throw new Error('No blob')
    }

    const { filename = 'download' }
      // @ts-expect-error weird types
      = parseContentDisposition(headers.get('Content-Disposition') || '')
        ?.parameters || {}

    FileSaver.saveAs(blob, filename as string)
  }
}
