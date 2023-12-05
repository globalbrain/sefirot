/* eslint-disable @typescript-eslint/ban-ts-comment */
import { parse as parseContentDisposition } from '@tinyhttp/content-disposition'
import { parse as parseCookie } from '@tinyhttp/cookie'
import FileSaver from 'file-saver'
import { stringify } from 'qs'

type FetchOptions = any

export class Http {
  xsrfUrl: string

  constructor(xsrfUrl = '/api/csrf-cookie') {
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
  ): Promise<[string, FetchOptions]> {
    const { method, params, ...options } = _options

    const xsrfToken
      = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method || '')
      && (await this.ensureXsrfToken())

    const queryString = stringify(params, {
      arrayFormat: 'brackets',
      encodeValuesOnly: true
    })

    return [
      `${url}${queryString ? `?${queryString}` : ''}`,
      {
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
    // @ts-expect-error
    return $fetch<T>(...(await this.buildRequest(url, options)))
  }

  private async performRequestRaw<T>(url: string, options: FetchOptions = {}) {
    // @ts-expect-error
    return $fetch.raw<T>(...(await this.buildRequest(url, options)))
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

  async get<T = any>(url: string, params?: any): Promise<T> {
    return this.performRequest<T>(url, { method: 'GET', params })
  }

  async head<T = any>(url: string, params?: any): Promise<T> {
    return this.performRequest<T>(url, { method: 'HEAD', params })
  }

  async post<T = any>(url: string, data?: any): Promise<T> {
    return this.performRequest<T>(url, { method: 'POST', data })
  }

  async put<T = any>(url: string, data?: any): Promise<T> {
    return this.performRequest<T>(url, { method: 'PUT', data })
  }

  async patch<T = any>(url: string, data?: any): Promise<T> {
    return this.performRequest<T>(url, { method: 'PATCH', data })
  }

  async delete<T = any>(url: string, params?: any): Promise<T> {
    return this.performRequest<T>(url, { method: 'DELETE', params })
  }

  async upload<T = any>(url: string, data?: any): Promise<T> {
    const formData = this.objectToFormData(data)

    return this.performRequest<T>(url, { method: 'POST', data: formData })
  }

  async download(url: string, params?: any): Promise<void> {
    const { data: blob, headers } = await this.performRequestRaw<Blob>(url, {
      method: 'GET',
      responseType: 'blob',
      params
    })

    if (!blob) {
      throw new Error('No blob')
    }

    const { filename = 'download' }
      = parseContentDisposition(headers.get('Content-Disposition') || '')
        ?.parameters || {}

    FileSaver.saveAs(blob, filename as string)
  }
}
