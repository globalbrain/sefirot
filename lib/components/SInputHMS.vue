<script setup lang="ts">
import { IconifyIcon } from '@iconify/vue/dist/offline'
import { DefineComponent, ref } from 'vue'
import { Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'

export type Size = 'mini' | 'small' | 'medium'

export interface Value {
  hour: string | null
  minute: string | null
  second: string | null
}

export type ValueType = 'hour' | 'minute' | 'second'

const props = defineProps<{
  size?: Size
  label?: string
  info?: string
  note?: string
  help?: string
  noHour?: boolean
  noMinute?: boolean
  noSecond?: boolean
  disabled?: boolean
  hideError?: boolean
  modelValue: Value
  validation?: Validatable
  checkIcon?: IconifyIcon | DefineComponent
  checkText?: string
  checkColor?: Color
}>()

type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const emit = defineEmits<{
  (e: 'update:modelValue', value: Value): void
}>()

const isFocused = ref(false)

const touched = {
  hour: false,
  minute: false,
  second: false
}

function onFocus() {
  isFocused.value = true
}

function blur() {
  isFocused.value = false
}

function updateHour(e: FocusEvent): void {
  update('hour', getValue((e.target as HTMLInputElement).value))
}

function updateMinute(e: FocusEvent): void {
  update('minute', getValue((e.target as HTMLInputElement).value))
}

function updateSecond(e: FocusEvent): void {
  update('second', getValue((e.target as HTMLInputElement).value))
}

function update(type: ValueType, value: string | null) {
  emit('update:modelValue', {
    ...props.modelValue,
    [type]: value !== null ? value.padStart(2, '0') : null
  })

  emitTouch(type)

  blur()
}

function getValue(value: string): string | null {
  if (value === '') {
    return null
  }

  const input = Number(value)

  return isNaN(input) ? null : String(input)
}

function emitTouch(type: ValueType): void {
  if (!props.validation || props.validation.$dirty) {
    return
  }

  touched[type] = true

  if (createRequiredTouched().every((v) => v)) {
    props.validation.$touch()
  }
}

function createRequiredTouched(): boolean[] {
  const requiredTouched = [] as boolean[]

  for (const key in touched) {
    if (!(props as any)[`no${key.charAt(0).toUpperCase() + key.slice(1)}`]) {
      requiredTouched.push((touched as any)[key])
    }
  }

  return requiredTouched
}
</script>

<template>
  <SInputBase
    class="SInputHMS"
    :class="[size, { disabled }]"
    :label="label"
    :note="note"
    :info="info"
    :help="help"
    :hide-error="hideError"
    :validation="validation"
    :check-icon="checkIcon"
    :check-text="checkText"
    :check-color="checkColor"
  >
    <div class="container" :class="{ focus: isFocused }">
      <input
        v-if="!noHour"
        class="input hour"
        :value="modelValue.hour"
        placeholder="00"
        :disabled="disabled"
        @focus="onFocus"
        @blur="updateHour"
      >
      <div v-if="!noHour && !noMinute" class="separator" />
      <input
        v-if="!noMinute"
        class="input minute"
        :value="modelValue.minute"
        placeholder="00"
        :disabled="disabled"
        @focus="onFocus"
        @blur="updateMinute"
      >
      <div v-if="!noMinute && !noSecond" class="separator" />
      <input
        v-if="!noSecond"
        class="input second"
        :value="modelValue.second"
        placeholder="00"
        :disabled="disabled"
        @focus="onFocus"
        @blur="updateSecond"
      >
    </div>

    <template #before-help><slot name="before-help" /></template>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style lang="postcss" scoped>
.SInputHMS.mini {
  .container {
    padding: 0 8px;
  }

  .input {
    padding: 3px 0;
    text-align: center;
    font-size: 14px;
    width: 20px;
  }

  .separator {
    padding: 3px 0;
    line-height: 24px;
    font-size: 14px;
  }

  .separator::before {
    padding: 0 4px;
  }
}

.SInputHMS.small {
  .container {
    padding: 0 12px;
  }

  .input {
    flex-shrink: 0;
    padding: 8px 0 6px;
    text-align: center;
    font-size: 16px;
    width: 20px;
  }

  .separator {
    padding: 7px 0;
    line-height: 24px;
    font-size: 16px;
  }

  .separator::before {
    padding: 0 6px;
  }
}

.SInputHMS.medium {
  .container {
    padding: 0 12px;
  }

  .input {
    padding: 12px 0 10px;
    text-align: center;
    font-size: 16px;
    width: 24px;
  }

  .separator {
    padding: 11px 0;
    line-height: 24px;
    font-size: 16px;
  }

  .separator::before {
    padding: 0 6px;
  }
}

.SInputHMS.disabled {
  .container,
  .input {
    cursor: not-allowed;
  }

  .container {
    border-color: var(--input-border);
    background-color: var(--input-disabled-bg);
  }
}

.SInputHMS.has-error {
  .container {
    border-color: var(--c-danger);
  }
}

.container {
  display: inline-flex;
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  background-color: var(--c-bg);
  transition: border-color 0.25s;

  &:hover {
    border-color: var(--c-black);
  }

  &.focus,
  &:hover.focus {
    border-color: var(--c-info);
  }

  .dark &:hover {
    border-color: var(--c-gray);
  }

  .dark &.focus,
  .dark &:hover.focus {
    border-color: var(--c-info);
  }
}

.input {
  background-color: transparent;

  &::placeholder {
    font-weight: 500;
    color: var(--c-text-3);
  }
}

.separator::before {
  color: var(--c-text-3);
  content: ":";
}
</style>
