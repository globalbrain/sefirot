<template>
  <div ref="target" class="SResponsive" :class="el.classes">
    <slot :el="el" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, PropType } from '@vue/composition-api'
import useResizeObserver, { EL as BaseEL } from '../compositions/useResizeObserver'

export interface EL extends BaseEL {
  is: Record<string, boolean>
}

export interface BP {
  [name: string]: (el: EL) => boolean
}

export default defineComponent({
  props: {
    bp: { type: Object as PropType<BP>, default: () => ({}) }
  },

  setup(props) {
    const target = ref<HTMLElement | null>(null)

    const { el: baseEl } = useResizeObserver(target)

    const el = reactive({
      ...baseEl,
      is: computed(() => {
        const classes: Record<string, boolean> = {}
        for (const name in props.bp) {
          classes[name] = props.bp[name](el)
        }
        return classes
      })
    })

    return {
      target,
      el
    }
  }
})
</script>
