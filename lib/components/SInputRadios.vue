<script setup lang="ts">
import { computed } from 'vue'
import { Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'
import SInputRadio from './SInputRadio.vue'

export type Size = 'mini' | 'small' | 'medium'

export interface Option {
  label: string
  value: string | number | boolean
}

const props = withDefaults(defineProps<{
  size?: Size
  name?: string
  label?: string
  note?: string
  help?: string
  options: Option[]
  nullable?: boolean
  value?: string | number | boolean | null
  modelValue?: string | number | boolean | null
  validation?: Validatable
  hideError?: boolean
}>(), {
  value: undefined,
  modelValue: undefined
})

const emit = defineEmits<{
  (e: 'update:model-value', value: string | number | boolean | null): void
  (e: 'change', value: string | number | boolean | null): void
}>()

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined ? props.value : null
})

function isChecked(value: string | number | boolean) {
  return value === _value.value
}

function onUpdate(value: string | number | boolean) {
  if (value !== _value.value) {
    emit('update:model-value', value)
    return
  }

  if (props.nullable) {
    emit('update:model-value', null)
  }
}

function onChange(value: string | number | boolean) {
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
            @update:model-value="onUpdate(option.value)"
            @change="onChange(option.value)"
          />
        </div>
      </div>
    </div>
  </SInputBase>
</template>
