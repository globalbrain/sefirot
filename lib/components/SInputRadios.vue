<script setup lang="ts">
import { type IconifyIcon } from '@iconify/vue/dist/offline'
import { type DefineComponent, computed } from 'vue'
import { type Validatable } from '../composables/V'
import SInputBase from './SInputBase.vue'
import SInputRadio from './SInputRadio.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

export interface Option {
  label: string
  value: any
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  size?: Size
  name?: string
  label?: string
  info?: string
  note?: string
  help?: string
  checkIcon?: IconifyIcon | DefineComponent
  checkText?: string
  checkColor?: Color
  options: Option[]
  nullable?: boolean
  disabled?: boolean
  value?: any
  modelValue?: any
  validation?: Validatable
  hideError?: boolean
}>(), {
  value: undefined,
  modelValue: undefined
})

const emit = defineEmits<{
  (e: 'update:model-value', value: any): void
  (e: 'change', value: any): void
}>()

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined ? props.value : null
})

function isChecked(value: any) {
  return value === _value.value
}

function onUpdate(value: any) {
  if (value !== _value.value) {
    emit('update:model-value', value)
    return
  }

  if (props.nullable) {
    emit('update:model-value', null)
  }
}

function onChange(value: any) {
  if (value !== _value.value) {
    emit('change', value)
    return
  }

  if (props.nullable) {
    emit('change', null)
  }
}
</script>

<template>
  <SInputBase
    class="SInputRadios"
    :class="[size ?? 'small']"
    :label="label"
    :note="note"
    :info="info"
    :help="help"
    :check-icon="checkIcon"
    :check-text="checkText"
    :check-color="checkColor"
    :hide-error="hideError"
    :validation="validation"
  >
    <div class="container">
      <div class="row">
        <div v-for="(option, index) in options" :key="index" class="col">
          <SInputRadio
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
