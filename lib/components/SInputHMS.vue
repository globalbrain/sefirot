<script setup lang="ts">
import { type IconifyIcon } from '@iconify/vue/dist/offline'
import { type DefineComponent } from 'vue'
import { computed, ref } from 'vue'
import { type Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

export interface Value {
  hour: string | null
  minute: string | null
  second: string | null
}

export interface Placeholder {
  hour?: string
  minute?: string
  second?: string
}

export type ValueType = 'hour' | 'minute' | 'second'

const props = defineProps<{
  size?: Size
  label?: string
  info?: string
  note?: string
  help?: string
  placeholder?: Placeholder
  checkIcon?: IconifyIcon | DefineComponent
  checkText?: string
  checkColor?: Color
  noHour?: boolean
  noMinute?: boolean
  noSecond?: boolean
  disabled?: boolean
  value?: Value
  modelValue?: Value
  validation?: Validatable
  hideError?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:model-value', value: Value): void
  (e: 'change', value: Value): void
}>()

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined ? props.value : null
})

const padValue = computed(() => {
  return {
    hour: _value.value?.hour?.padStart(2, '0') ?? null,
    minute: _value.value?.minute?.padStart(2, '0') ?? null,
    second: _value.value?.second?.padStart(2, '0') ?? null
  }
})

const padPlaceholder = computed(() => {
  return {
    hour: props.placeholder?.hour?.toString().padStart(2, '0') ?? '00',
    minute: props.placeholder?.minute?.toString().padStart(2, '0') ?? '00',
    second: props.placeholder?.second?.toString().padStart(2, '0') ?? '00'
  }
})

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
  if (_value.value === null) {
    return
  }

  const newValue = {
    ..._value.value,
    [type]: value ?? null
  }

  emit('update:model-value', newValue)
  emit('change', newValue)

  emitTouch(type)

  blur()
}

function getValue(value: string): string | null {
  if (value === '') {
    return null
  }

  const input = Number(value)

  return Number.isNaN(input) ? null : String(input)
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
    :class="[size ?? 'small', { disabled }]"
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
    <div class="container" :class="{ focus: isFocused }">
      <input
        v-if="!noHour"
        class="input hour"
        :value="padValue?.hour"
        :placeholder="padPlaceholder.hour"
        :maxlength="2"
        :disabled="disabled"
        @focus="onFocus"
        @blur="updateHour"
      >
      <div v-if="!noHour && !noMinute" class="separator" />
      <input
        v-if="!noMinute"
        class="input minute"
        :value="padValue?.minute"
        :placeholder="padPlaceholder.minute"
        :maxlength="2"
        :disabled="disabled"
        @focus="onFocus"
        @blur="updateMinute"
      >
      <div v-if="!noMinute && !noSecond" class="separator" />
      <input
        v-if="!noSecond"
        class="input second"
        :value="padValue?.second"
        :placeholder="padPlaceholder.second"
        :maxlength="2"
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
    width: 20px;
    text-align: center;
    font-size: var(--input-font-size, var(--input-mini-font-size));
  }

  .separator {
    padding: 3px 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-mini-font-size));
  }

  .separator::before {
    padding: 0 4px;
  }
}

.SInputHMS.small {
  .container {
    padding: 0 12px;
    min-height: 40px;
  }

  .input {
    flex-shrink: 0;
    padding: 7px 0 6px;
    width: 20px;
    text-align: center;
    font-size: var(--input-font-size, var(--input-small-font-size));
  }

  .separator {
    padding: 7px 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-small-font-size));
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
    font-size: var(--input-font-size, var(--input-medium-font-size));
    width: 24px;
  }

  .separator {
    padding: 11px 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-medium-font-size));
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
    background-color: var(--input-disabled-bg-color);
  }

  .container:hover { border-color: var(--input-border-color); }
  .container.focus { border-color: var(--input-border-color); }
}

.SInputHMS.has-error {
  .container {
    border-color: var(--input-error-border-color);
  }
}

.container {
  display: inline-flex;
  border: 1px solid var(--input-border-color);
  border-radius: 6px;
  background-color: var(--input-bg-color);
  transition: border-color 0.25s;

  &:hover { border-color: var(--input-hover-border-color); }
  &.focus { border-color: var(--input-focus-border-color); }
}

.input {
  font-family: var(--font-family-number);
  line-height: 24px;
  background-color: transparent;

  &::placeholder {
    color: var(--input-placeholder-color);
  }
}

.separator::before {
  color: var(--c-text-3);
  content: ":";
}
</style>
