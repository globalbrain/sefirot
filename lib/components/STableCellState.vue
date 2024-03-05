<script setup lang="ts">
import SState, { type Mode } from './SState.vue'

defineProps<{
  value?: string
  mode?: Mode
}>()
</script>

<template>
  <div class="STableCellState" :class="[mode ?? 'neutral']">
    <SState
      v-if="value"
      size="mini"
      :mode="mode"
      :label="value"
    />
  </div>
</template>

<style scoped lang="postcss">
.STableCellState {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  min-height: 40px;
}
</style>
