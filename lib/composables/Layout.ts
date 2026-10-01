import { type ComputedRef, type MaybeRefOrGetter, computed, inject, provide, toValue } from 'vue'

export type LayoutMode = 'desktop' | 'mobile'

/** Values follow the application's resolved mode, never an implicit breakpoint. */
export type Responsive<T> = T | { desktop: T; mobile?: T }

export const LayoutKey = 'sefirot-layout-key'

/** Call in an ancestor's setup. Vue preserves this context through Teleport. */
export function provideLayout(mode: MaybeRefOrGetter<LayoutMode>): void {
  provide(LayoutKey, mode)
}

export function useLayout(): ComputedRef<LayoutMode> {
  const mode = inject<MaybeRefOrGetter<LayoutMode>>(LayoutKey, 'desktop')
  return computed(() => toValue(mode))
}

export function useResponsive<T>(value: MaybeRefOrGetter<Responsive<T>>): ComputedRef<T> {
  const layout = useLayout()
  return computed(() => {
    const resolved = toValue(value)
    if (resolved !== null && typeof resolved === 'object' && 'desktop' in resolved) {
      return layout.value === 'mobile' ? resolved.mobile ?? resolved.desktop : resolved.desktop
    }
    return resolved as T
  })
}

/** Numeric spacing is in CSS pixels; strings allow CSS units and shorthands. */
export function layoutLength(value: string | number | undefined): string | undefined {
  return typeof value === 'number' || (typeof value === 'string' && /^\d+(?:\.\d+)?$/.test(value))
    ? `${value}px`
    : value
}
