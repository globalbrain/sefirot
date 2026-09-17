import { useElementBounding } from '@vueuse/core'
import { type CSSProperties, type MaybeRefOrGetter, type Ref, computed, inject, provide, toValue } from 'vue'
import { useViewport } from './Viewport'

export const OverlaysKey = 'sefirot-overlays-key'

/** Opt in independently of the resolved layout mode, including forced desktop. */
export function provideOverlays(enabled: MaybeRefOrGetter<boolean> = true): void {
  provide(OverlaysKey, enabled)
}

export function useOverlays() {
  const enabled = inject<MaybeRefOrGetter<boolean>>(OverlaysKey, false)
  return computed(() => toValue(enabled))
}

/** Measured positioning for explicitly migrated callers; legacy helpers are unchanged. */
export function useOverlayPosition(
  container: Ref<any>,
  element: Ref<HTMLElement | null | undefined>,
  options: {
    position?: MaybeRefOrGetter<'top' | 'bottom' | undefined>
    align?: MaybeRefOrGetter<'left' | 'right'>
  } = {}
) {
  const anchor = useElementBounding(container)
  const floating = useElementBounding(element)
  const viewport = useViewport()
  const gutter = 12
  const gap = 8
  const maxWidth = computed(() => Math.max(0, viewport.value.width - gutter * 2))
  const maxHeight = computed(() => Math.max(0, viewport.value.height - gutter * 2))
  const popupHeight = computed(() => Math.min(floating.height.value, maxHeight.value))

  const position = computed(() => {
    const preferred = toValue(options.position)
    if (preferred) { return preferred }
    const below = viewport.value.top + viewport.value.height - anchor.bottom.value - gap - gutter
    const above = anchor.top.value - viewport.value.top - gap - gutter
    return below >= popupHeight.value || below >= above ? 'bottom' : 'top'
  })

  function update(): void {
    anchor.update()
    floating.update()
  }

  const align = computed(() => {
    const preferred = toValue(options.align) ?? 'left'
    const width = Math.min(floating.width.value, maxWidth.value)
    const view = viewport.value
    if (preferred === 'left') {
      return anchor.left.value + width <= view.left + view.width - gutter ? 'left' : 'right'
    }
    return anchor.right.value - width >= view.left + gutter ? 'right' : 'left'
  })

  const inset = computed<CSSProperties>(() => {
    const view = viewport.value
    const width = Math.min(floating.width.value, maxWidth.value)
    const x = align.value === 'right' ? anchor.right.value - width : anchor.left.value
    const y = position.value === 'top'
      ? anchor.top.value - gap - popupHeight.value
      : anchor.bottom.value + gap

    return {
      'left': `${Math.max(view.left + gutter, Math.min(x, view.left + view.width - gutter - width))}px`,
      'top': `${Math.max(view.top + gutter, Math.min(y, view.top + view.height - gutter - popupHeight.value))}px`,
      'right': 'auto',
      'bottom': 'auto',
      'maxWidth': `${maxWidth.value}px`,
      'maxHeight': `${maxHeight.value}px`,
      '--dropdown-max-width': `${maxWidth.value}px`,
      '--dropdown-max-height': `${maxHeight.value}px`
    }
  })

  return { position, align, inset, update }
}
