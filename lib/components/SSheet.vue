<template>
  <article class="SSheet" :class="[size]">
    <slot :close="close" />
  </article>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import { useStore } from '../composables/Store'

type Size = 'small' | 'medium' | 'large'

export default defineComponent({
  props: {
    size: { type: String as PropType<Size>, default: 'medium' }
  },

  setup() {
    const store = useStore()

    function close() {
      store.dispatch('modal/close')
    }

    return {
      close
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SSheet {
  margin: 0 auto;
  border: 1px solid var(--c-divider-light);
  border-radius: 8px;
  background-color: var(--c-bg);
  box-shadow: var(--shadow-depth-3);
  overflow: hidden;
}

.SSheet.small  { max-width: 392px; }
.SSheet.medium { max-width: 512px; }
.SSheet.large  { max-width: 768px; }
</style>
