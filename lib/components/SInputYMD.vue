<script setup lang="ts">
import { computed, ref } from 'vue'
import SInputBase, { type Props as BaseProps } from './SInputBase.vue'

export interface Props extends BaseProps {
  placeholder?: Placeholder
  noYear?: boolean
  noMonth?: boolean
  noDate?: boolean
  block?: boolean
  disabled?: boolean
  value?: Value
  modelValue?: Value
}

export interface Value {
  year: number | null
  month: number | null
  date: number | null
}

export type ValueType = 'year' | 'month' | 'date'

export interface Placeholder {
  year?: number
  month?: number
  date?: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:model-value': [value: Value]
  'change': [value: Value]
}>()

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined ? props.value : null
})

const padValue = computed(() => {
  return {
    year: _value.value?.year?.toString().padStart(4, '0') ?? null,
    month: _value.value?.month?.toString().padStart(2, '0') ?? null,
    date: _value.value?.date?.toString().padStart(2, '0') ?? null
  }
})

const padPlaceholder = computed(() => {
  return {
    year: props.placeholder?.year?.toString().padStart(4, '0') ?? '1998',
    month: props.placeholder?.month?.toString().padStart(2, '0') ?? '01',
    date: props.placeholder?.date?.toString().padStart(2, '0') ?? '14'
  }
})

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
  update('year', (e.target as HTMLInputElement).value)
}

function updateMonth(e: FocusEvent) {
  update('month', (e.target as HTMLInputElement).value)
}

function updateDate(e: FocusEvent) {
  update('date', (e.target as HTMLInputElement).value)
}

function update(type: ValueType, value: string) {
  if (_value.value == null) {
    return
  }

  const newValue = {
    ..._value.value,
    [type]: value ? Number(value) : null
  }

  emit('update:model-value', newValue)
  emit('change', newValue)

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
    <div class="container" :class="{ focus: isFocused, block }">
      <input
        v-if="!noYear"
        class="input year"
        :value="padValue?.year"
        :placeholder="padPlaceholder.year"
        :maxlength="4"
        :disabled
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
        :value="padValue?.month"
        :placeholder="padPlaceholder.month"
        :maxlength="2"
        :disabled
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
        :value="padValue?.date"
        :placeholder="padPlaceholder.date"
        :maxlength="2"
        :disabled
        @focus="onFocus"
        @blur="updateDate"
      >
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style scoped lang="postcss">
.SInputYMD.sm,
.SInputYMD.mini {
  .container {
    padding: 0 4px;
  }

  .input {
    padding: 3px 0;
    text-align: center;
    font-size: var(--input-font-size, var(--input-mini-font-size));
  }

  .input.year  { width: 48px; }
  .input.month { width: 32px; }
  .input.date  { width: 32px; }

  .separator {
    padding: 3px 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-mini-font-size));
  }
}

.SInputYMD.md {
  .container {
    padding: 0 6px;
    height: 36px;
  }

  .input {
    padding: 5px 0;
    text-align: center;
    line-height: 24px;
    font-size: var(--input-font-size, 14px);
  }

  .input.year  { margin-right: 2px; }
  .input.year  { width: 48px; }
  .input.month { width: 32px; }
  .input.date  { width: 32px; }

  .separator {
    padding: 5px 0;
    line-height: 24px;
    font-size: var(--input-font-size, 14px);
  }
}

.SInputYMD.small {
  .container {
    padding: 0 8px;
  }

  .input {
    padding: 7px 0 6px;
    text-align: center;
    font-size: var(--input-font-size, var(--input-small-font-size));
  }

  .input.year  { margin-right: 2px; }
  .input.year  { width: 48px; }
  .input.month { width: 32px; }
  .input.date  { width: 32px; }

  .separator {
    padding: 7px 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-small-font-size));
  }
}

.SInputYMD.medium {
  .container {
    padding: 0 8px;
  }

  .input {
    padding: 11px 0;
    text-align: center;
    font-size: var(--input-font-size, var(--input-medium-font-size));
  }

  .input.year  { margin-right: 2px; }
  .input.year  { width: 52px; }
  .input.month { width: 36px; }
  .input.date  { width: 36px; }

  .separator {
    padding: 11px 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-medium-font-size));
  }
}

.SInputYMD.disabled {
  .container,
  .input {
    cursor: not-allowed;
  }

  .container {
    background-color: var(--input-disabled-bg-color);
  }

  .container:hover { border-color: var(--input-border-color); }
  .container.focus { border-color: var(--input-border-color); }
}

.SInputYMD.has-error {
  .container {
    border-color: var(--input-error-border-color);
  }
}

.container {
  display: inline-flex;
  border: 1px solid var(--input-border-color);
  border-radius: 6px;
  background-color: var(--input-bg-color);
  transition: border-color 0.25s, background-color 0.25s;

  &:hover { border-color: var(--input-hover-border-color); }
  &.focus { border-color: var(--input-focus-border-color); }

  &.block {
    width: 100%;
  }
}

.input {
  line-height: 24px;
  font-family: var(--input-value-font-family, var(--font-family-base));
  font-feature-settings: "tnum";
  background-color: transparent;

  &::placeholder {
    color: var(--input-placeholder-color);
  }
}

.separator::before {
  color: var(--c-text-3);
  content: "/";
}
</style>
