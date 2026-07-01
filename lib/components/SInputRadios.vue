<script setup lang="ts" generic="T extends string | number | boolean = string | number | boolean, Nullable extends boolean = false">
import { type Component, computed } from 'vue'
import { type Validatable } from '../composables/Validation'
import { type Color, type Size } from '../support/InputBase'
import SInputBase from './SInputBase.vue'
import SInputRadio from './SInputRadio.vue'

export interface Option<T extends string | number | boolean = string | number | boolean> {
  label: string
  value: T
  disabled?: boolean
}

type NullValue = Nullable extends true ? null : never

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
  nullable?: boolean & Nullable
  disabled?: boolean
  value?: T | null
  modelValue?: T | null
  validation?: Validatable
  hideError?: boolean
}>(), {
  value: undefined,
  modelValue: undefined
})

const emit = defineEmits<{
  'update:model-value': [value: T | NullValue]
  'change': [value: T | NullValue]
}>()

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined
      ? props.value
      : null
})

function isChecked(value: T) {
  return value === _value.value
}

function onUpdate(value: T) {
  if (value !== _value.value) {
    emit('update:model-value', value)
    return
  }

  if (props.nullable) {
    emit('update:model-value', null as NullValue)
  }
}

function onChange(value: T) {
  if (value !== _value.value) {
    emit('change', value)
    return
  }

  if (props.nullable) {
    emit('change', null as NullValue)
  }
}
</script>

<template>
  <SInputBase
    class="SInputRadios"
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
    :hide-error
    :validation
  >
    <div class="container">
      <div class="row">
        <div v-for="(option, i) in options" :key="i" class="col">
          <SInputRadio
            size="sm"
            :text="option.label"
            :disabled="option.disabled ?? disabled"
            :model-value="isChecked(option.value)"
            @update:model-value="onUpdate(option.value)"
            @change="onChange(option.value)"
          />
        </div>
      </div>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>
