<template>
  <SInputText
    class="SInputNumber"
    :name="name"
    :size="size"
    type="number"
    :label="label"
    :note="note"
    :help="help"
    :placeholder="placeholder"
    :disabled="disabled"
    :error-message="errorMessage"
    :model-value="modelValue"
    :validation="validation"
    @update:model-value="emitUpdate"
  />
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { isNullish } from '../support/Utils'
import { Validation, Validatable } from '../composables/Validation'
import SInputText from './SInputText.vue'

type Size = 'mini' | 'small' | 'medium'

defineProps({
  size: { type: String as PropType<Size>, default: 'small' },
  name: { type: String, default: null },
  label: { type: String, default: null },
  note: { type: String, default: null },
  help: { type: String, default: null },
  placeholder: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  errorMessage: { type: Boolean, default: true },
  modelValue: { type: Number as PropType<number | null>, default: null },
  validation: { type: Object as PropType<Validatable>, default: null }
})

const emit = defineEmits(['update:modelValue'])

function emitUpdate(value: string | null): void {
  emit('update:modelValue', value ? Number(value): null)
}
</script>
