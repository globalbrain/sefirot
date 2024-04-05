import { type Ref, ref } from 'vue'

export interface Tooltip {
  on: Ref<boolean>
  show: () => void
  hide: () => void
}

export type Position = 'top' | 'right' | 'bottom' | 'left'

const globalHide = ref<() => void>()

/**
 * Prevent tooltip going off-screen by adjusting the position depending on
 * the current window size. This only applies to position `top` and
 * `bottom` since we only care about left and right of the screen.
 */
export function useTooltip(
  el: Ref<HTMLElement | null>,
  content: Ref<HTMLElement | null>,
  tip: Ref<HTMLElement | null>,
  position: Ref<Position>,
  timeoutId: Ref<number | null>
): Tooltip {
  const on = ref(false)

  function show(): void {
    if (on.value) { return }
    globalHide.value?.()
    setPosition()
    setTimeout(() => { on.value = true })
    globalHide.value = hide
  }

  function hide(): void {
    if (!on.value) { return }
    setTimeout(() => {
      if (timeoutId.value) {
        clearTimeout(timeoutId.value)
        timeoutId.value = null
      }
      on.value = false
      if (el.value?.matches(':focus-within')) {
        (document.activeElement as HTMLElement)?.blur?.()
      }
    })
  }

  function setPosition(): void {
    if (typeof document === 'undefined' || !tip.value || !content.value) { return }

    const contentRect = content.value.getBoundingClientRect()

    tip.value.style.display = 'block'
    const tipRect = tip.value.getBoundingClientRect()
    tip.value.style.display = 'none'

    const padding = 8
    const screenPadding = document.documentElement.clientWidth >= 512 ? 24 : 8

    const minX = screenPadding
    const minY = screenPadding
    const maxX = document.documentElement.clientWidth - screenPadding
    const maxY = document.documentElement.clientHeight - screenPadding

    let top = minY
    let left = minX

    if (position.value === 'top') {
      top = contentRect.top - tipRect.height - padding
      if (top < minY) {
        top = contentRect.top + contentRect.height + padding
      }
      left = contentRect.left + contentRect.width / 2 - tipRect.width / 2
      if (left + tipRect.width > maxX) {
        left = maxX - tipRect.width
      }
      if (left < minX) {
        left = minX
      }
    } else if (position.value === 'right') {
      top = contentRect.top + contentRect.height / 2 - tipRect.height / 2
      if (top + tipRect.height > maxY) {
        top = maxY - tipRect.height
      }
      if (top < minY) {
        top = minY
      }
      left = contentRect.right + padding
      if (left + tipRect.width > maxX) {
        left = contentRect.left - tipRect.width - padding
      }
    } else if (position.value === 'bottom') {
      top = contentRect.top + contentRect.height + padding
      if (top + tipRect.height > maxY) {
        top = contentRect.top - tipRect.height - padding
      }
      left = contentRect.left + contentRect.width / 2 - tipRect.width / 2
      if (left + tipRect.width > maxX) {
        left = maxX - tipRect.width
      }
      if (left < minX) {
        left = minX
      }
    } else if (position.value === 'left') {
      top = contentRect.top + contentRect.height / 2 - tipRect.height / 2
      if (top + tipRect.height > maxY) {
        top = maxY - tipRect.height
      }
      if (top < minY) {
        top = minY
      }
      left = contentRect.left - tipRect.width - padding
      if (left < minX) {
        left = contentRect.right + padding
      }
    }

    tip.value.style.top = `${top}px`
    tip.value.style.left = `${left}px`
  }

  return {
    on,
    show,
    hide
  }
}
