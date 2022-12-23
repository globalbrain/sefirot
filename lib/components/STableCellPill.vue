<script setup lang="ts">
import { computed } from 'vue'

export type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
  value?: any
  record: any
  getter?: string | ((value: any) => string)
  color?: Color | ((value: any) => Color)
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
  if (props.color === undefined) {
    return null
  }

  return typeof props.color === 'string'
    ? props.color
    : props.color(props.value)
})
</script>

<template>
  <div class="STableCellPill" :class="[_color ?? 'neutral']">
    <div v-if="_value" class="value">{{ _value }}</div>
  </div>
</template>

<style scoped lang="postcss">
.STableCellPill {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  min-height: 40px;
}

.value {
  display: inline-block;
  border: 1px solid transparent;
  border-radius: 14px;
  padding: 0 8px;
  line-height: 18px;
  font-size: 12px;
  font-weight: 500;

  .STableCellPill.neutral & {
    border-color: var(--pill-neutral-border-color);
    color: var(--pill-neutral-color);
    background-color: var(--pill-neutral-bg-color);
  }

  .STableCellPill.mute & {
    border-color: var(--pill-mute-border-color);
    color: var(--pill-mute-color);
    background-color: var(--pill-mute-bg-color);
  }

  .STableCellPill.info & {
    border-color: var(--pill-info-border-color);
    color: var(--pill-info-color);
    background-color: var(--pill-info-bg-color);
  }

  .STableCellPill.success & {
    border-color: var(--pill-success-border-color);
    color: var(--pill-success-color);
    background-color: var(--pill-success-bg-color);
  }

  .STableCellPill.warning & {
    border-color: var(--pill-warning-border-color);
    color: var(--pill-warning-color);
    background-color: var(--pill-warning-bg-color);
  }

  .STableCellPill.danger & {
    border-color: var(--pill-danger-border-color);
    color: var(--pill-danger-color);
    background-color: var(--pill-danger-bg-color);
  }
}
</style>
