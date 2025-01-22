<script setup lang="ts">
import SIndicator, { type State } from './SIndicator.vue'

defineProps<{
  state: State
  label?: string | null
}>()
</script>

<template>
  <div class="STableCellIndicator" :class="[state]">
    <SIndicator size="nano" :state="state" />
    <div v-if="label" class="text">{{ label }}</div>
  </div>
</template>

<style scoped lang="postcss">
.STableCellIndicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  min-height: 40px;
}

.text {
  line-height: 24px;
  font-size: 14px;
}

.STableCellIndicator.pending .text   { color: var(--c-text-1); }
.STableCellIndicator.ready .text     { color: var(--c-text-1); }
.STableCellIndicator.queued .text    { color: var(--c-text-1); }
.STableCellIndicator.running .text   { color: var(--c-text-1); }
.STableCellIndicator.completed .text { color: var(--c-text-1); }
.STableCellIndicator.failed .text    { color: var(--c-text-3); }
.STableCellIndicator.aborted .text   { color: var(--c-text-3); }
</style>
