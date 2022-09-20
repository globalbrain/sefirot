<script setup lang="ts">
import { computed } from 'vue'
import SLink from './SLink.vue'

const props = defineProps<{
  value?: any
  record: any
  icon?: any
  getter?: string | ((value: any) => string)
  color?: 'neutral' | 'soft' | 'mute'
  iconColor?: 'neutral' | 'soft' | 'mute'
  link?(value: any, record: any): string
  onClick?(value: any, record: any): void
}>()

const _value = computed(() => {
  if (props.getter === undefined) {
    return props.value
  }

  return typeof props.getter === 'string'
    ? props.getter
    : props.getter(props.value)
})

function handleClick() {
  props.onClick && props.onClick(props.value, props.record)
}
</script>

<template>
  <div class="STableCellText" :class="[{ link: link || onClick }, color ?? 'neutral']">
    <SLink v-if="_value" class="container" :href="link?.(value, record)">
      <div v-if="icon" class="icon" :class="[iconColor ?? color ?? 'neutral']">
        <component class="svg" :is="icon" />
      </div>
      <div class="text" :class="[color ?? 'neutral']" :role="onClick && 'button'" @click="handleClick">
        {{ _value }}
      </div>
    </SLink>
  </div>
</template>

<style scoped lang="postcss">
.STableCellText {
  padding: 8px 16px;
  min-height: 40px;
}

.container {
  display: flex;
  gap: 4px;
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

  .STableCellText.link &       { color: var(--c-info); }
  .STableCellText.link:hover & { color: var(--c-info-dark); }

  .STableCellText.link &.neutral       { color: var(--c-text-1); }
  .STableCellText.link:hover &.neutral { color: var(--c-info); }
  .STableCellText.link &.soft          { color: var(--c-text-2); }
  .STableCellText.link:hover &.soft    { color: var(--c-info); }
  .STableCellText.link &.mute          { color: var(--c-text-3); }
  .STableCellText.link:hover &.mute    { color: var(--c-info); }
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
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
}

.svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}
</style>
