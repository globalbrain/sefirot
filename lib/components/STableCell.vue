<script setup lang="ts">
import STableCellText from './STableCellText.vue'
import STableCellDay from './STableCellDay.vue'
import STableCellAvatar from './STableCellAvatar.vue'
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
  <td class="STableCell" :class="[`col-${name}`]">
    <STableCellText
      v-if="!cell || cell.type === 'text'"
      :value="value"
      :record="record"
      :getter="cell?.value"
      :link="cell?.link"
      :color="cell?.color"
    />
    <STableCellDay
      v-else-if="cell.type === 'day'"
      :value="value"
      :record="record"
      :format="cell.format"
      :color="cell.color"
    />
    <STableCellAvatar
      v-else-if="cell.type === 'avatar'"
      :value="value"
      :record="record"
      :image="cell.image"
      :name="cell.name"
      :link="cell.link"
      :color="cell.color"
    />
  </td>
</template>

<style scoped lang="postcss">
.STableCell {
  position: var(--table-col-position, relative);
  left: 0;
  z-index: var(--table-col-z-index, auto);
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
