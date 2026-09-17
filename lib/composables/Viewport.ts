import { tryOnMounted, useEventListener, useWindowSize } from '@vueuse/core'
import { computed, shallowRef } from 'vue'

/** Fixed overlays follow the visible area, including the iOS keyboard and zoom. */
export function useViewport() {
  const { width, height } = useWindowSize()
  const visual = shallowRef<{ left: number; top: number; width: number; height: number }>()

  function update() {
    const viewport = window.visualViewport
    visual.value = viewport
      ? { left: viewport.offsetLeft, top: viewport.offsetTop, width: viewport.width, height: viewport.height }
      : undefined
  }

  tryOnMounted(() => {
    update()
    useEventListener(window.visualViewport, ['resize', 'scroll'], update)
  })

  return computed(() => visual.value ?? { left: 0, top: 0, width: width.value, height: height.value })
}
