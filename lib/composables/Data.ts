import { type Ref, ref } from 'vue'

export interface D<T extends Record<string, any>> {
  data: Ref<T>
  init(): void
}

export function useData<T extends Record<string, any>>(data: T): D<T> {
  const initialData = JSON.stringify(data)

  const refData = ref(data) as Ref<T>

  function init(): void {
    refData.value = JSON.parse(initialData) as T
  }

  return {
    data: refData,
    init
  }
}
