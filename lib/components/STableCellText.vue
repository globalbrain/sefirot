<script setup lang="ts">
import { type Component, computed } from 'vue'
import SLink from './SLink.vue'

export type Color =
  | 'default'
  | 'mute'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'soft'

const props = defineProps<{
  value?: any
  record: any
  align?: 'left' | 'center' | 'right'
  icon?: Component
  getter?: string | null | ((value: any, record: any) => string | null)
  color?: Color | ((value: any, record: any) => Color)
  iconColor?: Color | ((value: any, record: any) => Color)
  link?: string | null | ((value: any, record: any) => string)
  onClick?(value: any, record: any): void
}>()

const _value = computed(() => {
  if (props.getter === undefined) {
    return props.value
  }

  return typeof props.getter === 'function'
    ? props.getter(props.value, props.record)
    : props.getter
})

const _link = computed(() => {
  return typeof props.link === 'function'
    ? props.link(props.value, props.record)
    : props.link
})

const _color = computed(() => {
  return typeof props.color === 'function'
    ? props.color(props.value, props.record)
    : props.color ?? 'neutral'
})

const _iconColor = computed(() => {
  return typeof props.iconColor === 'function'
    ? props.iconColor(props.value, props.record)
    : props.iconColor ?? _color.value
})
</script>

<template>
  <div class="STableCellText" :class="[align ?? 'left', { link: link || onClick }, _color]">
    <SLink
      v-if="_value"
      class="container"
      :href="_link"
      :role="onClick ? 'button' : null"
      @click="() => onClick?.(value, record)"
    >
      <div v-if="icon" class="icon" :class="[_iconColor ?? _color]">
        <component :is="icon" class="svg" />
      </div>
      <div class="text" :class="[_color]">
        {{ _value }}
      </div>
    </SLink>
  </div>
</template>

<style scoped lang="postcss">
.STableCellText {
  min-height: 40px;
}

.container {
  display: flex;
  gap: 4px;
  padding: 8px 16px;

  .STableCellText.left &   { justify-content: flex-start; }
  .STableCellText.center & { justify-content: center; }
  .STableCellText.right &  { justify-content: flex-end; }
}

.text {
  line-height: 24px;
  font-size: var(--table-cell-font-size);
  font-weight: var(--table-cell-font-weight);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.25s;

  &.neutral { color: var(--c-text-1); }
  &.soft    { color: var(--c-text-2); }
  &.mute    { color: var(--c-text-3); }
  &.info    { color: var(--c-text-info-1); }
  &.success { color: var(--c-text-success-1); }
  &.warning { color: var(--c-text-warning-1); }
  &.danger  { color: var(--c-text-danger-1); }

  .STableCellText.link &       { color: var(--c-text-info-1); }
  .STableCellText.link:hover & { color: var(--c-text-info-2); }

  .STableCellText.link &.neutral       { color: var(--c-text-1); }
  .STableCellText.link:hover &.neutral { color: var(--c-text-info-1); }
  .STableCellText.link &.soft          { color: var(--c-text-2); }
  .STableCellText.link:hover &.soft    { color: var(--c-text-info-1); }
  .STableCellText.link &.mute          { color: var(--c-text-3); }
  .STableCellText.link:hover &.mute    { color: var(--c-text-3); }
  .STableCellText.link &.info          { color: var(--c-text-info-1); }
  .STableCellText.link:hover &.info    { color: var(--c-text-info-2); }
  .STableCellText.link &.success       { color: var(--c-text-success-1); }
  .STableCellText.link:hover &.success { color: var(--c-text-success-2); }
  .STableCellText.link &.warning       { color: var(--c-text-warning-1); }
  .STableCellText.link:hover &.warning { color: var(--c-text-warning-2); }
  .STableCellText.link &.danger        { color: var(--c-text-danger-1); }
  .STableCellText.link:hover &.danger  { color: var(--c-text-danger-2); }

  .STableCell.summary & {
    font-weight: var(--table-cell-summary-font-weight);
  }
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-left: -3px;
  width: 24px;
  height: 24px;
  transition: color 0.25s;

  &.neutral { color: var(--c-text-1); }
  &.soft    { color: var(--c-text-2); }
  &.mute    { color: var(--c-text-3); }

  .STableCellText.link &       { color: var(--c-text-info-1); }
  .STableCellText.link:hover & { color: var(--c-text-info-2); }

  .STableCellText.link &.neutral       { color: var(--c-text-1); }
  .STableCellText.link:hover &.neutral { color: var(--c-text-info-1); }
  .STableCellText.link &.soft          { color: var(--c-text-2); }
  .STableCellText.link:hover &.soft    { color: var(--c-text-info-1); }
  .STableCellText.link &.mute          { color: var(--c-text-3); }
  .STableCellText.link:hover &.mute    { color: var(--c-text-3); }
  .STableCellText.link &.info          { color: var(--c-text-info-1); }
  .STableCellText.link:hover &.info    { color: var(--c-text-info-2); }
  .STableCellText.link &.success       { color: var(--c-text-success-1); }
  .STableCellText.link:hover &.success { color: var(--c-text-success-2); }
  .STableCellText.link &.warning       { color: var(--c-text-warning-1); }
  .STableCellText.link:hover &.warning { color: var(--c-text-warning-2); }
  .STableCellText.link &.danger        { color: var(--c-text-danger-1); }
  .STableCellText.link:hover &.danger  { color: var(--c-text-danger-2); }
}

.svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}
</style>
