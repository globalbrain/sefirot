import { type Ref, type WatchSource, ref, watch } from 'vue'
import { Http } from '../http/Http'
import { useHttpConfig } from '../stores/HttpConfig'
import { tryOnMounted } from './Utils'

export interface Query<Data = any> {
  loading: Ref<boolean>
  data: Ref<Data | undefined>
  execute(options?: {
    /**
     * controls whether the response should be assigned to the data ref
     * @default true
     */
    assign?: boolean
    /**
     * controls whether the loading state should not be set before fetching
     * @default false
     */
    silent?: boolean
  }): Promise<Data>
}

export interface UseQueryOptions {
  /**
   * controls whether the query should execute immediately
   * @default true
   */
  immediate?: boolean
  /**
   * watch the given source(s) and re-execute the query
   */
  watch?: WatchSource | WatchSource[]
}

export interface Mutation<Data = any, Args extends any[] = any[]> {
  loading: Ref<boolean>
  data: Ref<Data | undefined>
  execute(...args: Args): Promise<Data>
}

export type Get<Data = any, Args extends any[] = any[]> = Mutation<Data, Args>

export function useQuery<Data = any>(
  req: (http: Http) => Promise<Data>,
  options: UseQueryOptions = {}
): Query<Data> {
  const loading = ref(false)
  const data = ref<Data | undefined>()
  const httpConfig = useHttpConfig()

  if (options.immediate !== false) {
    tryOnMounted(execute)
  }

  if (options.watch) {
    watch(options.watch, () => { execute() }, { deep: true })
  }

  async function execute({ assign = true, silent = false } = {}): Promise<Data> {
    if (!silent) { loading.value = true }

    try {
      const res: Data = await req(new Http(httpConfig))
      if (assign) { data.value = res }
      return res
    } finally {
      // Always clear loading, even when the request rejects — otherwise a failed
      // fetch leaves the consumer stuck in its loading/skeleton state.
      loading.value = false
    }
  }

  return { loading, data, execute }
}

export function useMutation<Data = any, Args extends any[] = any[]>(
  req: (http: Http, ...args: Args) => Promise<Data>
): Mutation<Data, Args> {
  const loading = ref(false)
  const data = ref<Data | undefined>()
  const httpConfig = useHttpConfig()

  async function execute(...args: Args): Promise<Data> {
    loading.value = true

    try {
      const res: Data = await req(new Http(httpConfig), ...args)
      data.value = res
      return res
    } finally {
      // Always clear loading, even when the request rejects, so a failed
      // mutation doesn't leave the caller wedged in its loading state.
      loading.value = false
    }
  }

  return { loading, data, execute }
}

export const useGet: <Data = any, Args extends any[] = any[]>(
  req: (http: Http, ...args: Args) => Promise<Data>
) => Get<Data, Args> = useMutation
