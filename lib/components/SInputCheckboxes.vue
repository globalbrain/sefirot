<script setup lang="ts">
import { type Component, computed } from 'vue'
import { type Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'
import SInputCheckbox from './SInputCheckbox.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

export type Value = any

export interface Option {
  label: string
  value: Value
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  size?: Size
  name?: string
  label?: string
  info?: string
  note?: string
  help?: string
  checkIcon?: Component
  checkText?: string
  checkColor?: Color
  options: Option[]
  nullable?: boolean
  disabled?: boolean
  value?: Value[]
  modelValue?: Value[]
  validation?: Validatable
  hideError?: boolean
}>(), {
  nullable: true
})

const emit = defineEmits<{
  'update:model-value': [value: Value[]]
  'change': [value: Value[]]
}>()

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined ? props.value : []
})

function isChecked(value: Value): boolean {
  return _value.value.includes(value)
}

function handleChange(value: Value): void {
  const distinct = _value.value
    .filter((v) => v !== value)
    .concat(_value.value.includes(value) ? [] : [value])

  if (distinct.length === 0 && !props.nullable) {
    return
  }

  emit('update:model-value', distinct)
  emit('change', distinct)
}
</script>

<template>
  <SInputBase
    class="SInputCheckboxes"
    :class="[size ?? 'small']"
    :name
    :label
    :note
    :info
    :help
    :check-icon
    :check-text
    :check-color
  >
    <div class="container">
      <div class="row">
        <div v-for="option in options" :key="String(option.value)" class="col">
          <SInputCheckbox
            :text="option.label"
            :disabled="option.disabled ?? disabled"
            :model-value="isChecked(option.value)"
            @update:model-value="handleChange(option.value)"
          />
        </div>
      </div>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>
