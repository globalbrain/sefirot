<script setup lang="ts">
import { type Size } from './SInputBase.vue'

export type { Size }
export type Mode = 'default' | 'mute' | 'neutral' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
  size: Size
  label: string
  mode: Mode
  active: boolean
  disabled: boolean
}>()

const emit = defineEmits<{
  click: []
}>()

function onClick() {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<template>
  <button
    class="SInputSegmentsOption"
    :class="[size, mode, { active }, { disabled }]"
    @click="onClick"
  >
    <span class="label">
      {{ label }}
    </span>
  </button>
</template>

<style scoped>
.SInputSegmentsOption {
  position: relative;
  display: block;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  text-align: center;
  color: var(--c-text-2);
  white-space: nowrap;
  transition: border-color 0.25s, color 0.25s, background-color 0.25s;

  &:hover {
    color: var(--c-text-1);
  }

  &.disabled {
    color: var(--c-text-3);
    cursor: not-allowed;
  }
}

.SInputSegmentsOption.sm .label,
.SInputSegmentsOption.mini .label {
  padding: 0 12px;
  font-size: 12px;
  font-weight: 500;
}

.SInputSegmentsOption.md .label {
  padding: 0 12px;
  font-size: 14px;
  font-weight: 500;
}

.SInputSegmentsOption.small .label {
  padding: 0 12px;
  font-size: 14px;
  font-weight: 500;
}

.SInputSegmentsOption.medium .label {
  padding: 0 16px;
}

.SInputSegmentsOption.default.active {
  border-color: var(--button-fill-default-border-color);
  color: var(--button-fill-default-text-color);
  background-color: var(--button-fill-default-bg-color);
  box-shadow: var(--shadow-depth-1);
}

.SInputSegmentsOption.mute.active {
  border-color: var(--button-fill-mute-border-color);
  color: var(--button-fill-mute-text-color);
  background-color: var(--button-fill-mute-bg-color);
  box-shadow: var(--shadow-depth-1);
}

.SInputSegmentsOption.neutral.active {
  border-color: var(--button-fill-neutral-border-color);
  color: var(--button-fill-neutral-text-color);
  background-color: var(--button-fill-neutral-bg-color);
}

.SInputSegmentsOption.info.active {
  border-color: var(--button-fill-info-border-color);
  color: var(--button-fill-info-text-color);
  background-color: var(--button-fill-info-bg-color);
}

.SInputSegmentsOption.success.active {
  border-color: var(--button-fill-success-border-color);
  color: var(--button-fill-success-text-color);
  background-color: var(--button-fill-success-bg-color);
}

.SInputSegmentsOption.warning.active {
  border-color: var(--button-fill-warning-border-color);
  color: var(--button-fill-warning-text-color);
  background-color: var(--button-fill-warning-bg-color);
}

.SInputSegmentsOption.danger.active {
  border-color: var(--button-fill-danger-border-color);
  color: var(--button-fill-danger-text-color);
  background-color: var(--button-fill-danger-bg-color);
}

.label {
  display: inline-block;
}
</style>
