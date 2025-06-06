<script setup lang="ts">
import { type Component, computed } from 'vue'
import { type Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'
import SInputSwitch from './SInputSwitch.vue'

export type Size = 'mini' | 'small' | 'medium'
export type CheckColor = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

export interface Option {
  label: string
  value: any
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
  checkColor?: CheckColor
  options: Option[]
  disabled?: boolean
  modelValue: any[]
  hideError?: boolean
  validation?: Validatable
}>()

const emit = defineEmits<{
  'update:modelValue': [value: any[]]
}>()

const classes = computed(() => [
  props.size ?? 'small'
])

function isChecked(value: any): boolean {
  return props.modelValue.includes(value)
}

function handleChange(value: any): void {
  const difference = props.modelValue
    .filter((v) => v !== value)
    .concat(props.modelValue.includes(value) ? [] : [value])

  emit('update:modelValue', difference)
}
</script>

<template>
  <SInputBase
    class="SInputSwitches"
    :class="classes"
    :name
    :label
    :note
    :info
    :help
    :check-icon
    :check-text
    :check-color
    :hide-error
  >
    <div class="container">
      <div class="row">
        <div v-for="(option, index) in options" :key="index" class="col">
          <SInputSwitch
            :size
            :text="option.label"
            :model-value="isChecked(option.value)"
            @update:model-value="handleChange(option.value)"
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
