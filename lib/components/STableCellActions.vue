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
    <template v-for="(action, i) in actions" :key="i">
      <SButton
        v-if="action.show == null || action.show(record)"
        size="mini"
        type="text"
        :mode="action.mode ?? 'mute'"
        :icon="action.icon"
        :icon-mode="action.iconMode"
        :label="action.label"
        :label-mode="action.labelMode"
        @click="action.onClick(record)"
      />
    </template>
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
