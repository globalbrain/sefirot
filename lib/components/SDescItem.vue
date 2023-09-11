<script setup lang="ts">
import { computed, inject } from 'vue'
import SGridItem from './SGridItem.vue'

defineProps<{
  span?: string | number
}>()

const labelWidthProp = inject<() => string | number | undefined>(
  'sefirot-desc-label-width', () => undefined
)

const labelWidth = computed(() => {
  const w = labelWidthProp?.()
  return w ? `${w}px` : '1fr'
})
</script>

<template>
  <SGridItem class="SDescItem" :span="span">
    <slot />
  </SGridItem>
</template>

<style scoped lang="postcss">
.SDescItem {
  display: grid;
}

.SDesc.row > .SDescItem {
  grid-template-columns: var(--desc-label-width, v-bind(labelWidth)) 1fr;
}

.SDesc.divider > .SDescItem {
  border-bottom: 1px dashed var(--c-divider-1);
  padding-bottom: 7px;
}
</style>
