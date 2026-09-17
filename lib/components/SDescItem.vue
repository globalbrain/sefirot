<script setup lang="ts">
import { computed, inject } from 'vue'
import { type Responsive, layoutLength } from '../composables/Layout'
import SGridItem from './SGridItem.vue'

defineProps<{
  span?: Responsive<string | number>
}>()

const labelWidthProp = inject<() => string | number | undefined>(
  'sefirot-desc-label-width',
  () => undefined
)

const labelWidth = computed(() => {
  const w = labelWidthProp?.()
  return layoutLength(w) ?? '1fr'
})
</script>

<template>
  <SGridItem class="SDescItem" :span>
    <slot />
  </SGridItem>
</template>

<style scoped lang="postcss">
.SDescItem {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
}

.SDesc.row > .SDescItem {
  & {
    grid-template-columns: var(--desc-label-width, v-bind(labelWidth)) minmax(0, 1fr);
  }

  & > :deep(.SDescLabel) {
    height: 24px;
  }

  & > :deep(.SDescLabel > .value) {
    line-height: 24px;
  }
}

.SDesc.divider > .SDescItem:not(:has(> .SDescFile)) {
  border-bottom: 1px dashed var(--c-divider);
  padding-bottom: 7px;
}
.SDesc.wrap > .SDescItem {
  min-width: 0;
  align-content: start;
  overflow-wrap: anywhere;
}

.SDesc.wrap > .SDescItem > :deep(.SDescLabel) { height: auto; }
.SDesc.wrap > .SDescItem > :deep(.SDescLabel .value) {
  min-width: 0;
  white-space: normal;
  overflow-wrap: anywhere;
  overflow: visible;
  text-overflow: clip;
}
</style>
