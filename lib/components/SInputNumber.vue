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
    :error-message="errorMessage"
    :display-value="displayValue"
    :model-value="String(modelValue)"
    :validation="validation"
    @update:model-value="emitUpdate"
  >
    <template #before-help>
      <p v-if="helpFormat" class="help-text">
        {{ valueWithSeparator }}
      </p>
    </template>
  </SInputText>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { Validatable } from '../composables/Validation'
import { isNullish } from '../support/Utils'
import SInputText, { Size, Align } from './SInputText.vue'

const props = defineProps({
  size: { type: String as PropType<Size>, default: 'small' },
  name: { type: String, default: null },
  label: { type: String, default: null },
  note: { type: String, default: null },
  help: { type: String, default: null },
  placeholder: { type: String, default: null },
  align: { type: String as PropType<Align>, default: null },
  separator: { type: Boolean, default: false },
  helpFormat: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  errorMessage: { type: Boolean, default: true },
  modelValue: { type: Number as PropType<number | null>, default: null },
  validation: { type: Object as PropType<Validatable>, default: null }
})

const emit = defineEmits(['update:modelValue'])

const valueWithSeparator = computed(() => {
  if (isNullish(props.modelValue)) {
    return '0'
  }

  return props.modelValue >= 100000000000000000000
    ? 'The number is too big'
    : props.modelValue.toLocaleString('en-US', { maximumSignificantDigits: 20 })
})

const displayValue = computed(() => {
  if (!props.separator || valueWithSeparator.value === '0') {
    return null
  }

  return valueWithSeparator.value
})

function emitUpdate(value: string | null): void {
  emit('update:modelValue', value ? Number(value) : null)
}
</script>
