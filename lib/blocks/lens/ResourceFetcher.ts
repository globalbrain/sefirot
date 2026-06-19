export type ResourceFetcher = (
  method: ResourceFetchMethod,
  url: string,
  body?: Record<string, any> | null
) => Promise<any>

export type ResourceFetchMethod = 'get' | 'post'
