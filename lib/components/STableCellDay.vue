<script setup lang="ts">
import { Day } from '../support/Day'

defineProps<{
  value?: Day | null
  record: any
  format?: string
  color?: 'neutral' | 'soft' | 'mute'
}>()
</script>

<template>
  <div class="STableCellDay" :class="[color ?? 'neutral']">
    <div v-if="value" class="value">
      {{ value.format(format ?? 'YYYY / MM / DD HH:mm:ss') }}
    </div>
  </div>
</template>

<style scoped lang="postcss">
.STableCellDay {
  padding: 8px 16px;
  min-height: 40px;
}

.value {
  line-height: 24px;
  font-family: var(--font-family-number);
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.25s;

  .STableCellDay.neutral & { color: var(--c-text-1); }
  .STableCellDay.soft &    { color: var(--c-text-2); }
  .STableCellDay.mute &    { color: var(--c-text-3); }
}
</style>
