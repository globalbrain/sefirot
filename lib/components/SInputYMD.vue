<script setup lang="ts">
import { ref } from 'vue'
import { Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'

export type Size = 'mini' | 'small' | 'medium'

export interface Value {
  year: number | null
  month: number | null
  date: number | null
}

export type ValueType = 'year' | 'month' | 'date'

const props = defineProps<{
  size?: Size
  label?: string
  info?: string
  note?: string
  help?: string
  noYear?: boolean
  noMonth?: boolean
  noDate?: boolean
  disabled?: boolean
  hideError?: boolean
  modelValue: Value
  validation?: Validatable
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Value): void
}>()

const isFocused = ref(false)

const touched = {
  year: false,
  month: false,
  date: false
}

function onFocus() {
  isFocused.value = true
}

function blur() {
  isFocused.value = false
}

function updateYear(e: FocusEvent) {
  update('year', Number((e.target as HTMLInputElement).value))
}

function updateMonth(e: FocusEvent) {
  update('month', Number((e.target as HTMLInputElement).value))
}

function updateDate(e: FocusEvent) {
  update('date', Number((e.target as HTMLInputElement).value))
}

function update(type: ValueType, value: number) {
  emit('update:modelValue', {
    ...props.modelValue,
    [type]: value === 0 ? null : value
  })

  emitTouch(type)

  blur()
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
    class="SInputYMD"
    :class="[size ?? 'small', { disabled }]"
    :label="label"
    :note="note"
    :info="info"
    :help="help"
    :hide-error="hideError"
    :validation="validation"
  >
    <div class="container" :class="{ focus: isFocused }">
      <input
        v-if="!noYear"
        class="input year"
        type="number"
        :value="modelValue.year"
        placeholder="YYYY"
        :disabled="disabled"
        @focus="onFocus"
        @blur="updateYear"
      >
      <div
        v-if="!noYear && !noMonth"
        class="separator"
      />
      <input
        v-if="!noMonth"
        class="input month"
        type="number"
        :value="modelValue.month"
        placeholder="M"
        :disabled="disabled"
        @focus="onFocus"
        @blur="updateMonth"
      >
      <div
        v-if="!noMonth && !noDate"
        class="separator"
      />
      <input
        v-if="!noDate"
        class="input date"
        type="number"
        :value="modelValue.date"
        placeholder="D"
        :disabled="disabled"
        @focus="onFocus"
        @blur="updateDate"
      >
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

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
    padding: 0 6px;
  }

  .input {
    padding: 7px 0;
    text-align: center;
    font-size: 16px;
  }

  .input.year  { width: 56px; }
  .input.month { width: 32px; }
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
  content: "/";
}
</style>
