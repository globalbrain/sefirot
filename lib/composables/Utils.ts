import { ComputedRef, computed } from 'vue'

export function computedArray<T = any>(fn: (arr: T[]) => void): ComputedRef<T[]> {
  return computed(() => {
    const arr = [] as T[]
    fn(arr)
    return arr
  })
}
