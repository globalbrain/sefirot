import type { Ref } from 'vue'
import { ref } from 'vue'

export type Position = 'top' | 'right' | 'bottom' | 'left'

const SCREEN_PADDING = 16

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
) {
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
    if (shouldPosition()) {
      doSetPosition()
    }
  }

  function doSetPosition(): void {
    // Reset position first so that we can get the original position.
    resetPosition()

    // Temporally show tip to get its size.
    tip.value!.style.display = 'block'

    const contentRect = content.value!.getBoundingClientRect()
    const tipRect = tip.value!.getBoundingClientRect()

    const contentRightX = contentRect.x + contentRect.width
    const tipRightX = tipRect.x + tipRect.width

    if (tipRect.x < 0) {
      adjustLeftPosition(contentRect.x)
    } else if (tipRightX > window.outerWidth) {
      adjustRightPosition(contentRightX)
    }

    tip.value!.style.display = 'none'
  }

  function adjustLeftPosition(contentRectX: number): void {
    tip.value!.style.left = '0'
    tip.value!.style.right = 'auto'
    setTransform(-contentRectX + SCREEN_PADDING)
  }

  function adjustRightPosition(contentRightX: number): void {
    tip.value!.style.left = 'auto'
    tip.value!.style.right = '0'
    setTransform((window.outerWidth - contentRightX) - SCREEN_PADDING)
  }

  function resetPosition(): void {
    tip.value!.style.left = ''
    tip.value!.style.right = ''
    tip.value!.style.transform = ''
  }

  function setTransform(x: number): void {
    tip.value!.style.transform = `translate(${x}px, ${position.value === 'top' ? -100 : 100}%)`
  }

  function shouldPosition(): boolean {
    if (!tip.value || !content.value) {
      return false
    }

    return position.value === 'top' || position.value === 'bottom'
  }

  return {
    on,
    show,
    hide
  }
}
