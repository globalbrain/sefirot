<template>
  <SInputBase
    class="SInputHMS"
    :class="[size, { disabled }]"
    :label="label"
    :note="note"
    :help="help"
    :error-message="errorMessage"
    :validation="validation"
  >
    <div class="container">
      <input
        v-if="hour"
        class="input hour"
        :value="modelValue?.hour ?? null"
        placeholder="00"
        :disabled="disabled"
        @blur="updateHour"
      >
      <div v-if="hour && minute" class="separator" />
      <input
        v-if="minute"
        class="input minute"
        :value="modelValue?.minute ?? null"
        placeholder="00"
        :disabled="disabled"
        @blur="updateMinute"
      >
      <div v-if="minute && second" class="separator" />
      <input
        v-if="second"
        class="input second"
        :value="modelValue?.second ?? null"
        placeholder="00"
        :disabled="disabled"
        @blur="updateSecond"
      >
    </div>

    <template #before-help>
      <slot name="before-help" />
    </template>
  </SInputBase>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { SyntheticInputEvent } from '../types/Utils'
import { Validation } from '../composables/Validation'
import SInputBase from './SInputBase.vue'

type Size = 'mini' | 'small' | 'medium'

interface Value {
  hour?: string
  minute?: string
  second?: string
}

type ValueType = 'hour' | 'minute' | 'second'

export interface Fields {
  hour?: boolean
  minute?: boolean
  second?: boolean
}

const props = defineProps({
  size: { type: String as PropType<Size>, default: 'small' },
  label: { type: String, default: null },
  note: { type: String, default: null },
  help: { type: String, default: null },
  placeholder: { type: String, default: null },
  hour: { type: Boolean, default: true },
  minute: { type: Boolean, default: true },
  second: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  errorMessage: { type: Boolean, default: true },
  modelValue: { type: Object as PropType<Value>, default: null },
  validation: { type: Object as PropType<Validation>, default: null }
})

const emit = defineEmits(['update:modelValue'])

const touched = {
  hour: false,
  minute: false,
  second: false
}

function updateHour(e: FocusEvent): void {
  const value = getValue((e.target as HTMLInputElement).value)

  update('hour', value)
}

function updateMinute(e: FocusEvent): void {
  const value = getValue((e.target as HTMLInputElement).value)

  update('minute', value ? value.padStart(2, '0') : undefined)
}

function updateSecond(e: FocusEvent): void {
  const value = getValue((e.target as HTMLInputElement).value)

  update('second', value ? value.padStart(2, '0') : undefined)
}

function update(type: ValueType, value?: string): void {
  const data = { ...props.modelValue } as Value

  setValue(data, type, value)

  data.hour === undefined && data.minute === undefined && data.second === undefined
    ? emit('update:modelValue', null)
    : emit('update:modelValue', data)

  emitTouch(type)
}

function getValue(value: string): string | undefined {
  if (value === '') {
    return undefined
  }

  const input = Number(value)

  return isNaN(input) ? undefined : String(input)
}

function setValue(data: Value, type: ValueType, value?: string): void {
  if (value === undefined) {
    delete data[type]
    return
  }

  data[type] = value
}

function emitTouch(type: ValueType): void {
  if (!props.validation || props.validation.$isDirty) {
    return
  }

  touched[type] = true

  if (createRequiredTouched().every(v => v)) {
    props.validation.$touch()
  }
}

function createRequiredTouched(): boolean[] {
  const requiredTouched = [] as boolean[]

  for (const key in touched) {
    if ((props as any)[key]) {
      requiredTouched.push((touched as any)[key])
    }
  }

  return requiredTouched
}
</script>

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
  border: 1px solid var(--input-border);
  border-radius: 4px;
  transition: border-color .25s;

  &:hover {
    border-color: var(--input-focus-border);
  }
}

.input {
  margin: 0;
  background-color: transparent;
}

.separator::before {
  color: var(--c-text-2);
  content: ":";
}
</style>
