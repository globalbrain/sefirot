<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  cols?: string | number
  gap?: string | number
  gapRow?: string | number
  gapCol?: string | number
}>()

const styles = computed(() => {
  return {
    '--grid-template-columns': `repeat(${props.cols || 1}, minmax(0, 1fr))`,
    '--gap': `${props.gapRow || props.gap || 0}px ${props.gapCol || props.gap || 0}px`
  }
})
</script>

<template>
  <div class="SGrid" :style="styles">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SGrid {
  display: grid;
  grid-template-columns: var(--grid-template-columns);
  gap: var(--gap);
}
</style>
