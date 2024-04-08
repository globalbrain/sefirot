import { type Ref, ref } from 'vue'

export interface Tooltip {
  on: Ref<boolean>
  show: () => void
  hide: () => void
}

export type Position = 'top' | 'right' | 'bottom' | 'left'

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
  const showTimeout = ref<number | null>()

  function show(): void {
    if (on.value) { return }
    setPosition(trigger.value, content.value, position.value)
    showTimeout.value = window.setTimeout(() => {
      showTimeout.value = null
      on.value = true
    }, 200)
  }

  function hide(): void {
    if (showTimeout.value != null) {
      clearTimeout(showTimeout.value)
      showTimeout.value = null
    }
    if (timeoutId.value != null) {
      clearTimeout(timeoutId.value)
      timeoutId.value = null
    }
    if (!on.value) { return }
    setTimeout(() => {
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
    top = pos.triggerTop - pos.contentHeight
    if (top < pos.minY) {
      top = pos.triggerTop + pos.triggerHeight
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
    left = pos.triggerLeft + pos.triggerWidth
    if (left + pos.contentWidth > pos.maxX) {
      left = pos.triggerLeft - pos.contentWidth
    }
  } else if (placement === 'bottom') {
    top = pos.triggerTop + pos.triggerHeight
    if (top + pos.contentHeight > pos.maxY) {
      top = pos.triggerTop - pos.contentHeight
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
    left = pos.triggerLeft - pos.contentWidth
    if (left < pos.minX) {
      left = pos.triggerLeft + pos.triggerWidth
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
    minX: -bodyRect.left,
    minY: -bodyRect.top,
    maxX: bodyRect.width - bodyRect.left,
    maxY: bodyRect.height - bodyRect.top,

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
