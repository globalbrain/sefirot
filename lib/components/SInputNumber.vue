<script setup lang="ts">
import { type IconifyIcon } from '@iconify/vue/dist/offline'
import { type DefineComponent } from 'vue'
import { computed } from 'vue'
import { type Validatable } from '../composables/Validation'
import { isNullish, isString } from '../support/Utils'
import SInputText from './SInputText.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Align = 'left' | 'center' | 'right'
export type CheckColor = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'
export type TextColor = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  info?: string
  note?: string
  help?: string
  placeholder?: string
  unitBefore?: any
  unitAfter?: any
  checkIcon?: IconifyIcon | DefineComponent
  checkText?: string
  checkColor?: CheckColor
  textColor?: TextColor | ((value: number | null) => TextColor)
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
  return (props.modelValue !== undefined)
    ? props.modelValue
    : props.value !== undefined ? props.value : null
})

const _textColor = computed(() => {
  if (!props.textColor) {
    return 'neutral'
  }

  if (isString(props.textColor)) {
    return props.textColor
  }

  return props.textColor(_value.value)
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

  return (!props.separator || valueWithSeparator.value === null)
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
    :unit-before="unitBefore"
    :unit-after="unitAfter"
    :check-icon="checkIcon"
    :check-text="checkText"
    :check-color="checkColor"
    :text-color="_textColor"
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
