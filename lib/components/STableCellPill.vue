<script setup lang="ts">
import { computed } from 'vue'

export type Color = 'info' | 'success' | 'warning' | 'danger' | 'mute'

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
  <div class="STableCellPill" :class="[_color ?? 'mute']">
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

  .STableCellPill.info & {
    border-color: var(--c-info);
    color: var(--c-info);
    background-color: var(--c-info-bg);
  }

  .STableCellPill.success & {
    border-color: var(--c-success);
    color: var(--c-success);
    background-color: var(--c-success-bg);
  }

  .STableCellPill.warning & {
    border-color: var(--c-warning);
    color: var(--c-warning);
    background-color: var(--c-warning-bg);
  }

  .STableCellPill.danger & {
    border-color: var(--c-danger);
    color: var(--c-danger);
    background-color: var(--c-danger-bg);
  }

  .STableCellPill.mute & {
    border-color: var(--c-divider);
    color: var(--c-text-2);
    background-color: var(--c-bg-lift-2);
  }
}
</style>
