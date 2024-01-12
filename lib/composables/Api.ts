import { type Ref, ref } from 'vue'
import { Http } from '../http/Http'

export interface Query<Data = any> {
  loading: Ref<boolean>
  data: Ref<Data | undefined>
  execute(): Promise<Data>
}

export interface UseQueryOptions {
  /**
   * controls whether the query should execute immediately
   * @default true
   */
  immediate?: boolean
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

  if (options.immediate !== false && !import.meta.env.SSR) {
    execute()
  }

  async function execute(): Promise<Data> {
    loading.value = true

    const res: Data = await req(new Http())
    data.value = res

    loading.value = false
    return res
  }

  return { loading, data, execute }
}

export function useMutation<Data = any, Args extends any[] = any[]>(
  req: (http: Http, ...args: Args) => Promise<Data>
): Mutation<Data, Args> {
  const loading = ref(false)
  const data = ref<Data | undefined>()

  async function execute(...args: Args): Promise<Data> {
    loading.value = true

    const res: Data = await req(new Http(), ...args)
    data.value = res

    loading.value = false
    return res
  }

  return { loading, data, execute }
}

export const useGet: <Data = any, Args extends any[] = any[]>(
  req: (http: Http, ...args: Args) => Promise<Data>
) => Get<Data, Args> = useMutation
