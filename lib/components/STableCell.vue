<script setup lang="ts">
import { computed } from 'vue'
import { type TableCell } from '../composables/Table'
import STableCellAvatar from './STableCellAvatar.vue'
import STableCellAvatars from './STableCellAvatars.vue'
import STableCellDay from './STableCellDay.vue'
import STableCellEmpty from './STableCellEmpty.vue'
import STableCellNumber from './STableCellNumber.vue'
import STableCellPill from './STableCellPill.vue'
import STableCellPills from './STableCellPills.vue'
import STableCellState from './STableCellState.vue'
import STableCellText from './STableCellText.vue'

const props = defineProps<{
  name: string
  className?: string
  cell?: any
  value: any
  record: any
  records: Record<string, any>
}>()

const computedCell = computed<TableCell | undefined>(() =>
  typeof props.cell === 'function'
    ? props.cell(props.value, props.record)
    : props.cell
)
</script>

<template>
  <div class="STableCell" :class="[className, `col-${name}`]">
    <STableCellText
      v-if="!computedCell || computedCell.type === 'text'"
      :value="value"
      :record="record"
      :align="computedCell?.align"
      :icon="computedCell?.icon"
      :getter="computedCell?.value"
      :link="computedCell?.link"
      :color="computedCell?.color"
      :icon-color="computedCell?.iconColor"
      :on-click="computedCell?.onClick"
    />
    <STableCellNumber
      v-else-if="computedCell.type === 'number'"
      :value="value"
      :record="record"
      :align="computedCell.align"
      :icon="computedCell.icon"
      :getter="computedCell.value"
      :separator="computedCell.separator"
      :link="computedCell.link"
      :color="computedCell.color"
      :icon-color="computedCell.iconColor"
      :on-click="computedCell.onClick"
    />
    <STableCellDay
      v-else-if="computedCell.type === 'day'"
      :value="value"
      :record="record"
      :align="computedCell.align"
      :getter="computedCell.value"
      :format="computedCell.format"
      :color="computedCell.color"
    />
    <STableCellPill
      v-else-if="computedCell.type === 'pill'"
      :value="value"
      :record="record"
      :getter="computedCell.value"
      :color="computedCell.color"
    />
    <STableCellPills
      v-else-if="computedCell.type === 'pills'"
      :value="value"
      :record="record"
      :pills="computedCell.pills"
    />
    <STableCellState
      v-else-if="computedCell.type === 'state'"
      :value="computedCell.label"
      :mode="computedCell.mode"
    />
    <STableCellAvatar
      v-else-if="computedCell.type === 'avatar'"
      :value="value"
      :record="record"
      :image="computedCell.image"
      :name="computedCell.name"
      :link="computedCell.link"
      :color="computedCell.color"
      :on-click="computedCell.onClick"
    />
    <STableCellAvatars
      v-else-if="computedCell.type === 'avatars'"
      :value="value"
      :record="record"
      :avatars="computedCell.avatars"
      :color="computedCell.color"
    />
    <STableCellEmpty
      v-else-if="computedCell.type === 'empty'"
    />
    <component
      v-else-if="computedCell.type === 'component'"
      :is="computedCell.component"
      :value="value"
      :record="record"
      v-bind="computedCell.props"
    />
  </div>
</template>

<style scoped lang="postcss">
.STableCell {
  background-color: var(--c-bg-elv-up);
  transition: background-color 0.1s;
  overflow: hidden;

  .row:hover & {
    background-color: var(--c-bg-elv-2);
  }

  .summary & {
    background-color: var(--c-bg-elv-2);
  }

  .STableItem:first-child & {
    padding-left: var(--table-padding-left);
  }

  .STableItem:last-child & {
    border-right: 0;
    padding-right: var(--table-padding-right);
  }
}
</style>
