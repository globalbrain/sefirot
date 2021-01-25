import { Ref, ComputedRef, computed, isRef } from '@vue/composition-api'

export type Refish<T = any> = T | Ref<T> | ComputedRef<T>

export function get<T>(ref: Refish<T>): T {
  return isRef(ref) ? ref.value : ref
}

export function computedIf<T, R, E>(
  ref: Refish<T | null>,
  callback: (value: T) => R,
  empty: E
): ComputedRef<R | E> {
  return computed(() => {
    const value = get(ref)

    return value ? callback(value) : empty
  })
}

export function computedArrayIf<T, D extends any[]>(
  ref: Refish<T | null>,
  callback: (carry: D, value: T) => void
): ComputedRef<D> {
  return computed(() => {
    const carry = [] as any

    const value = get(ref)

    value && callback(carry, value)

    return carry
  })
}
