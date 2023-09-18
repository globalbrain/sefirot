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
  padding: 0 16px;
  gap: 32px;

  > :deep(*):not(:first-child)::before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 16px;
    background-color: var(--c-divider-2);
    transform: translate(-16px, 4px);
  }
}
</style>
