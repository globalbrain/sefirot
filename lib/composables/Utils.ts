import {
  Ref,
  ComputedRef,
  WatchSource,
  shallowRef,
  computed,
  watch,
  isRef
} from '@vue/composition-api'

export type Refish<T = any> = T | Ref<T> | ComputedRef<T>

export type Source<S> = Ref<S> | ComputedRef<S>

export function get<T>(refish: Refish<T> | (() => T)): T {
  if (isRef(refish)) {
    return refish.value
  }

  if (refish instanceof Function) {
    return refish()
  }

  return refish
}

export function computedOnly<T, S>(
  source: WatchSource<S>,
  fn: (value: S, oldValue?: S) => T
): Ref<T> {
  const value = shallowRef() as Ref<T>

  watch(source, (newValue, oldValue) => {
    value.value = fn(newValue, oldValue)
  }, { immediate: true })

  return value
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

export function computedIfOnly<T, E, S>(
  source: WatchSource<S>,
  fn: (value: Exclude<S, undefined | null | false>) => T,
  empty: E
): Ref<T | E> {
  return computedOnly(source, (value) => {
    return value
      ? fn(value as Exclude<S, undefined | null | false>)
      : empty
  })
}

export function computedArray<T>(callback: (carry: T) => void): ComputedRef<T> {
  return computed(() => {
    const carry = [] as any

    callback(carry)

    return carry
  })
}

export function computedArrayOnly<T extends any[], S>(
  source: Source<S>,
  callback: (carry: T) => void
): Ref<T> {
  return computedOnly(source, () => {
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
