<script setup lang="ts">
import { computed } from 'vue'
import { Validatable } from '../composables/Validation'
import { isNullish } from '../support/Utils'
import SInputText from './SInputText.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Align = 'left' | 'center' | 'right'

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  note?: string
  help?: string
  placeholder?: string
  align?: Align
  separator?: boolean
  disabled?: boolean
  modelValue: number | null
  displayValue?: string | null
  hideError?: boolean
  validation?: Validatable
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
}>()

const valueWithSeparator = computed(() => {
  if (isNullish(props.modelValue)) {
    return null
  }

  return props.modelValue >= 100000000000000000000
    ? 'The number is too big'
    : props.modelValue.toLocaleString('en-US', { maximumSignificantDigits: 20 })
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
  emit('update:modelValue', isNullish(value) ? null : Number(value))
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
    :help="help"
    :align="align"
    :placeholder="placeholder"
    :disabled="disabled"
    :hide-error="hideError"
    :display-value="displayValue"
    :model-value="String(modelValue)"
    :validation="validation"
    @update:model-value="emitUpdate"
  />
</template>
