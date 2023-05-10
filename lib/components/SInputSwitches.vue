<script setup lang="ts">
import { type IconifyIcon } from '@iconify/vue/dist/offline'
import { type DefineComponent } from 'vue'
import { computed } from 'vue'
import { type Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'
import SInputSwitch from './SInputSwitch.vue'

export type Size = 'mini' | 'small' | 'medium'
export type CheckColor = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

export interface Option {
  label: string
  value: string | number | boolean
}

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  info?: string
  note?: string
  help?: string
  checkIcon?: IconifyIcon | DefineComponent
  checkText?: string
  checkColor?: CheckColor
  options: Option[]
  disabled?: boolean
  modelValue: (string | number | boolean)[]
  hideError?: boolean
  validation?: Validatable
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: (string | number | boolean)[]): void
}>()

const classes = computed(() => [
  props.size ?? 'small'
])

function isChecked(value: string | number | boolean): boolean {
  return props.modelValue.includes(value)
}

function handleChange(value: string | number | boolean): void {
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
    :name="name"
    :label="label"
    :note="note"
    :info="info"
    :help="help"
    :check-icon="checkIcon"
    :check-text="checkText"
    :check-color="checkColor"
    :hide-error="hideError"
  >
    <div class="container">
      <div class="row">
        <div v-for="(option, index) in options" :key="index" class="col">
          <SInputSwitch
            :size="size"
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
