<script setup lang="ts">
import SLink from './SLink.vue'

defineProps<{
  value: string
  record: any
  color?: 'neutral' | 'soft' | 'mute'
  link?(value: any, record: any): string
}>()
</script>

<template>
  <div class="STableCellText" :class="[{ link }, color ?? 'neutral']">
    <SLink class="container" :href="link?.(value, record)">
      <div class="text">{{ value }}</div>
    </SLink>
  </div>
</template>

<style scoped lang="postcss">
.STableCellText {
  padding: 9px 16px 7px;
}

.text {
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.25s;

  .STableCellText.neutral & { color: var(--c-text-1); }
  .STableCellText.soft &    { color: var(--c-text-2); }
  .STableCellText.mute &    { color: var(--c-text-3); }

  .STableCellText.link & {
    color: var(--c-info);
  }

  .STableCellText.link:hover & {
    color: var(--c-info-dark);
  }
}
</style>
