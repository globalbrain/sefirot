<script setup lang="ts">
import { type TableAction } from '../composables/Table'

withDefaults(defineProps<TableAction>(), { show: true })
</script>

<template>
  <template v-if="show">
    <button
      v-if="onClick"
      class="STableHeaderActionItem button"
      :class="type"
      @click="onClick"
    >
      {{ label }}
    </button>
    <p class="STableHeaderActionItem" v-else>{{ label }}</p>
  </template>
</template>

<style scoped lang="postcss">
.STableHeaderActionItem {
  padding: 12px 0;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  transition: color 0.25s;
  color: var(--c-text-2);

  &.neutral {
    color: var(--c-neutral-text);
    &.button:hover { color: var(--c-neutral-text-dark); }
  }

  &.mute {
    color: var(--c-mute-text);
    &.button:hover { color: var(--c-mute-text-dark); }
  }

  &.info {
    color: var(--c-info-text);
    &.button:hover { color: var(--c-info-text-dark); }
  }

  &.success {
    color: var(--c-success-text);
    &.button:hover { color: var(--c-success-text-dark); }
  }

  &.warning {
    color: var(--c-warning-text);
    &.button:hover { color: var(--c-warning-text-dark); }
  }

  &.danger {
    color: var(--c-danger-text);
    &.button:hover { color: var(--c-danger-text-dark); }
  }
}
</style>
