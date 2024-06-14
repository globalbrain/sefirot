<script setup lang="ts">
import { type Component, computed } from 'vue'
import { type Validatable } from '../composables/V'
import SInputBase from './SInputBase.vue'

export type Size = 'mini' | 'small' | 'medium'
export type ActiveColor = 'info' | 'success' | 'warning' | 'danger'
export type CheckColor = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const props = withDefaults(defineProps<{
  size?: Size
  name?: string
  label?: string
  info?: string
  note?: string
  text?: string
  color?: ActiveColor
  help?: string
  checkIcon?: Component
  checkText?: string
  checkColor?: CheckColor
  disabled?: boolean
  value?: boolean
  modelValue?: boolean
  hideError?: boolean
  validation?: Validatable
}>(), {
  value: undefined,
  modelValue: undefined
})

const emit = defineEmits<{
  (e: 'update:model-value', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined ? props.value : false
})

const classes = computed(() => [
  props.size ?? 'small',
  props.color ?? 'info',
  { disabled: props.disabled }
])

function emitChange(): void {
  if (!props.disabled) {
    emit('update:model-value', !_value.value)
    emit('change', !_value.value)
  }
}
</script>

<template>
  <SInputBase
    class="SInputSwitch"
    :class="classes"
    :name="name"
    :label="label"
    :note="note"
    :info="info"
    :check-icon="checkIcon"
    :check-text="checkText"
    :check-color="checkColor"
    :help="help"
    :hide-error="hideError"
  >
    <div class="container">
      <div class="input" :class="{ on: _value }" role="button" @click="emitChange">
        <p v-if="text" class="text">{{ text }}</p>
        <div class="box">
          <div class="toggle" />
        </div>
      </div>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style scoped lang="postcss">
.container {
  display: flex;
}

.input {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
}

.text {
  flex-grow: 1;
  margin: 0;
  padding-right: 16px;
}

.box {
  position: relative;
  flex-shrink: 0;
  border: 1px solid var(--input-border-color);
  background-color: var(--input-switch-bg-color);
  transition: border-color 0.25s, background-color 0.25s, box-shadow 0.25s;
}

.toggle {
  position: absolute;
  border-radius: 50%;
  background-color: var(--input-switch-toggle-color);
  transition: background-color 0.25s, transform 0.25s;
}

.SInputSwitch.mini {
  .input {
    height: 32px;
  }

  .text {
    line-height: 20px;
    font-size: 14px;
  }

  .box {
    border-radius: 9px;
    width: 32px;
    height: 18px;
  }

  .toggle {
    top: 1px;
    left: 1px;
    width: 14px;
    height: 14px;
  }

  .input.on .toggle {
    transform: translateX(14px);
  }
}

.SInputSwitch.small {
  .input {
    height: 32px;
  }

  .text {
    line-height: 20px;
    font-size: 14px;
  }

  .box {
    border-radius: 11px;
    width: 40px;
    height: 22px;
  }

  .toggle {
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
  }

  .input.on .toggle {
    transform: translateX(18px);
  }
}

.SInputSwitch.medium {
  .input {
    height: 32px;
  }

  .text {
    line-height: 20px;
    font-size: 14px;
  }

  .box {
    border-radius: 13px;
    width: 46px;
    height: 26px;
  }

  .toggle {
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
  }

  .input.on .toggle {
    transform: translateX(20px);
  }
}

.SInputSwitch.info {
  .box:hover {
    border-color: var(--c-border-info-1);
  }

  .input.on .box {
    border-color: var(--c-border-info-1);
    background-color: var(--c-bg-info-1);
  }
}

.SInputSwitch.success {
  .box:hover {
    border-color: var(--c-border-success-1);
  }

  .input.on .box {
    border-color: var(--c-border-success-1);
    background-color: var(--c-bg-success-1);
  }
}

.SInputSwitch.warning {
  .box:hover {
    border-color: var(--c-border-warning-1);
  }

  .input.on .box {
    border-color: var(--c-border-warning-1);
    background-color: var(--c-bg-warning-1);
  }
}

.SInputSwitch.danger {
  .box:hover {
    border-color: var(--c-border-danger-1);
  }

  .input.on .box {
    border-color: var(--c-border-danger-1);
    background-color: var(--c-bg-danger-1);
  }
}

.SInputSwitch.disabled {
  .input {
    cursor: not-allowed;
  }

  .box {
    background-color: var(--input-switch-disabled-bg-color);
  }

  .box:hover {
    border-color: var(--input-border-color);
  }

  .toggle {
    background-color: var(--input-switch-disabled-toggle-color);
  }

  .input.on .toggle {
    opacity: 0.5;
  }

  &.info {
    .input.on .box {
      border-color: var(--c-border-info-1);
      background-color: var(--c-blue-8);
    }
  }

  &.success {
    .input.on .box {
      border-color: var(--c-border-success-1);
      background-color: var(--c-green-8);
    }
  }

  &.warning {
    .input.on .box {
      border-color: var(--c-border-warning-1);
      background-color: var(--c-yellow-8);
    }
  }

  &.danger {
    .input.on .box {
      border-color: var(--c-border-danger-1);
      background-color: var(--c-red-8);
    }
  }
}

.input.on .box {
  border-color: var(--c-border-info-1);
  background-color: var(--c-bg-info-1);
}

.input.on .toggle {
  background-color: var(--c-white);
}
</style>
