<script setup lang="ts">
import { computed } from 'vue'
import { provideDataListState } from '../composables/DataList'

const props = withDefaults(defineProps<{
  labelWidth?: string
}>(), {
  labelWidth: '128px'
})

provideDataListState({
  labelWidth: computed(() => props.labelWidth)
})
</script>

<template>
  <div class="SDataList">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SDataList :deep(.SDataListItem::after),
.SDataList :deep(.SDataListItem:first-child::before) {
  display: block;
  border-top: 1px dashed var(--c-divider);
  width: 100%;
  content: "";
}
</style>
