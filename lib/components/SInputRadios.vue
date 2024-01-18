<script
  setup
  lang="ts"
  generic="
    ValueType extends string | number | boolean = string | number | boolean,
    Nullable extends boolean = false
  "
>
import { type IconifyIcon } from '@iconify/vue/dist/offline'
import { type DefineComponent, computed } from 'vue'
import { type Validatable } from '../composables/V'
import SInputBase from './SInputBase.vue'
import SInputRadio from './SInputRadio.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

type VT = Nullable extends true ? ValueType : ValueType
type VN = Nullable extends true ? ValueType | null : ValueType
type N = Nullable extends true ? null : never

interface Option {
  label: string
  value: VT
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
  nullable?: Nullable
  disabled?: boolean
  value?: VT | null
  modelValue?: VT | null
  validation?: Validatable
  hideError?: boolean
}>(), {
  value: undefined,
  modelValue: undefined
})

const emit = defineEmits<{
  (e: 'update:model-value', value: VN): void
  (e: 'change', value: VN): void
}>()

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined ? props.value : null
})

function isChecked(value: VT) {
  return value === _value.value
}

function onUpdate(value: VT) {
  if (value !== _value.value) {
    emit('update:model-value', value)
    return
  }

  if (props.nullable) {
    emit('update:model-value', null as N)
  }
}

function onChange(value: VT) {
  if (value !== _value.value) {
    emit('change', value)
    return
  }

  if (props.nullable) {
    emit('change', null as N)
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
