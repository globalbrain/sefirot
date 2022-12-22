<script setup lang="ts">
import { computed } from 'vue'
import { TableCellPillColor } from '../composables/Table'
import STableCellPill from './STableCellPill.vue'

const props = defineProps<{
  value: string[]
  record: any
  pills(value: string[], record: any): { label: string; color: TableCellPillColor }[]
}>()

const items = computed(() => props.pills(props.value, props.record))
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
  padding: 0 12px;

  :deep(.STableCellPill) {
    padding-right: 4px;
    padding-left: 4px;
  }
}
</style>
