<script setup lang="ts">
import { computed } from 'vue'
import SIcon from './SIcon.vue'
import SLink from './SLink.vue'

export type Color =
  | 'neutral'
  | 'soft'
  | 'mute'
  | 'info'
  | 'warning'
  | 'danger'

const props = defineProps<{
  value?: any
  record: any
  icon?: any
  getter?: string | ((value: any) => string)
  color?: Color | ((value: any, record: any) => Color)
  iconColor?: Color | ((value: any, record: any) => Color)
  link?(value: any, record: any): string
}>()

const _value = computed(() => {
  if (props.getter === undefined) {
    return props.value
  }

  return typeof props.getter === 'string'
    ? props.getter
    : props.getter(props.value)
})

const _color = computed(() => {
  return typeof props.color === 'function'
    ? props.color(props.value, props.record)
    : props.color ?? 'neutral'
})

const _iconColor = computed(() => {
  return typeof props.iconColor === 'function'
    ? props.iconColor(props.value, props.record)
    : props.iconColor ?? 'neutral'
})
</script>

<template>
  <div class="STableCellText" :class="[{ link }, _color]">
    <SLink v-if="_value" class="container" :href="link?.(value, record)">
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
}

.text {
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.25s;

  &.neutral { color: var(--c-text-1); }
  &.soft    { color: var(--c-text-2); }
  &.mute    { color: var(--c-text-3); }
  &.info    { color: var(--c-info); }
  &.warning { color: var(--c-warning); }
  &.danger  { color: var(--c-danger); }

  .STableCellText.link &       { color: var(--c-info); }
  .STableCellText.link:hover & { color: var(--c-info-dark); }

  .STableCellText.link &.neutral       { color: var(--c-text-1); }
  .STableCellText.link:hover &.neutral { color: var(--c-info); }
  .STableCellText.link &.soft          { color: var(--c-text-2); }
  .STableCellText.link:hover &.soft    { color: var(--c-info); }
  .STableCellText.link &.mute          { color: var(--c-text-3); }
  .STableCellText.link:hover &.mute    { color: var(--c-info); }
  .STableCellText.link &.info          { color: var(--c-info); }
  .STableCellText.link:hover &.info    { color: var(--c-info-dark); }
  .STableCellText.link &.warning       { color: var(--c-warning); }
  .STableCellText.link:hover &.warning { color: var(--c-warning-darker); }
  .STableCellText.link &.danger        { color: var(--c-danger); }
  .STableCellText.link:hover &.danger  { color: var(--c-danger-dark); }
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

  .STableCellText.link &       { color: var(--c-info); }
  .STableCellText.link:hover & { color: var(--c-info-dark); }

  .STableCellText.link &.neutral       { color: var(--c-text-1); }
  .STableCellText.link:hover &.neutral { color: var(--c-info); }
  .STableCellText.link &.soft          { color: var(--c-text-2); }
  .STableCellText.link:hover &.soft    { color: var(--c-info); }
  .STableCellText.link &.mute          { color: var(--c-text-3); }
  .STableCellText.link:hover &.mute    { color: var(--c-info); }
  .STableCellText.link &.info          { color: var(--c-info); }
  .STableCellText.link:hover &.info    { color: var(--c-info-dark); }
  .STableCellText.link &.warning       { color: var(--c-warning); }
  .STableCellText.link:hover &.warning { color: var(--c-warning-dark); }
  .STableCellText.link &.danger        { color: var(--c-danger); }
  .STableCellText.link:hover &.danger  { color: var(--c-danger-dark); }
}

.svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}
</style>
