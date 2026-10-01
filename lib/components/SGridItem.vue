<script setup lang="ts">
import { type ComputedRef, computed, inject } from 'vue'
import { GridColumnsKey } from '../composables/Grid'
import { type Responsive, useLayout, useResponsive } from '../composables/Layout'

const props = defineProps<{
  span?: Responsive<string | number>
}>()

const layout = useLayout()
const cols = inject<ComputedRef<string | number> | undefined>(GridColumnsKey, undefined)
const span = useResponsive(() => props.span)
const column = computed(() => {
  if (!span.value) { return undefined }
  // A collapsed mobile grid must not create implicit tracks from desktop spans.
  const value = layout.value === 'mobile' && cols && Number.isFinite(Number(span.value)) && Number.isFinite(Number(cols.value))
    ? Math.min(Number(span.value), Number(cols.value))
    : span.value
  return `span ${value}`
})
</script>

<template>
  <div class="SGridItem" :data-layout="layout" :style="{ gridColumn: column }">
    <slot />
  </div>
</template>

<style scoped>
.SGridItem[data-layout="mobile"] { min-width: 0; }
</style>
