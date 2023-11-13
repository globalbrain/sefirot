<script setup lang="ts">
import { type TableCellAction } from '../composables/Table'
import SButton from './SButton.vue'

defineProps<{
  record: any
  actions: TableCellAction[]
}>()
</script>

<template>
  <div class="STableCellActions">
    <SButton
      v-for="(action, i) in actions"
      :key="i"
      size="mini"
      type="text"
      :mode="action.mode ?? 'mute'"
      :icon="action.icon"
      :icon-mode="action.iconMode"
      :label="action.label"
      :label-mode="action.labelMode"
      @click="action.onClick(record)"
    />
  </div>
</template>

<style scoped lang="postcss">
.STableCellActions {
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  flex-direction: row;
}
</style>
