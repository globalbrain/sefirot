import { type ComputedRef, computed, inject, provide, toValue } from 'vue'

export type ControlSize = 'xs' | 'sm' | 'md' | 'small' | 'medium'
export type ControlPosition = 'left' | 'center' | 'right'

export const ControlSizeKey = 'sefirot-control-size-key'
export const ControlPositionKey = 'sefirot-control-position-key'

export function provideControlSize(controlSize: ComputedRef<ControlSize>): void {
  provide(ControlSizeKey, controlSize)
}

export function provideControlPosition(controlPosition: ControlPosition): void {
  provide(ControlPositionKey, controlPosition)
}

export function useControlSize(): ComputedRef<ControlSize> {
  const controlSize = inject<ComputedRef<ControlSize> | null>(ControlSizeKey, null) || null

  if (!controlSize) {
    throw new Error(
      '[sefirot] Unexpected call to `useControlSize`. This probably means'
      + ' you are using `<SControl>` child component outside of `<SControl>`.'
      + ' Make sure to wrap the component within `<SControl>` component.'
    )
  }

  return computed(() => toValue(controlSize))
}

export function useControlPosition(): ControlPosition {
  const controlPosition = inject<ControlPosition | null>(ControlPositionKey, null) || null

  if (!controlPosition) {
    throw new Error(
      '[sefirot] Unexpected call to `useControlPosition`. This probably means'
      + ' you are using `<SControl>` child component outside of `<SControl>`.'
      + ' Make sure to wrap the component within `<SControl>` component.'
    )
  }

  return controlPosition
}
