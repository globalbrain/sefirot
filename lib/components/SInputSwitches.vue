<script setup lang="ts" generic="T = any">
import { type Component, computed } from 'vue'
import { type Validatable } from '../composables/Validation'
import { type Color, type Size } from '../support/InputBase'
import SInputBase from './SInputBase.vue'
import SInputSwitch from './SInputSwitch.vue'

export interface Option<T = any> {
  label: string
  value: T
}

const props = defineProps<{
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
  disabled?: boolean
  modelValue: T[]
  hideError?: boolean
  validation?: Validatable
}>()

const emit = defineEmits<{
  'update:model-value': [value: T[]]
}>()

const classes = computed(() => [
  props.size ?? 'small'
])

function isChecked(value: T): boolean {
  return props.modelValue.includes(value)
}

function onChange(value: T): void {
  const difference = props.modelValue
    .filter((v) => v !== value)
    .concat(props.modelValue.includes(value) ? [] : [value])

  emit('update:model-value', difference)
}
</script>

<template>
  <SInputBase
    class="SInputSwitches"
    :class="classes"
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
          <SInputSwitch
            size="sm"
            :text="option.label"
            :disabled
            :model-value="isChecked(option.value)"
            @update:model-value="onChange(option.value)"
          />
        </div>
      </div>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style lang="postcss" scoped>
.container {
  display: flex;
}

.row {
  width: 100%;
}
</style>
