<script setup lang="ts">
import { type ColorMode } from '../support/Color'
import SState from './SState.vue'

defineProps<{
  state?: string
  mode?: ColorMode
}>()
</script>

<template>
  <div class="STableCellState" :class="[mode ?? 'neutral']">
    <SState
      v-if="state"
      size="mini"
      :mode
      :label="state"
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
