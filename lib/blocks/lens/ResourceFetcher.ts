export type ResourceFetcher = (method: ResourceFetchMethod, url: string) => Promise<any>

export type ResourceFetchMethod = 'get' | 'post'
