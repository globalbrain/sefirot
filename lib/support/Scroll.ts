// The browser-native smooth scroll animation is too soft and slow, too catchy.
// This module provides a custom smooth scroll that is more subtle and faster.

// Duration configuration (in milliseconds)
const MIN_SCROLL_DURATION = 100
const MAX_SCROLL_DURATION = 160
const DURATION_SCALE_FACTOR = 0.15

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

/**
 * Calculate scroll animation duration based on distance.
 * Shorter distances get faster animations, longer distances are capped at max duration.
 */
function calculateScrollDuration(distance: number): number {
  const absDistance = Math.abs(distance)
  const scaled = absDistance * DURATION_SCALE_FACTOR
  return Math.min(MAX_SCROLL_DURATION, Math.max(MIN_SCROLL_DURATION, scaled))
}

/**
 * Smoothly scroll an element to a target Y position with adaptive duration.
 * The animation can be interrupted by user interaction (wheel, touch, mouse, keyboard).
 */
function smoothScrollTo(
  element: HTMLElement | Window,
  targetY: number
): Promise<void> {
  const from = element instanceof Window ? element.scrollY : element.scrollTop
  const delta = targetY - from

  // Skip animation for very small distances
  if (Math.abs(delta) < 1) {
    return Promise.resolve()
  }

  const duration = calculateScrollDuration(delta)
  let startTime: number | null = null
  let animationFrame: number | null = null

  // Allow user to interrupt the scroll
  const controller = new AbortController()
  const cancel = () => {
    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame)
      animationFrame = null
    }
    controller.abort()
  }

  const opts = { passive: true, signal: controller.signal } as const

  const target = element instanceof Window ? window : element
  target.addEventListener('wheel', cancel, opts)
  target.addEventListener('touchstart', cancel, opts)
  target.addEventListener('mousedown', cancel, opts)
  target.addEventListener('keydown', cancel, opts)

  return new Promise<void>((resolve) => {
    function step(currentTime: number): void {
      if (controller.signal.aborted) {
        resolve()
        return
      }

      if (startTime === null) {
        startTime = currentTime
      }

      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)
      const position = from + delta * eased

      if (element instanceof Window) {
        element.scrollTo(0, position)
      } else {
        element.scrollTop = position
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      } else {
        animationFrame = null
        resolve()
      }
    }

    animationFrame = requestAnimationFrame(step)
  })
}

/**
 * Scroll the page so the table is positioned at the top of the viewport.
 * Finds the nearest scrollable parent or scrolls the window if needed.
 */
export function scrollTableIntoView(
  tableRootElement: HTMLElement,
  headElement: HTMLElement | null,
  bodyElement: HTMLElement | null,
  borderless: boolean,
  borderSize: number
): Promise<void> {
  const rect = tableRootElement.getBoundingClientRect()
  const actualBorderSize = borderless ? 0 : borderSize

  const resetScrollPositions = () => {
    if (headElement) {
      headElement.scrollLeft = 0
    }
    if (bodyElement) {
      bodyElement.scrollLeft = 0
    }
  }

  // Try to find a scrollable parent container
  let scrollableParent = tableRootElement.parentElement
  while (scrollableParent) {
    const overflowY = window.getComputedStyle(scrollableParent).overflowY
    const isScrollable = overflowY === 'auto' || overflowY === 'scroll'

    if (isScrollable) {
      const parentRect = scrollableParent.getBoundingClientRect()
      const relativeTop = rect.top - parentRect.top
      const targetScrollTop =
        scrollableParent.scrollTop + relativeTop - actualBorderSize
      return smoothScrollTo(scrollableParent, targetScrollTop).then(
        resetScrollPositions
      )
    }

    scrollableParent = scrollableParent.parentElement
  }

  // No scrollable parent found, scroll the window
  const windowScrollTop = rect.top + window.scrollY - actualBorderSize
  return smoothScrollTo(window, windowScrollTop).then(resetScrollPositions)
}
