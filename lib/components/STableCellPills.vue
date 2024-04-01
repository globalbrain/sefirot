<script setup lang="ts">
import { computed } from 'vue'
import { type TableCellPillItem } from '../composables/Table'
import STableCellPill from './STableCellPill.vue'

const props = defineProps<{
  value?: any
  record?: any
  pills: TableCellPillItem[] | ((value: any, record: any) => TableCellPillItem[])
}>()

const items = computed(() => {
  return Array.isArray(props.pills)
    ? props.pills
    : props.pills(props.value, props.record)
})
</script>

<template>
  <div class="STableCellPills">
    <STableCellPill
      v-for="item in items"
      :key="item.label"
      :value="item.label"
      :record="record"
      :color="item.color"
    />
  </div>
</template>

<style scoped lang="postcss">
.STableCellPills {
  display: flex;
  padding: 0 14px;
  min-height: 40px;

  :deep(.STableCellPill) {
    padding-right: 2px;
    padding-left: 2px;
  }
}
</style>
