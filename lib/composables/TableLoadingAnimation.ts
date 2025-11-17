import { nextTick, onBeforeUnmount, ref } from 'vue'

export interface LoadingAnimationConfig {
  skeletonDelay: number
  staggerDelayPerRow: number
  staggerMaxDelay: number
  fadeResetDelay: number
  rowEnterOffset: number
}

export interface StaggerContext {
  firstVisibleIndex: number
}

export interface VirtualRow {
  index: number
  key: number | string
  size: number
  start: number
}

export const DEFAULT_ANIMATION_CONFIG: LoadingAnimationConfig = {
  skeletonDelay: 200,
  staggerDelayPerRow: 12,
  staggerMaxDelay: 120,
  fadeResetDelay: 280, // 160ms fade + 120ms stagger
  rowEnterOffset: 6
}

export function useTableLoadingAnimation(config: LoadingAnimationConfig = DEFAULT_ANIMATION_CONFIG) {
  const showSkeleton = ref(false)
  const shouldFadeIn = ref(false)
  const displayedRecords = ref<any[] | null>(null)

  let skeletonTimer: ReturnType<typeof setTimeout> | null = null
  let fadeTimer: ReturnType<typeof setTimeout> | null = null

  function triggerFadeIn() {
    if (typeof window === 'undefined') {
      shouldFadeIn.value = false
      return
    }

    if (fadeTimer) {
      clearTimeout(fadeTimer)
      fadeTimer = null
    }

    shouldFadeIn.value = false

    nextTick(() => {
      requestAnimationFrame(() => {
        shouldFadeIn.value = true
        fadeTimer = setTimeout(() => {
          shouldFadeIn.value = false
          fadeTimer = null
        }, config.fadeResetDelay)
      })
    })
  }

  function startLoadingState(currentRecords: any[]) {
    if (fadeTimer) {
      clearTimeout(fadeTimer)
      fadeTimer = null
    }

    shouldFadeIn.value = false

    if (skeletonTimer) {
      clearTimeout(skeletonTimer)
    }

    // Take a snapshot of current records before loading starts
    displayedRecords.value = currentRecords

    // Show skeleton immediately if there are no existing records (initial load)
    const hasRecords = displayedRecords.value.length
    if (hasRecords === 0) {
      showSkeleton.value = true
    } else {
      skeletonTimer = setTimeout(() => {
        showSkeleton.value = true
        skeletonTimer = null
      }, config.skeletonDelay)
    }
  }

  function endLoadingState(
    headElement: HTMLElement | null,
    bodyElement: HTMLElement | null
  ) {
    if (skeletonTimer) {
      clearTimeout(skeletonTimer)
      skeletonTimer = null
    }

    showSkeleton.value = false

    // Update records and trigger fade immediately
    displayedRecords.value = null
    triggerFadeIn()

    // Reset horizontal scroll
    if (headElement) {
      headElement.scrollLeft = 0
    }
    if (bodyElement) {
      bodyElement.scrollLeft = 0
    }
  }

  function cleanup() {
    if (skeletonTimer) {
      clearTimeout(skeletonTimer)
      skeletonTimer = null
    }

    if (fadeTimer) {
      clearTimeout(fadeTimer)
      fadeTimer = null
    }
  }

  onBeforeUnmount(cleanup)

  return {
    showSkeleton,
    shouldFadeIn,
    displayedRecords,
    config,
    startLoadingState,
    endLoadingState,
    triggerFadeIn,
    cleanup
  }
}

export function calculateStaggerContext(
  virtualItems: any[],
  bodyElement: HTMLElement | null
): StaggerContext {
  if (!virtualItems.length) {
    return {
      firstVisibleIndex: 0
    }
  }

  if (!bodyElement) {
    return {
      firstVisibleIndex: virtualItems[0].index
    }
  }

  const scrollTop = bodyElement.scrollTop

  let firstVisibleIndex = virtualItems[0].index
  for (const item of virtualItems) {
    const itemBottom = item.start + item.size
    if (itemBottom > scrollTop) {
      firstVisibleIndex = item.index
      break
    }
  }

  return {
    firstVisibleIndex
  }
}

export function getRowContentStyle(
  item: VirtualRow,
  shouldFadeIn: boolean,
  staggerContext: StaggerContext,
  config: LoadingAnimationConfig
): Record<string, string> {
  const styles: Record<string, string> = {
    '--row-enter-offset': '0px',
    '--row-fade-delay': '0ms'
  }

  if (shouldFadeIn) {
    const { firstVisibleIndex } = staggerContext
    const offset = item.index - firstVisibleIndex

    if (offset >= 0) {
      const delay = Math.min(
        offset * config.staggerDelayPerRow,
        config.staggerMaxDelay
      )
      styles['--row-enter-offset'] = `${config.rowEnterOffset}px`
      styles['--row-fade-delay'] = `${delay}ms`
    }
  }

  return styles
}
