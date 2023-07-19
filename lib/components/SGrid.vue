<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  cols?: string | number
  gap?: string | number
}>()

const styles = computed(() => {
  return {
    gridTemplateColumns: `repeat(${props.cols ?? 1}, minmax(0, 1fr))`,
    gap: `${props.gap ?? 0}px`
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
}
</style>
