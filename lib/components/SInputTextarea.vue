<template>
  <SInputBase
    class="SInputTextarea"
    :class="classes"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
    :hide-error="hideError"
    :validation="validation"
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
  </SInputBase>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'

export type Size = 'mini' | 'small' | 'medium'

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  note?: string
  help?: string
  placeholder?: string
  disabled?: boolean
  rows?: number
  modelValue: string | null
  hideError?: boolean
  validation?: Validatable
}>()

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
  background-color: transparent;
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
