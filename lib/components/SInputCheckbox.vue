<script setup lang="ts">
import { type Component, computed } from 'vue'
import { type Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'
import IconCheck from '~icons/ph/check-bold'
import IconMinus from '~icons/ph/minus-bold'

export type Size = 'mini' | 'small' | 'medium'
export type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const props = withDefaults(defineProps<{
  size?: Size
  label?: string
  info?: string
  note?: string
  help?: string
  checkIcon?: Component
  checkText?: string
  checkColor?: Color
  text?: string
  disabled?: boolean
  value?: boolean | 'indeterminate'
  modelValue?: boolean | 'indeterminate'
  validation?: Validatable
  hideError?: boolean
}>(), {
  value: undefined,
  modelValue: undefined
})

const emit = defineEmits<{
  (e: 'update:model-value', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const classes = computed(() => [
  props.size ?? 'small',
  { disabled: props.disabled }
])

const isIndeterminate = computed(() => {
  return props.modelValue === 'indeterminate' || props.value === 'indeterminate'
})

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue === true
    : props.value !== undefined ? props.value === true : false
})

function onClick() {
  if (!props.disabled) {
    emit('update:model-value', !_value.value)
    emit('change', !_value.value)
  }
}
</script>

<template>
  <SInputBase
    class="SInputCheckbox"
    :class="classes"
    :label="label"
    :note="note"
    :info="info"
    :help="help"
    :check-icon="checkIcon"
    :check-text="checkText"
    :check-color="checkColor"
    :validation="validation"
  >
    <div class="container">
      <div
        class="input"
        :class="{ on: _value || isIndeterminate }"
        role="button"
        @click="onClick"
        :aria-disabled="disabled"
      >
        <div class="box">
          <div class="check">
            <IconMinus v-if="isIndeterminate" class="check-icon" />
            <IconCheck v-else class="check-icon" />
          </div>
        </div>

        <p v-if="text" class="text">{{ text }}</p>
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
  align-items: center;
  height: 32px;
  cursor: pointer;

  &:hover {
    .box {
      border-color: var(--c-border-info-1);
    }
  }
}

.input.on {
  .box {
    border-color: var(--c-fg-info-1);
    background-color: var(--c-fg-info-1);
  }

  .check {
    opacity: 1;
    transform: scale(1);
  }
}

.box {
  position: relative;
  border: 1px solid var(--c-border-mute-1);
  border-radius: 4px;
  width: 16px;
  height: 16px;
  background-color: var(--input-bg-color);
  transition: border-color 0.25s, background-color 0.25s;
}

.check {
  position: absolute;
  top: 2px;
  left: 2px;
  display: flex;
  width: 16px;
  height: 16px;
  opacity: 0;
  transform: scale(0);
  transition: opacity .25s, transform .1s;
}

.check-icon {
  width: 10px;
  height: 10px;
  color: var(--c-white-1);
}

.text {
  margin: 0;
  padding-left: 10px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 400;
}

.SInputCheckbox.disabled {
  .input {
    cursor: not-allowed;
  }

  .input .box {
    border-color: var(--input-disabled-border-color);
    background-color: var(--input-disabled-bg-color);

    &:hover                     { border-color: var(--input-disabled-border-color); }
    &:focus:not(:focus-visible) { border-color: var(--input-disabled-border-color); }
  }

  .input.on .box {
    border-color: var(--c-border-info-1);
    background-color: var(--c-blue-8);
  }

  .check-icon {
    color: var(--c-white-a3);
  }
}
</style>
