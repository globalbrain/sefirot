<script setup lang="ts">
import { type TableAction } from '../composables/Table'
import STableHeaderActionItem from './STableHeaderActionItem.vue'

defineProps<{ actions: TableAction[] }>()
</script>

<template>
  <div class="STableHeaderActions">
    <STableHeaderActionItem v-for="action in actions" :key="action.label" v-bind="action" />
  </div>
</template>

<style scoped lang="postcss">
.STableHeaderActions {
  display: flex;
  flex-grow: 1;
  gap: 8px;
}
</style>
