import { ref } from 'vue'
import { useGet } from '../../../composables/Api'
import { type ResourceFetchMethod, type ResourceFetcher } from '../ResourceFetcher'

export function useResourceFetcher(): ResourceFetcher {
  const data = ref<Record<string, any>>({})
  const pendingList: Record<string, Promise<any> | undefined> = {}

  const { execute: resourceFetcher } = useGet<any, [method: ResourceFetchMethod, url: string, body?: Record<string, any> | null]>(async (http, method, url, body) => {
    const key = `${method}:${url}:${body ? JSON.stringify(body) : ''}`

    if (data.value[key]) {
      return data.value[key]
    }

    if (pendingList[key]) {
      return pendingList[key]
    }

    // `post` carries a request body (e.g. a lens search payload); `get`
    // ignores it.
    pendingList[key] = (method === 'post' ? http.post(url, body ?? {}) : http.get(url)).then((response) => {
      data.value[key] = response
      delete pendingList[key]
      return response
    })

    return pendingList[key]
  })

  return resourceFetcher
}
