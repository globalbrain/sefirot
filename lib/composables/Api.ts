import { type ComputedRef, type ShallowRef, computed, ref, shallowRef } from 'vue'
import { Http } from '../http/Http.js'

export interface Query<Data = unknown> {
  loading: ComputedRef<boolean>
  data: ShallowRef<Data | undefined>
  execute(): Promise<Data>
}

export interface UseQueryOptions {
  // controls whether the query should execute immediately
  // @default true
  immediate?: boolean
}

export interface Mutation<Data = unknown, Args extends unknown[] = unknown[]> {
  loading: ComputedRef<boolean>
  data: ShallowRef<Data | undefined>
  execute(...args: Args): Promise<Data>
}

export type Get<Data = unknown, Args extends unknown[] = unknown[]> = Mutation<Data, Args>

export function useQuery<Data = unknown>(
  req: (http: Http) => Promise<Data>,
  options: UseQueryOptions = {}
): Query<Data> {
  const loading = ref(false)
  const data = shallowRef<Data | undefined>()

  if (options.immediate !== false) {
    execute()
  }

  async function execute(): Promise<Data> {
    loading.value = true

    const res: Data = await req(new Http())
    data.value = res

    loading.value = false
    return res
  }

  return {
    loading: computed(() => loading.value),
    data,
    execute
  }
}

export function useMutation<Data = unknown, Args extends unknown[] = unknown[]>(
  req: (http: Http, ...args: Args) => Promise<Data>
): Mutation<Data, Args> {
  const loading = ref(false)
  const data = shallowRef<Data | undefined>()

  async function execute(...args: Args): Promise<Data> {
    loading.value = true

    const res: Data = await req(new Http(), ...args)
    data.value = res

    loading.value = false
    return res
  }

  return {
    loading: computed(() => loading.value),
    data,
    execute
  }
}

export const useGet: <Data = unknown, Args extends unknown[] = unknown[]>(
  req: (http: Http, ...args: Args) => Promise<Data>
) => Get<Data, Args> = useMutation
