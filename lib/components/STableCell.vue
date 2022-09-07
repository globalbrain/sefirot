<script setup lang="ts">
import STableCellText from './STableCellText.vue'
import { TableCell } from '../composables/Table'

defineProps<{
  name: string
  cell?: TableCell
  value: any
  record: any
  records: Record<string, any>
}>()
</script>

<template>
  <td class="STableCell" :class="[name]">
    <STableCellText
      v-if="!cell || cell.type === 'text'"
      :value="value"
      :record="record"
      :color="cell?.color"
      :link="cell?.link"
    />
  </td>
</template>

<style scoped lang="postcss">
.STableCell {
  border-top: 1px solid var(--c-divider-light);
  border-right: 1px solid var(--c-divider-light);
  max-width: 0;
  background-color: var(--c-bg-elv-up);
  transition: background-color 0.1s;
  overflow: hidden;

  .row:hover & {
    background-color: var(--c-bg-elv);
  }

  &:first-child {
    padding-left: var(--table-padding-left);
  }

  &:last-child {
    border-right: 0;
    padding-right: var(--table-padding-right);
  }
}
</style>
