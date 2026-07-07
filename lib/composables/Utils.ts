import {
  Comment,
  type ComputedRef,
  Fragment,
  type MaybeRefOrGetter,
  Text,
  type VNode,
  computed,
  getCurrentInstance,
  isVNode,
  onMounted,
  toValue,
  useSlots
} from 'vue'

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

function hasSlotContent(value: unknown): boolean {
  if (value == null || typeof value === 'boolean') {
    return false
  }

  if (typeof value === 'string') {
    return value.trim().length > 0
  }

  if (typeof value === 'number' || typeof value === 'bigint') {
    return true
  }

  if (Array.isArray(value)) {
    return value.some(hasSlotContent)
  }

  if (!isVNode(value)) {
    return false
  }

  const vnode = value as VNode

  if (vnode.type === Comment) {
    return false
  }

  if (vnode.type === Text || vnode.type === Fragment) {
    return hasSlotContent(vnode.children)
  }

  // An element with only text children is judged by that text —
  // `<div>{{ maybeEmpty }}</div>` must not defeat SDesc's empty fallback.
  // Anything else is content in itself: a component, or an element whose
  // `children` is `null` (an icon, an `<img>`, …), an array, or a slots object.
  if (typeof vnode.children === 'string') {
    return hasSlotContent(vnode.children)
  }

  return true
}

export function useHasSlotContent(name = 'default'): ComputedRef<boolean> {
  const slots = useSlots()

  return computed(() => hasSlotContent(slots[name]?.()))
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
    const v = typeof c === 'string' ? c.trim() : null
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
