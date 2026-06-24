import { ref } from 'vue'
import { useGet } from '../../../composables/Api'
import { type ResourceFetchMethod, type ResourceFetcher } from '../ResourceFetcher'

export function useResourceFetcher(): ResourceFetcher {
  const data = ref<Record<string, any>>({})
  const pendingList: Record<string, Promise<any> | undefined> = {}

  const { execute: resourceFetcher } = useGet<
    any,
    [method: ResourceFetchMethod, url: string, body?: Record<string, any> | null]
  >(async (http, method, url, body) => {
    const key = `${method}:${url}:${body ? JSON.stringify(body) : ''}`

    if (data.value[key]) {
      return data.value[key]
    }

    if (pendingList[key]) {
      return pendingList[key]
    }

    // `post` carries a request body (e.g. a lens search payload); `get` ignores
    // it. Send no body at all when none is configured — `http.post(url, {})`
    // would serialize and POST an empty JSON object, which endpoints that
    // branch on an absent payload could reject.
    pendingList[key] = (
      method === 'post'
        ? (body != null ? http.post(url, body) : http.post(url))
        : http.get(url)
    ).then(
      (response) => {
        data.value[key] = response
        delete pendingList[key]
        return response
      },
      (error) => {
        // Clear the pending entry on failure too — otherwise the rejected promise
        // stays cached under `key` and every retry returns the same rejection.
        delete pendingList[key]
        throw error
      }
    )

    return pendingList[key]
  })

  return resourceFetcher
}
