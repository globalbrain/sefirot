<script setup lang="ts">
import { IconifyIcon } from '@iconify/vue/dist/offline'
import { DefineComponent, computed } from 'vue'
import { Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'

export type Size = 'mini' | 'small' | 'medium'

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  info?: string
  note?: string
  help?: string
  placeholder?: string
  disabled?: boolean
  rows?: number
  modelValue: string | null
  hideError?: boolean
  validation?: Validatable
  checkIcon?: IconifyIcon | DefineComponent
  checkText?: string
  checkColor?: Color
}>()

type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const classes = computed(() => [
  props.size ?? 'small',
  { disabled: props.disabled }
])

function emitInput(e: Event): void {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

function emitBlur(e: FocusEvent): void {
  props.validation?.$touch()
  emit('update:modelValue', (e.target as HTMLInputElement).value)
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
    :hide-error="hideError"
    :validation="validation"
    :check-icon="checkIcon"
    :check-text="checkText"
    :check-color="checkColor"
  >
    <textarea
      :id="name"
      class="input"
      :placeholder="placeholder"
      :rows="rows ?? 3"
      :disabled="disabled"
      :value="modelValue ?? ''"
      @input="emitInput"
      @blur="emitBlur"
    />
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style lang="postcss" scoped>
.SInputTextarea.mini {
  .input {
    padding: 6px 12px;
    width: 100%;
    min-height: 80px;
    line-height: 20px;
    font-size: 14px;
  }
}

.SInputTextarea.small {
  .input {
    padding: 12px;
    width: 100%;
    min-height: 96px;
    line-height: 24px;
    font-size: 16px;
  }
}

.SInputTextarea.medium {
  .input {
    padding: 11px 16px;
    width: 100%;
    min-height: 96px;
    line-height: 24px;
    font-size: 16px;
  }
}

.SInputTextarea.disabled {
  .input,
  .input:hover {
    background-color: var(--input-disabled-bg);
    cursor: not-allowed;
  }
}

.SInputTextarea.has-error {
  .input {
    border-color: var(--c-danger);

    &:hover,
    &:focus {
      border-color: var(--c-danger);
    }
  }
}

.input {
  display: block;
  flex-grow: 1;
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  width: 100%;
  font-weight: 400;
  background-color: var(--c-bg);
  transition: border-color 0.25s, background-color 0.25s;

  &::placeholder {
    font-weight: 500;
    color: var(--c-text-3);
  }

  &:hover {
    border-color: var(--c-black);
  }

  &:focus,
  &:hover:focus {
    border-color: var(--c-info);
  }

  .dark &:hover {
    border-color: var(--c-gray);
  }

  .dark &:focus,
  .dark &:hover:focus {
    border-color: var(--c-info);
  }
}
</style>
