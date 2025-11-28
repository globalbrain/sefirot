import {
  type ComputedRef,
  type MaybeRefOrGetter,
  computed,
  getCurrentInstance,
  onMounted,
  toValue,
  useSlots
} from 'vue'
import { isString } from '../support/Utils'

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
    const c = toValue(condition)

    return c ? fn(c) : (whenFalse as D)
  })
}

export function computedArray<T = any>(fn: (arr: T[]) => void): ComputedRef<T[]> {
  return computed(() => {
    const arr: T[] = []
    fn(arr)
    return arr
  })
}

export function computedArrayWhen<T = any, C = any>(
  condition: WhenCondition<C>,
  fn: (arr: T[], item: NonNullable<C>) => void
): ComputedRef<T[]> {
  return computedWhen<T[], C, T[]>(condition, (c) => {
    const arr: T[] = []
    fn(arr, c)
    return arr
  }, [])
}

/**
 * Checks whether the slot has a non empty value.
 */
export function useHasSlotContent(name = 'default'): ComputedRef<boolean> {
  const slots = useSlots()

  return computed(() => {
    return !!slots[name]?.().some((s) => {
      return Array.isArray(s.children) ? true : !!(s.children as string).trim()
    })
  })
}

/**
 * Get the slot value. If the slot contains child nodes, it will get ignored
 * and treated as if it was empty. This composable is useful to get the plain
 * text out of the slot content.
 */
export function useSlotValue(name = 'default'): ComputedRef<string | null> {
  const slots = useSlots()

  return computed(() => {
    const c = slots[name]?.()[0]?.children
    const v = isString(c) ? c.trim() : null
    return v !== '' ? v : null
  })
}

export function tryOnMounted(fn: () => void): void {
  if (getCurrentInstance()) {
    onMounted(fn)
  } else if (!import.meta.env.SSR) {
    fn()
  }
}
