<script setup lang="ts">
import { type TableCellPillItem } from '../composables/Table'
import STableCellPill from './STableCellPill.vue'

defineProps<{
  pills: TableCellPillItem[]
}>()
</script>

<template>
  <div class="STableCellPills">
    <STableCellPill
      v-for="item in pills"
      :key="item.label"
      :pill="item.label"
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
