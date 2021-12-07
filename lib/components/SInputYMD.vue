<template>
  <SInputBase
    class="SInputYMD"
    :class="[size, { disabled }]"
    :label="label"
    :note="note"
    :help="help"
    :error-message="errorMessage"
    :validation="validation"
  >
    <div class="container">
      <input
        v-if="year"
        class="input year"
        type="number"
        :value="modelValue?.year"
        placeholder="YYYY"
        :disabled="disabled"
        @blur="updateYear"
      >
      <div
        v-if="year && month"
        class="separator"
      />
      <input
        v-if="month"
        class="input month"
        type="number"
        :value="modelValue?.month"
        placeholder="M"
        :disabled="disabled"
        @blur="updateMonth"
      >
      <div
        v-if="month && date"
        class="separator"
      />
      <input
        v-if="date"
        class="input date"
        type="number"
        :value="modelValue?.date"
        placeholder="D"
        :disabled="disabled"
        @blur="updateDate"
      >
    </div>
  </SInputBase>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Validation } from '../composables/Validation'
import SInputBase from './SInputBase.vue'

type Size = 'mini' | 'small' | 'medium'

interface Value {
  year?: number
  month?: number
  date?: number
}

type ValueType = 'year' | 'month' | 'date'

interface Fields {
  year?: boolean
  month?: boolean
  date?: boolean
}

const props = defineProps({
  size: { type: String as PropType<Size>, default: 'small' },
  label: { type: String, default: null },
  note: { type: String, default: null },
  help: { type: String, default: null },
  year: { type: Boolean, default: true },
  month: { type: Boolean, default: true },
  date: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  errorMessage: { type: Boolean, default: true },
  modelValue: { type: Object as PropType<Value>, default: null },
  validation: { type: Object as PropType<Validation>, default: null }
})

const emit = defineEmits(['update:modelValue'])

const touched = {
  year: false,
  month: false,
  date: false
}

function updateYear(e: FocusEvent): void {
  const value = Number((e.target as HTMLInputElement).value)
  update('year', value === 0 ? undefined : value)
}

function updateMonth(e: FocusEvent): void {
  const value = Number((e.target as HTMLInputElement).value)
  update('month', value === 0 ? undefined : value)
}

function updateDate(e: FocusEvent): void {
  const value = Number((e.target as HTMLInputElement).value)
  update('date', value === 0 ? undefined : value)
}

function update(type: ValueType, value?: number): void {
  const data = { ...props.modelValue } as Value

  setValue(data, type, value)

  data.year === undefined && data.month === undefined && data.date === undefined
    ? emit('update:modelValue', null)
    : emit('update:modelValue', data)

  emitTouch(type)
}

function setValue(data: Value, type: ValueType, value?: number): void {
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
.SInputYMD.mini {
  .container {
    padding: 0 4px;
  }

  .input {
    padding: 3px 0;
    text-align: center;
    font-size: 14px;
  }

  .input.year  { width: 48px; }
  .input.month { width: 32px; }
  .input.date  { width: 32px; }

  .separator {
    padding: 3px 0;
    line-height: 24px;
    font-size: 14px;
  }
}

.SInputYMD.small {
  .container {
    padding: 0 4px;
  }

  .input {
    padding: 7px 0;
    text-align: center;
    font-size: 16px;
  }

  .input.year  { width: 56px; }
  .input.month { width: 40px; }
  .input.date  { width: 40px; }

  .separator {
    padding: 7px 0;
    line-height: 24px;
    font-size: 16px;
  }
}

.SInputYMD.medium {
  .container {
    padding: 0 4px;
  }

  .input {
    padding: 11px 0;
    text-align: center;
    font-size: 16px;
  }

  .input.year  { width: 56px; }
  .input.month { width: 40px; }
  .input.date  { width: 40px; }

  .separator {
    padding: 11px 0;
    line-height: 24px;
    font-size: 16px;
  }
}

.SInputYMD.outlined {
  .container {
    border: 1px solid var(--input-outlined-border);
    border-radius: 4px;
    transition: border-color .25s;

    &:hover {
      border-color: var(--input-focus-border);
    }
  }
}

.SInputYMD.outlined.disabled {
  .container {
    border-color: var(--input-outlined-border);
    background-color: var(--input-outlined-bg-disabled);
  }
}

.SInputYMD.disabled {
  .container,
  .input {
    cursor: not-allowed;
  }

  .container {
    background-color: var(--input-disabled-bg);
  }
}

.SInputYMD.has-error {
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
  background-color: transparent;
}

.separator::before {
  color: var(--c-text-3);
  content: "/";
}
</style>
