<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  cols?: string | number
  gap?: string | number
}>()

const gridTemplateColumns = computed(() => {
  return `repeat(${props.cols ?? 1}, minmax(0, 1fr))`
})

const gap = computed(() => {
  return `${props.gap ?? 0}px`
})
</script>

<template>
  <div class="SGrid">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SGrid {
  display: grid;
  grid-template-columns: v-bind(gridTemplateColumns);
  gap: v-bind(gap);
}
</style>
