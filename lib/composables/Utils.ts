import { type MaybeRefOrGetter } from '@vueuse/core'
import { resolveUnref } from '@vueuse/core'
import { type ComputedRef } from 'vue'
import { computed } from 'vue'

export type WhenCondition<T> = MaybeRefOrGetter<T>

export function computedWhen<T, C>(
  condition: WhenCondition<C>,
  fn: (item: NonNullable<C>) => T
): ComputedRef<T | undefined>

export function computedWhen<T, C, D>(
  condition: WhenCondition<C>,
  fn: (item: NonNullable<C>) => T,
  whenFalse: D
): ComputedRef<T | D>

export function computedWhen<T, C, D>(
  condition: WhenCondition<C>,
  fn: (item: NonNullable<C>) => T,
  whenFalse?: D
): ComputedRef<T | D> {
  return computed(() => {
    const c = resolveUnref(condition)

    return c ? fn(c) : whenFalse as D
  })
}

export function computedArray<T = any>(fn: (arr: T[]) => void): ComputedRef<T[]> {
  return computed(() => {
    const arr = [] as T[]
    fn(arr)
    return arr
  })
}
