<script setup lang="ts" generic="T extends string | number | boolean">
import { type Size } from './SInputBase.vue'

export type { Size }
export type Mode = 'default' | 'mute' | 'neutral' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
  size: Size
  label: string
  value: T
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

<style scoped lang="postcss">
.SInputSegmentsOption {
  position: relative;
  display: block;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 3px;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 14px;
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

  .SInputSegmentsOption + &::before {
    position: absolute;
    left: -1px;
    display: block;
    width: 1px;
    height: 16px;
    border-radius: 4px;
    background-color: var(--c-divider);
    content: "";
    transition: opacity 0.25s;
  }

  .SInputSegmentsOption.active + &::before,
  &.active::before {
    opacity: 0;
  }
}

.SInputSegmentsOption.sm,
.SInputSegmentsOption.mini {
  .SInputSegmentsOption + &::before {
    top: 4px;
  }

  .label {
    padding: 0 12px;
  }
}

.SInputSegmentsOption.md {
  .SInputSegmentsOption + &::before {
    top: 6px;
  }

  .label {
    padding: 0 12px;
  }
}

.SInputSegmentsOption.small {
  .SInputSegmentsOption + &::before {
    top: 7px;
  }

  .label {
    padding: 0 12px;
  }
}

.SInputSegmentsOption.medium {
  .SInputSegmentsOption + &::before {
    top: 10px;
  }

  .label {
    padding: 0 16px;
  }
}

.SInputSegmentsOption.default.active {
  border-color: var(--button-fill-default-border-color);
  color: var(--button-fill-default-text-color);
  background-color: var(--button-fill-default-bg-color);
}

.SInputSegmentsOption.mute.active {
  border-color: var(--button-fill-mute-border-color);
  color: var(--button-fill-mute-text-color);
  background-color: var(--button-fill-mute-bg-color);
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
