<script setup lang="ts">
import { type TableCellPathSegment } from '../composables/Table'
import SLink from './SLink.vue'

defineProps<{
  segments: TableCellPathSegment[]
}>()

function classes(item: TableCellPathSegment) {
  return [
    item.color ?? 'neutral',
    { link: !!item.link || !!item.onClick }
  ]
}
</script>

<template>
  <div class="STableCellPath">
    <template v-for="(segment, i) in segments" :key="i">
      <div v-if="i > 0" class="divider">/</div>
      <SLink
        class="text"
        :class="classes(segment)"
        :href="segment.link"
        @click="segment.onClick"
      >
        {{ segment.text }}
      </SLink>
    </template>
  </div>
</template>

<style scoped lang="postcss">
.STableCellPath {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 16px;
  min-height: 40px;
}

.divider {
  color: var(--c-text-3);
}

.text {
  line-height: 24px;
  font-size: 14px;
  transition: color 0.25s;

  &.neutral { color: var(--c-text-1); }
  &.soft    { color: var(--c-text-2); }
  &.mute    { color: var(--c-text-3); }
  &.info    { color: var(--c-text-info-1); }
  &.success { color: var(--c-text-success-1); }
  &.warning { color: var(--c-text-warning-1); }
  &.danger  { color: var(--c-text-danger-1); }

  &.link {
    cursor: pointer;
  }

  &.link.neutral:hover { color: var(--c-text-info-1); }
  &.link.soft:hover    { color: var(--c-text-info-1); }
  &.link.mute:hover    { color: var(--c-text-info-1); }
  &.link.info:hover    { color: var(--c-text-info-2); }
  &.link.success:hover { color: var(--c-text-success-2); }
  &.link.warning:hover { color: var(--c-text-warning-2); }
  &.link.danger:hover  { color: var(--c-text-danger-2); }
}
</style>
