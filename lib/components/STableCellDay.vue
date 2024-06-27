<script setup lang="ts">
import { type Day } from '../support/Day'

defineProps<{
  day?: Day | null
  align?: 'left' | 'center' | 'right'
  format?: string
  color?: 'neutral' | 'soft' | 'mute'
}>()
</script>

<template>
  <div class="STableCellDay" :class="[align ?? 'left', color ?? 'neutral']">
    <div v-if="day" class="value">
      {{ day.format(format ?? 'YYYY-MM-DD HH:mm:ss') }}
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
  font-size: var(--table-cell-font-size);
  font-weight: var(--table-cell-font-weight);
  font-feature-settings: "tnum";
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.25s;

  .STableCellDay.left &   { text-align: left; }
  .STableCellDay.center & { text-align: center; }
  .STableCellDay.right &  { text-align: right; }

  .STableCellDay.neutral & { color: var(--c-text-1); }
  .STableCellDay.soft &    { color: var(--c-text-2); }
  .STableCellDay.mute &    { color: var(--c-text-3); }

  .STableCell.summary & {
    font-weight: var(--table-cell-summary-font-weight);
  }
}
</style>
