<script setup lang="ts">
import { TableCell } from '../composables/Table'
import STableCellAvatar from './STableCellAvatar.vue'
import STableCellAvatars from './STableCellAvatars.vue'
import STableCellDay from './STableCellDay.vue'
import STableCellPill from './STableCellPill.vue'
import STableCellText from './STableCellText.vue'

defineProps<{
  name: string
  cell?: TableCell
  value: any
  record: any
  records: Record<string, any>
}>()
</script>

<template>
  <div class="STableCell" :class="[`col-${name}`]">
    <STableCellText
      v-if="!cell || cell.type === 'text'"
      :value="value"
      :record="record"
      :icon="cell?.icon"
      :getter="cell?.value"
      :link="cell?.link"
      :callback="cell?.callback"
      :color="cell?.color"
      :icon-color="cell?.iconColor"
    />
    <STableCellDay
      v-else-if="cell.type === 'day'"
      :value="value"
      :record="record"
      :format="cell.format"
      :color="cell.color"
    />
    <STableCellPill
      v-else-if="cell.type === 'pill'"
      :value="value"
      :record="record"
      :getter="cell.value"
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
    <STableCellAvatars
      v-else-if="cell.type === 'avatars'"
      :value="value"
      :record="record"
      :avatars="cell.avatars"
      :color="cell.color"
    />
  </div>
</template>

<style scoped lang="postcss">
.STableCell {
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
