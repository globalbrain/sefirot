<script setup lang="ts">
import { computed } from 'vue'
import SIcon from './SIcon.vue'
import SLink from './SLink.vue'

export type Color =
  | 'neutral'
  | 'soft'
  | 'mute'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'

const props = defineProps<{
  value?: any
  record: any
  align?: 'left' | 'center' | 'right'
  icon?: any
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
        <SIcon :icon="icon" class="svg" />
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
  &.info    { color: var(--c-info-text); }
  &.success { color: var(--c-success-text); }
  &.warning { color: var(--c-warning-text); }
  &.danger  { color: var(--c-danger-text); }

  .STableCellText.link &       { color: var(--c-info-text); }
  .STableCellText.link:hover & { color: var(--c-info-text-dark); }

  .STableCellText.link &.neutral       { color: var(--c-text-1); }
  .STableCellText.link:hover &.neutral { color: var(--c-info-text); }
  .STableCellText.link &.soft          { color: var(--c-text-2); }
  .STableCellText.link:hover &.soft    { color: var(--c-info-text); }
  .STableCellText.link &.mute          { color: var(--c-text-3); }
  .STableCellText.link:hover &.mute    { color: var(--c-text-3); }
  .STableCellText.link &.info          { color: var(--c-info-text); }
  .STableCellText.link:hover &.info    { color: var(--c-info-text-dark); }
  .STableCellText.link &.success       { color: var(--c-success-text); }
  .STableCellText.link:hover &.success { color: var(--c-success-text-dark); }
  .STableCellText.link &.warning       { color: var(--c-warning-text); }
  .STableCellText.link:hover &.warning { color: var(--c-warning-text-darker); }
  .STableCellText.link &.danger        { color: var(--c-danger-text); }
  .STableCellText.link:hover &.danger  { color: var(--c-danger-text-dark); }

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

  .STableCellText.link &       { color: var(--c-info-text); }
  .STableCellText.link:hover & { color: var(--c-info-text-dark); }

  .STableCellText.link &.neutral       { color: var(--c-text-1); }
  .STableCellText.link:hover &.neutral { color: var(--c-info-text); }
  .STableCellText.link &.soft          { color: var(--c-text-2); }
  .STableCellText.link:hover &.soft    { color: var(--c-info-text); }
  .STableCellText.link &.mute          { color: var(--c-text-3); }
  .STableCellText.link:hover &.mute    { color: var(--c-info-text); }
  .STableCellText.link &.info          { color: var(--c-info-text); }
  .STableCellText.link:hover &.info    { color: var(--c-info-dark); }
  .STableCellText.link &.success       { color: var(--c-success-text); }
  .STableCellText.link:hover &.success { color: var(--c-success-text-dark); }
  .STableCellText.link &.warning       { color: var(--c-warning-text); }
  .STableCellText.link:hover &.warning { color: var(--c-warning-text-dark); }
  .STableCellText.link &.danger        { color: var(--c-danger-text); }
  .STableCellText.link:hover &.danger  { color: var(--c-danger-text-dark); }
}

.svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}
</style>
