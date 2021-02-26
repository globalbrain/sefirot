import { Ref, ComputedRef, UnwrapRef, ref, computed, watch, isRef } from '@vue/composition-api'

export type Refish<T = any> = T | Ref<T> | ComputedRef<T>

export function get<T>(refish: Refish<T> | (() => T)): T {
  if (isRef(refish)) {
    return refish.value
  }

  if (refish instanceof Function) {
    return refish()
  }

  return refish
}

export function computedIf<T, R, E>(
  refish: Refish<T | null>,
  callback: (value: T) => R,
  empty: E
): ComputedRef<R | E> {
  return computed(() => {
    const value = get(refish)

    return value ? callback(value) : empty
  })
}

export function computedIfOnly<T, R, E>(
  refish: Ref<T | null> | ComputedRef<T | null> | (() => T | null),
  callback: (value: T) => R,
  empty: E
): Ref<R | E> {
  const value = ref<R | E>(empty)

  const refValue = get(refish)

  if (refValue) {
    value.value = callback(refValue) as UnwrapRef<R>
  }

  watch(refish, (newValue) => {
    value.value = newValue
      ? callback(newValue) as UnwrapRef<R>
      : empty as UnwrapRef<E>
  })

  return value as Ref<R | E>
}

export function computedArray<T>(callback: (carry: T) => void): ComputedRef<T> {
  return computed(() => {
    const carry = [] as any

    callback(carry)

    return carry
  })
}

export function computedArrayIf<T, D extends any[]>(
  refish: Refish<T | null>,
  callback: (carry: D, value: T) => void
): ComputedRef<D> {
  return computed(() => {
    const carry = [] as any

    const value = get(refish)

    value && callback(carry, value)

    return carry
  })
}

export function computedArrayIfNot<T, D extends any[]>(
  refish: Refish<T | null>,
  callback: (carry: D) => void
): ComputedRef<D> {
  return computed(() => {
    const carry = [] as any

    const value = get(refish)

    value || callback(carry)

    return carry
  })
}
