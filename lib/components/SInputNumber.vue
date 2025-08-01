<script setup lang="ts">
import { computed } from 'vue'
import { isString } from '../support/Utils'
import { type Props as BaseProps } from './SInputBase.vue'
import SInputText from './SInputText.vue'

export interface Props extends BaseProps {
  placeholder?: string
  unitBefore?: any
  unitAfter?: any
  textColor?: TextColor | ((value: number | null) => TextColor)
  separator?: boolean
  align?: Align
  disabled?: boolean
  tabindex?: -1 | 0 | number
  value?: number | null
  modelValue?: number | null
  displayValue?: string | null
}

export type Align = 'left' | 'center' | 'right'
export type TextColor = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:model-value': [value: number | null]
  'input': [value: number | null]
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
  if (_value.value == null) {
    return null
  }

  return _value.value >= Number.MAX_SAFE_INTEGER
    ? 'The number is too big'
    : _value.value.toLocaleString('en-US', { maximumSignificantDigits: 20 })
})

const displayValue = computed(() => {
  if (props.displayValue != null) {
    return props.displayValue
  }

  return (!props.separator || valueWithSeparator.value == null)
    ? null
    : valueWithSeparator.value
})

function emitUpdate(value: string | null) {
  const v = value == null ? null : Number(value)
  emit('update:model-value', v)
  emit('input', v)
}
</script>

<template>
  <SInputText
    class="SInputNumber"
    :size
    :name
    type="number"
    :label
    :note
    :info
    :help
    :placeholder
    :unit-before
    :unit-after
    :check-icon
    :check-text
    :check-color
    :text-color="_textColor"
    :align
    :disabled
    :tabindex
    :display-value
    :model-value="_value == null ? null : String(_value)"
    :validation
    :warning
    :hide-error
    :hide-warning
    @update:model-value="emitUpdate"
    @input="emitUpdate"
  >
    <template v-if="$slots.info" #info><slot name="info" /></template>
    <template v-if="$slots['addon-before']" #addon-before><slot name="addon-before" /></template>
    <template v-if="$slots['addon-after']" #addon-after><slot name="addon-after" /></template>
  </SInputText>
</template>
