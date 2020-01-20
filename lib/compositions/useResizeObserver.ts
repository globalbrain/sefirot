import { ResizeObserver } from '@juggle/resize-observer'
import { reactive, toRefs, onMounted, onUnmounted, Ref } from '@vue/composition-api'

export interface EL {
  w: number
  h: number
}

export default function useResizeObserver (target: Ref<HTMLElement | null>) {
  const el = reactive({ w: 0, h: 0 })

  const ro = new ResizeObserver((entries) => {
    const entry = entries[0]
    el.w = entry.contentBoxSize[0].inlineSize
    el.h = entry.contentBoxSize[0].blockSize
  })

  onMounted(() => { ro.observe(target.value as HTMLElement) })
  onUnmounted(() => { ro.disconnect() })

  return {
    el: toRefs(el),
    ro
  }
}
