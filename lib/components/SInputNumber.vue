<script setup lang="ts">
import { IconifyIcon } from '@iconify/vue/dist/offline'
import { DefineComponent, computed } from 'vue'
import { Validatable } from '../composables/Validation'
import { isNullish } from '../support/Utils'
import SInputText from './SInputText.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Align = 'left' | 'center' | 'right'
export type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  info?: string
  note?: string
  help?: string
  placeholder?: string
  checkIcon?: IconifyIcon | DefineComponent
  checkText?: string
  checkColor?: Color
  align?: Align
  separator?: boolean
  disabled?: boolean
  value?: number | null
  modelValue?: number | null
  displayValue?: string | null
  hideError?: boolean
  validation?: Validatable
}>()

const emit = defineEmits<{
  (e: 'update:model-value', value: number | null): void
  (e: 'input', value: number | null): void
}>()

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined ? props.value : null
})

const valueWithSeparator = computed(() => {
  if (isNullish(_value.value)) {
    return null
  }

  return _value.value >= 100000000000000000000
    ? 'The number is too big'
    : _value.value.toLocaleString('en-US', { maximumSignificantDigits: 20 })
})

const displayValue = computed(() => {
  if (!isNullish(props.displayValue)) {
    return props.displayValue
  }

  return !props.separator || valueWithSeparator.value === null
    ? null
    : valueWithSeparator.value
})

function emitUpdate(value: string | null) {
  const v = isNullish(value) ? null : Number(value)
  emit('update:model-value', v)
  emit('input', v)
}
</script>

<template>
  <SInputText
    class="SInputNumber"
    :name="name"
    :size="size"
    type="number"
    :label="label"
    :note="note"
    :info="info"
    :help="help"
    :placeholder="placeholder"
    :check-icon="checkIcon"
    :check-text="checkText"
    :check-color="checkColor"
    :align="align"
    :disabled="disabled"
    :hide-error="hideError"
    :display-value="displayValue"
    :model-value="_value === null ? null : String(_value)"
    :validation="validation"
    @update:model-value="emitUpdate"
    @input="emitUpdate"
  >
    <template v-if="$slots.info" #info><slot name="info" /></template>
    <template v-if="$slots['addon-before']" #addon-before><slot name="addon-before" /></template>
    <template v-if="$slots['addon-after']" #addon-after><slot name="addon-after" /></template>
  </SInputText>
</template>
