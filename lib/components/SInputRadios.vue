<script setup lang="ts">
import { Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'
import SInputRadio from './SInputRadio.vue'

export type Size = 'mini' | 'small' | 'medium'

export interface Option {
  label: string
  value: string | number | boolean
}

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  note?: string
  help?: string
  nullable?: boolean
  options: Option[]
  hideError?: boolean
  modelValue: string | number | boolean | null
  validation?: Validatable
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean | null): void
}>()

function isChecked(value: string | number | boolean) {
  return value === props.modelValue
}

function handleChange(value: string | number | boolean) {
  if (value !== props.modelValue) {
    emit('update:modelValue', value)

    return
  }

  if (props.nullable) {
    emit('update:modelValue', null)
  }
}
</script>

<template>
  <SInputBase
    class="SInputRadios"
    :class="[size ?? 'small']"
    :label="label"
    :note="note"
    :help="help"
    :hide-error="hideError"
    :validation="validation"
  >
    <div class="container">
      <div class="row">
        <div v-for="(option, index) in options" :key="index" class="col">
          <SInputRadio
            :text="option.label"
            :model-value="isChecked(option.value)"
            @update:model-value="handleChange(option.value)"
          />
        </div>
      </div>
    </div>
  </SInputBase>
</template>
