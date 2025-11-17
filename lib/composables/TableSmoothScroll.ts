// Scroll animation duration (in milliseconds)
const MIN_SCROLL_DURATION = 100
const MAX_SCROLL_DURATION = 140
const DURATION_SCALE_FACTOR = 0.15

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

function getScrollDuration(distance: number): number {
  const absDistance = Math.abs(distance)
  const scaled = absDistance * DURATION_SCALE_FACTOR
  return Math.min(MAX_SCROLL_DURATION, Math.max(MIN_SCROLL_DURATION, scaled))
}

export function smoothScrollTo(
  element: HTMLElement | Window,
  targetY: number
): Promise<void> {
  let startTimestamp: number | null = null
  const from = element instanceof Window ? element.scrollY : element.scrollTop
  const delta = targetY - from
  const duration = getScrollDuration(delta)
  const controller = new AbortController()
  const cancel = () => controller.abort()
  const opts = { passive: true, once: true } as const

  const target = element instanceof Window ? window : element
  target.addEventListener('wheel', cancel, opts)
  target.addEventListener('touchstart', cancel, opts)
  target.addEventListener('mousedown', cancel, opts)
  target.addEventListener('keydown', cancel, opts)

  return new Promise<void>((resolve) => {
    function step(currentTimestamp: number): void {
      if (controller.signal.aborted) {
        return resolve()
      }
      if (startTimestamp == null) {
        startTimestamp = currentTimestamp
      }
      const progress = Math.min(1, (currentTimestamp - startTimestamp) / duration)
      const eased = easeOutCubic(progress)
      const position = from + delta * eased

      if (element instanceof Window) {
        element.scrollTo({ top: position, left: 0 })
      } else {
        element.scrollTop = position
      }

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        resolve()
      }
    }
    requestAnimationFrame(step)
  })
}

export function scrollTableIntoView(
  tableRootElement: HTMLElement,
  borderless: boolean,
  borderSize: number
): Promise<void> {
  const rect = tableRootElement.getBoundingClientRect()
  const actualBorderSize = borderless ? 0 : borderSize

  let scrollableParent = tableRootElement.parentElement
  while (scrollableParent) {
    const overflowY = window.getComputedStyle(scrollableParent).overflowY
    const isScrollable = overflowY === 'auto' || overflowY === 'scroll'

    if (isScrollable) {
      const parentRect = scrollableParent.getBoundingClientRect()
      const relativeTop = rect.top - parentRect.top
      const targetScrollTop = scrollableParent.scrollTop + relativeTop - actualBorderSize
      return smoothScrollTo(scrollableParent, targetScrollTop)
    }

    scrollableParent = scrollableParent.parentElement
  }

  const windowScrollTop = rect.top + window.scrollY - actualBorderSize
  return smoothScrollTo(window, windowScrollTop)
}
