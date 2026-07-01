<script setup lang="ts" generic="T = any">
import { type Component, computed } from 'vue'
import { type Validatable } from '../composables/Validation'
import { type Color, type Size } from '../support/InputBase'
import SInputBase from './SInputBase.vue'
import SInputCheckbox from './SInputCheckbox.vue'

export interface Option<T = any> {
  label: string
  value: T
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
  options: Option<T>[]
  nullable?: boolean
  disabled?: boolean
  value?: T[]
  modelValue?: T[]
  validation?: Validatable
  hideError?: boolean
}>(), {
  nullable: true
})

const emit = defineEmits<{
  'update:model-value': [value: T[]]
  'change': [value: T[]]
}>()

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined
      ? props.value
      : []
})

function isChecked(value: T): boolean {
  return _value.value.includes(value)
}

function onChange(value: T): void {
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
    :size
    :name
    :label
    :note
    :info
    :help
    :check-icon
    :check-text
    :check-color
    :validation
    :hide-error
  >
    <div class="container">
      <div class="row">
        <div v-for="option in options" :key="String(option.value)" class="col">
          <SInputCheckbox
            size="sm"
            :text="option.label"
            :disabled="option.disabled ?? disabled"
            :model-value="isChecked(option.value)"
            @update:model-value="onChange(option.value)"
          />
        </div>
      </div>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>
