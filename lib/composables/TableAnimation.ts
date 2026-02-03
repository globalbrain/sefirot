import { nextTick, onBeforeUnmount, ref } from 'vue'

const SKELETON_DELAY = 160 // Delay before showing skeleton on subsequent loads (ms)
const STAGGER_DELAY_PER_ROW = 12 // Delay between each row in stagger animation (ms)
const STAGGER_MAX_DELAY = 120 // Maximum total delay for stagger animation (ms)
const FADE_RESET_DELAY = 280 // Time to keep fade-in class active (160ms fade + 120ms stagger)
const ROW_ENTER_OFFSET = 6 // Vertical offset for row enter animation (px)

export interface VirtualRow {
  index: number
  key: number | string
  size: number
  start: number
}

interface StaggerContext {
  firstVisibleIndex: number
}

export function useTableAnimation(
  virtualItems: () => any[],
  bodyElement: () => HTMLElement | null
) {
  // State
  const isSkeletonVisible = ref(false)
  const isAnimating = ref(false)

  // Timers
  let skeletonTimer: ReturnType<typeof setTimeout> | null = null
  let fadeTimer: ReturnType<typeof setTimeout> | null = null

  // --------------------------------------------------------------------------
  // Private Methods
  // --------------------------------------------------------------------------

  function clearSkeletonTimer() {
    if (skeletonTimer) {
      clearTimeout(skeletonTimer)
      skeletonTimer = null
    }
  }

  function clearFadeTimer() {
    if (fadeTimer) {
      clearTimeout(fadeTimer)
      fadeTimer = null
    }
  }

  function scheduleFadeReset() {
    fadeTimer = setTimeout(() => {
      isAnimating.value = false
      fadeTimer = null
    }, FADE_RESET_DELAY)
  }

  function triggerFadeIn() {
    if (typeof window === 'undefined') {
      isAnimating.value = false
      return
    }

    clearFadeTimer()
    isAnimating.value = false

    nextTick(() => {
      requestAnimationFrame(() => {
        isAnimating.value = true
        scheduleFadeReset()
      })
    })
  }

  // --------------------------------------------------------------------------
  // Public Methods
  // --------------------------------------------------------------------------

  function startLoading(currentRecords: any[]) {
    clearFadeTimer()
    clearSkeletonTimer()

    isAnimating.value = false

    // Show skeleton immediately for initial load, with delay for subsequent loads
    if (currentRecords.length === 0) {
      isSkeletonVisible.value = true
    } else {
      skeletonTimer = setTimeout(() => {
        isSkeletonVisible.value = true
        skeletonTimer = null
      }, SKELETON_DELAY)
    }
  }

  function endLoading() {
    clearSkeletonTimer()

    isSkeletonVisible.value = false

    // Trigger fade-in animation
    triggerFadeIn()
  }

  function cleanup() {
    clearSkeletonTimer()
    clearFadeTimer()
  }

  /**
   * Generate CSS custom properties for row animation.
   * Each row gets a progressive delay based on its position relative to the first visible row.
   */
  function getRowStyle(row: VirtualRow): Record<string, string> {
    const styles: Record<string, string> = {
      '--row-enter-offset': '0px',
      '--row-fade-delay': '0ms'
    }

    if (!isAnimating.value) {
      return styles
    }

    // Calculate first visible index
    const items = virtualItems()
    const body = bodyElement()
    const staggerContext = calculateStaggerContext(items, body)
    const rowOffset = row.index - staggerContext.firstVisibleIndex

    if (rowOffset >= 0) {
      const delay = Math.min(
        rowOffset * STAGGER_DELAY_PER_ROW,
        STAGGER_MAX_DELAY
      )
      styles['--row-enter-offset'] = `${ROW_ENTER_OFFSET}px`
      styles['--row-fade-delay'] = `${delay}ms`
    }

    return styles
  }

  onBeforeUnmount(cleanup)

  return {
    isSkeletonVisible,
    isAnimating,
    startLoading,
    endLoading,
    getRowStyle,
    cleanup
  }
}

// ============================================================================
// Stagger Animation Helpers
// ============================================================================

/**
 * Calculate the first visible row index in the viewport.
 * Used internally to determine where the stagger animation should start.
 */
function calculateStaggerContext(
  virtualItems: any[],
  bodyElement: HTMLElement | null
): StaggerContext {
  if (!virtualItems.length || !bodyElement) {
    return {
      firstVisibleIndex: virtualItems[0]?.index ?? 0
    }
  }

  const scrollTop = bodyElement.scrollTop

  for (const item of virtualItems) {
    if (item.start + item.size > scrollTop) {
      return { firstVisibleIndex: item.index }
    }
  }

  return { firstVisibleIndex: virtualItems[0].index }
}
