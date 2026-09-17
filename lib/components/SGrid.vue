<script setup lang="ts">
import { computed, provide } from 'vue'
import { GridColumnsKey } from '../composables/Grid'
import { type Responsive, layoutLength, useLayout, useResponsive } from '../composables/Layout'

const props = defineProps<{
  cols?: Responsive<string | number>
  gap?: Responsive<string | number>
  gapRow?: Responsive<string | number>
  gapCol?: Responsive<string | number>
}>()

const layout = useLayout()
const cols = useResponsive(() => props.cols || 1)
const gap = useResponsive(() => props.gap || 0)
const gapRow = useResponsive(() => props.gapRow || undefined)
const gapCol = useResponsive(() => props.gapCol || undefined)

provide(GridColumnsKey, cols)

const styles = computed(() => ({
  '--grid-template-columns': `repeat(${cols.value}, minmax(0, 1fr))`,
  '--gap': `${layoutLength(gapRow.value ?? gap.value)} ${layoutLength(gapCol.value ?? gap.value)}`
}))
</script>

<template>
  <div class="SGrid" :style="styles" :data-layout="layout">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SGrid {
  display: grid;
  grid-template-columns: var(--grid-template-columns);
  gap: var(--gap);
}
.SGrid[data-layout="mobile"] { min-width: 0; }
</style>
