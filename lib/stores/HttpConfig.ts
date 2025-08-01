import { type FetchOptions, type FetchRequest, type FetchResponse, ofetch } from 'ofetch'
import { defineStore } from 'pinia'
import { type IStringifyOptions } from 'qs'
import { computed, ref } from 'vue'
import { type Lang } from '../composables/Lang'

type Awaitable<T> = T | PromiseLike<T>

export interface HttpClient {
  (request: FetchRequest, options?: Omit<FetchOptions, 'method'>): Promise<any>
  raw(request: FetchRequest, options?: Omit<FetchOptions, 'method'>): Promise<FetchResponse<any>>
}

export interface HttpOptions {
  baseUrl?: string
  xsrfUrl?: string | false
  client?: HttpClient
  lang?: Lang
  payloadKey?: string
  headers?: () => Awaitable<Record<string, string>>
  stringifyOptions?: IStringifyOptions
}

export const useHttpConfig = defineStore('sefirot-http-config', () => {
  const baseUrl = ref<string | undefined>(undefined)
  const xsrfUrl = ref<string | false>('/api/csrf-cookie')
  const client = ref<HttpClient>(ofetch)
  const lang = ref<Lang | undefined>(undefined)
  const payloadKey = ref<string>('__payload__')
  const headers = ref<() => Awaitable<Record<string, string>>>(async () => ({}))
  const stringifyOptions = ref<IStringifyOptions>({})

  function apply(options: HttpOptions): void {
    if (options.baseUrl != null) { baseUrl.value = options.baseUrl }
    if (options.xsrfUrl != null) { xsrfUrl.value = options.xsrfUrl }
    if (options.client != null) { client.value = options.client }
    if (options.lang != null) { lang.value = options.lang }
    if (options.payloadKey != null) { payloadKey.value = options.payloadKey }
    if (options.headers != null) { headers.value = options.headers }
    if (options.stringifyOptions != null) { stringifyOptions.value = options.stringifyOptions }
  }

  return {
    baseUrl: computed(() => baseUrl.value),
    xsrfUrl: computed(() => xsrfUrl.value),
    client: computed(() => client.value),
    lang: computed(() => lang.value),
    payloadKey: computed(() => payloadKey.value),
    headers: computed(() => headers.value),
    stringifyOptions: computed(() => stringifyOptions.value),
    apply
  }
})
