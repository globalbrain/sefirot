<script
  setup
  lang="ts"
  generic="
    ValueType extends string | number | boolean = string | number | boolean,
    Nullable extends boolean = false
  "
>
import { type Component, computed } from 'vue'
import { type Validatable } from '../composables/Validation'
import SInputBase, { type Color, type Size } from './SInputBase.vue'
import SInputRadio from './SInputRadio.vue'

export type { Size, Color }

export interface Option<
  ValueType extends string | number | boolean = string | number | boolean
> {
  label: string
  value: ValueType
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
  options: Option<ValueType>[]
  nullable?: Nullable
  disabled?: boolean
  value?: ValueType | null
  modelValue?: ValueType | null
  validation?: Validatable
  hideError?: boolean
}>(), {
  value: undefined,
  modelValue: undefined
})

const emit = defineEmits<{
  'update:model-value': [value: ValueType | NullValue]
  'change': [value: ValueType | NullValue]
}>()

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined ? props.value : null
})

function isChecked(value: ValueType) {
  return value === _value.value
}

function onUpdate(value: ValueType) {
  if (value !== _value.value) {
    emit('update:model-value', value)
    return
  }

  if (props.nullable) {
    emit('update:model-value', null as NullValue)
  }
}

function onChange(value: ValueType) {
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
        <div v-for="(option, index) in options" :key="index" class="col">
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
