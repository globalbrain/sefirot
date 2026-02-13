import { ref } from 'vue'
import { useGet } from '../../../composables/Api'
import { type ResourceFetchMethod, type ResourceFetcher } from '../ResourceFetcher'

export function useResourceFetcher(): ResourceFetcher {
  const data = ref<Record<string, any>>({})
  const pendingList: Record<string, Promise<any> | undefined> = {}

  const { execute: resourceFetcher } = useGet<any, [method: ResourceFetchMethod, url: string]>(async (http, method, url) => {
    const key = `${method}:${url}`

    if (data.value[key]) {
      return data.value[key]
    }

    if (pendingList[key]) {
      return pendingList[key]
    }

    pendingList[key] = http[method](url).then((response) => {
      data.value[key] = response
      delete pendingList[key]
      return response
    })

    return pendingList[key]
  })

  return resourceFetcher
}
