<script setup lang="ts">
import SLink from './SLink.vue'
import STableCell from './STableCell.vue'

defineProps<{
  text: string
  link?: string
  color?: 'neutral' | 'soft' | 'mute'
}>()
</script>

<template>
  <STableCell class="STableCellText" :class="[{ link }, color ?? 'neutral']">
    <SLink class="content" :href="link">
      <div class="text">{{ text }}</div>
    </SLink>
  </STableCell>
</template>

<style scoped lang="postcss">
.text {
  padding: 9px 16px 7px;
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
