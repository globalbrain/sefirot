import { parse as parseContentDisposition } from '@tinyhttp/content-disposition'
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import FileSaver from 'file-saver'
import { stringify } from 'qs'

type FetchOptions = AxiosRequestConfig

export class Http {
  axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      withCredentials: true,
      paramsSerializer: (params) =>
        stringify(params, { arrayFormat: 'brackets', encodeValuesOnly: true })
    })
  }

  private buildRequest(url: string, _options: FetchOptions = {}): FetchOptions {
    const { method, ...options } = _options

    return {
      url,
      method,
      ...options,
      headers: { Accept: 'application/json', ...options.headers }
    }
  }

  private async performRequest<T>(url: string, options: FetchOptions = {}) {
    return (await this.axios.request<T>(this.buildRequest(url, options))).data
  }

  private async performRequestRaw<T>(url: string, options: FetchOptions = {}) {
    return this.axios.request<T>(this.buildRequest(url, options))
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

  async get<T>(url: string, options?: FetchOptions) {
    return this.performRequest<T>(url, { method: 'GET', ...options })
  }

  async head<T>(url: string, options?: FetchOptions) {
    return this.performRequest<T>(url, { method: 'HEAD', ...options })
  }

  async post<T>(url: string, data?: any, options?: FetchOptions) {
    return this.performRequest<T>(url, { method: 'POST', data, ...options })
  }

  async put<T>(url: string, data?: any, options?: FetchOptions) {
    return this.performRequest<T>(url, { method: 'PUT', data, ...options })
  }

  async patch<T>(url: string, data?: any, options?: FetchOptions) {
    return this.performRequest<T>(url, { method: 'PATCH', data, ...options })
  }

  async delete<T>(url: string, options?: FetchOptions) {
    return this.performRequest<T>(url, { method: 'DELETE', ...options })
  }

  async upload<T>(url: string, data?: any, options?: FetchOptions) {
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
