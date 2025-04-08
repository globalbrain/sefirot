import { type ComputedRef, computed } from 'vue'

export function smartComputed<T>(getter: () => T): ComputedRef<T> {
  return computed((oldValue) => {
    const newValue = getter()
    if (JSON.stringify(oldValue) === JSON.stringify(newValue)) {
      return oldValue as T
    }
    return newValue
  })
}
