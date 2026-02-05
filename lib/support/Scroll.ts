// The browser-native smooth scroll animation is too soft and slow, too catchy.
// This module provides a custom smooth scroll that is more subtle and faster.

// Duration configuration (in milliseconds)
const MIN_SCROLL_DURATION = 100
const MAX_SCROLL_DURATION = 160
const DURATION_SCALE_FACTOR = 0.15
const TOP_OFFSET_TOLERANCE_PX = 10
type ScrollTarget = HTMLElement | Window

const topOffsetCache = new WeakMap<HTMLElement, number>()

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

function getScrollTop(target: ScrollTarget): number {
  return target instanceof Window ? target.scrollY : target.scrollTop
}

function setScrollTop(target: ScrollTarget, value: number): void {
  if (target instanceof Window) {
    target.scrollTo(0, value)
  } else {
    target.scrollTop = value
  }
}

function getEventTarget(target: ScrollTarget): EventTarget {
  return target instanceof Window ? window : target
}

/**
 * Smoothly scroll an element to a target Y position with adaptive duration.
 * The animation can be interrupted by user interaction (wheel, touch, mouse, keyboard).
 */
function smoothScrollTo(target: ScrollTarget, targetY: number): Promise<void> {
  const from = getScrollTop(target)
  const delta = targetY - from

  // Skip animation for very small distances
  if (Math.abs(delta) < 1) {
    return Promise.resolve()
  }

  const duration = calculateScrollDuration(delta)
  let startTime: number | null = null
  let animationFrame: number | null = null
  let resolvePromise: () => void = () => undefined
  let settled = false

  // Allow user to interrupt the scroll
  const controller = new AbortController()
  const finishScroll = () => {
    if (settled) {
      return
    }
    settled = true
    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame)
      animationFrame = null
    }
    controller.abort()
    resolvePromise()
  }
  const cancel = () => {
    if (controller.signal.aborted) {
      return
    }
    finishScroll()
  }

  const opts = { passive: true, signal: controller.signal } as const

  const eventTarget = getEventTarget(target)
  eventTarget.addEventListener('wheel', cancel, opts)
  eventTarget.addEventListener('touchstart', cancel, opts)
  eventTarget.addEventListener('mousedown', cancel, opts)
  eventTarget.addEventListener('keydown', cancel, opts)

  return new Promise<void>((resolve) => {
    resolvePromise = resolve

    function step(currentTime: number): void {
      if (controller.signal.aborted) {
        finishScroll()
        return
      }

      if (startTime === null) {
        startTime = currentTime
      }

      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)
      const position = from + delta * eased

      setScrollTop(target, position)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      } else {
        animationFrame = null
        finishScroll()
      }
    }

    animationFrame = requestAnimationFrame(step)
  })
}

/**
 * Detect fixed or sticky elements at the top of the viewport and calculate
 * the total height they occupy.
 */
function detectTopOffset(tableRootElement: HTMLElement): number {
  if (typeof document === 'undefined') {
    return 0
  }

  if (topOffsetCache.has(tableRootElement)) {
    return topOffsetCache.get(tableRootElement) ?? 0
  }

  let maxBottom = 0
  const elements = document.querySelectorAll('*')

  for (const el of elements) {
    const styles = window.getComputedStyle(el)
    const position = styles.position

    // Only consider fixed or sticky elements
    if (position !== 'fixed' && position !== 'sticky') {
      continue
    }

    const rect = el.getBoundingClientRect()

    // Check if element is positioned at or near the top
    // and is visible
    if (
      rect.top <= TOP_OFFSET_TOLERANCE_PX
      && rect.height > 0
      && rect.width > 0
    ) {
      // Track the furthest bottom edge
      maxBottom = Math.max(maxBottom, rect.bottom)
    }
  }

  const computed = maxBottom > 0 ? maxBottom : 0
  topOffsetCache.set(tableRootElement, computed)
  return computed
}

function isAlreadyVisible(
  relativeTop: number,
  containerHeight: number,
  topOffset: number
): boolean {
  const isNotCoveredByHeader = relativeTop >= topOffset
  const isInView = relativeTop < containerHeight
  return isNotCoveredByHeader && isInView
}

function getTargetScrollTop(
  currentScrollTop: number,
  relativeTop: number,
  borderOffset: number,
  topOffset: number
): number {
  return currentScrollTop + relativeTop - borderOffset - topOffset
}

/**
 * Scroll the page so the table is positioned at the top of the viewport.
 * Finds the nearest scrollable parent or scrolls the window if needed.
 * Automatically accounts for fixed/sticky headers at the top.
 */
export function scrollTableIntoView(
  tableRootElement: HTMLElement,
  headElement: HTMLElement | null,
  bodyElement: HTMLElement | null,
  borderless: boolean,
  borderSize: number
): Promise<void> {
  const rect = tableRootElement.getBoundingClientRect()
  const borderOffset = borderless ? 0 : borderSize
  const topOffset = detectTopOffset(tableRootElement)

  const resetHorizontalScroll = () => {
    if (headElement) {
      headElement.scrollLeft = 0
    }
    if (bodyElement) {
      bodyElement.scrollLeft = 0
    }
  }

  // Smooth scroll the table body to the top
  const bodyScrollToTop = bodyElement
    ? smoothScrollTo(bodyElement, 0)
    : Promise.resolve()
  const resetAfterBodyScrollToTop = () =>
    bodyScrollToTop.then(() => resetHorizontalScroll())
  const runContainerScrollAndReset = (containerScrollToTable: Promise<void>) =>
    Promise.all([containerScrollToTable, bodyScrollToTop]).then(() =>
      resetHorizontalScroll()
    )

  // Try to find a scrollable parent container
  let scrollableParent = tableRootElement.parentElement
  while (scrollableParent) {
    const overflowY = window.getComputedStyle(scrollableParent).overflowY
    const isScrollable = overflowY === 'auto' || overflowY === 'scroll'

    if (isScrollable) {
      const parentRect = scrollableParent.getBoundingClientRect()
      const relativeTop = rect.top - parentRect.top

      if (isAlreadyVisible(relativeTop, parentRect.height, topOffset)) {
        return resetAfterBodyScrollToTop()
      }

      const targetScrollTop = getTargetScrollTop(
        scrollableParent.scrollTop,
        relativeTop,
        borderOffset,
        topOffset
      )
      return runContainerScrollAndReset(
        smoothScrollTo(scrollableParent, targetScrollTop)
      )
    }

    scrollableParent = scrollableParent.parentElement
  }

  // No scrollable parent found, check window scroll

  if (isAlreadyVisible(rect.top, window.innerHeight, topOffset)) {
    return resetAfterBodyScrollToTop()
  }

  const windowScrollTop = getTargetScrollTop(
    window.scrollY,
    rect.top,
    borderOffset,
    topOffset
  )
  return runContainerScrollAndReset(smoothScrollTo(window, windowScrollTop))
}
