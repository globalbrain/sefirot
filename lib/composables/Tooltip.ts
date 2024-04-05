import { type Ref, ref } from 'vue'

const padding = 8

export interface Tooltip {
  on: Ref<boolean>
  show: () => void
  hide: () => void
}

export type Position = 'top' | 'right' | 'bottom' | 'left'

const globalHide = ref<() => void>()

/**
 * Prevent tooltip going off-screen by adjusting the position depending on
 * the current window size.
 */
export function useTooltip(
  root: Ref<HTMLElement | null>,
  trigger: Ref<HTMLElement | null>,
  content: Ref<HTMLElement | null>,
  position: Ref<Position>,
  timeoutId: Ref<number | null>
): Tooltip {
  const on = ref(false)

  function show(): void {
    if (on.value) { return }
    globalHide.value?.()
    setPosition(trigger.value, content.value, position.value)
    setTimeout(() => { on.value = true })
    globalHide.value = hide
    window.addEventListener('resize', hide, { once: true })
    window.addEventListener('scroll', hide, { once: true })
  }

  function hide(): void {
    if (!on.value) { return }
    setTimeout(() => {
      if (timeoutId.value) {
        clearTimeout(timeoutId.value)
        timeoutId.value = null
      }
      on.value = false
      if (root.value?.matches(':focus-within')) {
        ;(document.activeElement as HTMLElement)?.blur?.()
      }
    })
  }

  return {
    on,
    show,
    hide
  }
}

function setPosition(
  trigger: HTMLElement | null,
  content: HTMLElement | null,
  placement: Position
): void {
  if (typeof document === 'undefined' || !trigger || !content) { return }

  const pos = getCurrentPositions(trigger, content)

  let top = pos.minY
  let left = pos.minX

  if (placement === 'top') {
    top = pos.triggerTop - pos.contentHeight - padding
    if (top < pos.minY) {
      top = pos.triggerTop + pos.triggerHeight + padding
    }
    left = pos.triggerLeft + pos.triggerWidth / 2 - pos.contentWidth / 2
    if (left + pos.contentWidth > pos.maxX) {
      left = pos.maxX - pos.contentWidth
    }
    if (left < pos.minX) {
      left = pos.minX
    }
  } else if (placement === 'right') {
    top = pos.triggerTop + pos.triggerHeight / 2 - pos.contentHeight / 2
    if (top + pos.contentHeight > pos.maxY) {
      top = pos.maxY - pos.contentHeight
    }
    if (top < pos.minY) {
      top = pos.minY
    }
    left = pos.triggerLeft + pos.triggerWidth + padding
    if (left + pos.contentWidth > pos.maxX) {
      left = pos.triggerLeft - pos.contentWidth - padding
    }
  } else if (placement === 'bottom') {
    top = pos.triggerTop + pos.triggerHeight + padding
    if (top + pos.contentHeight > pos.maxY) {
      top = pos.triggerTop - pos.contentHeight - padding
    }
    left = pos.triggerLeft + pos.triggerWidth / 2 - pos.contentWidth / 2
    if (left + pos.contentWidth > pos.maxX) {
      left = pos.maxX - pos.contentWidth
    }
    if (left < pos.minX) {
      left = pos.minX
    }
  } else if (placement === 'left') {
    top = pos.triggerTop + pos.triggerHeight / 2 - pos.contentHeight / 2
    if (top + pos.contentHeight > pos.maxY) {
      top = pos.maxY - pos.contentHeight
    }
    if (top < pos.minY) {
      top = pos.minY
    }
    left = pos.triggerLeft - pos.contentWidth - padding
    if (left < pos.minX) {
      left = pos.triggerLeft + pos.triggerWidth + padding
    }
  }

  content.style.top = `${top}px`
  content.style.left = `${left}px`
}

function getCurrentPositions(trigger: HTMLElement, content: HTMLElement) {
  const bodyRect = document.body.getBoundingClientRect()
  const triggerRect = trigger.getBoundingClientRect()
  const contentDisplay = content.style.display
  content.style.display = 'block'
  const contentRect = content.getBoundingClientRect()
  content.style.display = contentDisplay

  return {
    minX: padding - bodyRect.left,
    minY: padding - bodyRect.top,
    maxX: bodyRect.width - padding - bodyRect.left,
    maxY: bodyRect.height - padding - bodyRect.top,

    triggerTop: triggerRect.top - bodyRect.top,
    triggerLeft: triggerRect.left - bodyRect.left,
    triggerWidth: triggerRect.width,
    triggerHeight: triggerRect.height,

    contentTop: contentRect.top - bodyRect.top,
    contentLeft: contentRect.left - bodyRect.left,
    contentWidth: contentRect.width,
    contentHeight: contentRect.height
  }
}
