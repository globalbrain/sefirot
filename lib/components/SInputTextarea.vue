<script setup lang="ts">
import { type IconifyIcon } from '@iconify/vue/dist/offline'
import { computed } from 'vue'
import { type Validatable } from '../composables/V'
import SInputBase from './SInputBase.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  info?: string
  note?: string
  help?: string
  checkIcon?: IconifyIcon
  checkText?: string
  checkColor?: Color
  placeholder?: string
  disabled?: boolean
  rows?: number | 'fill'
  value?: string | null
  modelValue?: string | null
  hideError?: boolean
  validation?: Validatable
}>()

const emit = defineEmits<{
  (e: 'update:model-value', value: string | null): void
  (e: 'input', value: string | null): void
  (e: 'blur', value: string | null): void
}>()

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined ? props.value : null
})

const classes = computed(() => [
  props.size ?? 'small',
  { disabled: props.disabled },
  { fill: props.rows === 'fill' }
])

function emitInput(e: Event): void {
  const v = (e.target as HTMLInputElement).value || null
  emit('update:model-value', v)
  emit('input', v)
}

function emitBlur(e: FocusEvent): void {
  props.validation?.$touch()

  const v = (e.target as HTMLInputElement).value || null
  emit('update:model-value', v)
  emit('blur', v)
}
</script>

<template>
  <SInputBase
    class="SInputTextarea"
    :class="classes"
    :name="name"
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
    <textarea
      :id="name"
      class="input"
      :class="{ fill: rows === 'fill' }"
      :placeholder="placeholder"
      :rows="rows ?? 3"
      :disabled="disabled"
      :value="_value ?? undefined"
      @input="emitInput"
      @blur="emitBlur"
    />
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style scoped lang="postcss">
.SInputTextarea.mini {
  .input {
    padding: 6px 10px;
    width: 100%;
    min-height: 80px;
    line-height: 20px;
    font-size: var(--input-font-size, var(--input-mini-font-size));
  }
}

.SInputTextarea.small {
  .input {
    padding: 7px 12px;
    width: 100%;
    min-height: 96px;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-small-font-size));
  }
}

.SInputTextarea.medium {
  .input {
    padding: 11px 16px;
    width: 100%;
    min-height: 96px;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-medium-font-size));
  }
}

.SInputTextarea.disabled {
  .input,
  .input:hover {
    border-color: var(--input-disabled-border-color);
    color: var(--input-disabled-value-color);
    background-color: var(--input-disabled-bg-color);
    cursor: not-allowed;
  }
}

.SInputTextarea.has-error {
  .input {
    border-color: var(--input-error-border-color);

    &:hover,
    &:focus {
      border-color: var(--input-error-border-color);
    }
  }
}

.input {
  display: block;
  flex-grow: 1;
  border: 1px solid var(--input-border-color);
  border-radius: 6px;
  width: 100%;
  font-family: var(--input-value-font-family);
  font-weight: 400;
  background-color: var(--input-bg-color);
  transition: border-color 0.25s, background-color 0.25s;

  &::placeholder {
    color: var(--input-placeholder-color);
  }

  &:hover {
    border-color: var(--input-hover-border-color);
  }

  &:focus,
  &:hover:focus {
    border-color: var(--input-focus-border-color);
  }

  &.fill {
    height: 100%;
  }
}
</style>
