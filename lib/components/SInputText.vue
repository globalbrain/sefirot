<template>
  <SInputBase
    class="SInputText"
    :class="classes"
    :label="label"
    :note="note"
    :help="help"
    :error-message="errorMessage"
    :validation="validation"
  >
    <input
      class="input"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      @input="emitInput"
      @blur="emitBlur"
    >
  </SInputBase>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { Validation, Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'

type Size = 'mini' | 'small' | 'medium'

const props = defineProps({
  size: { type: String as PropType<Size>, default: 'small' },
  label: { type: String, default: null },
  note: { type: String, default: null },
  help: { type: String, default: null },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  errorMessage: { type: Boolean, default: true },
  modelValue: { type: [String, Number] as PropType<string | number | null>, default: null },
  validation: { type: Object as PropType<Validatable>, default: null }
})

const emit = defineEmits(['update:modelValue'])

const classes = computed(() => [
  props.size,
  { disabled: props.disabled }
])

function emitInput(e: Event): void {
  emit('update:modelValue', getValue(e))
}

function emitBlur(e: FocusEvent): void {
  props.validation?.$touch()
  emit('update:modelValue', getValue(e))
}

function getValue(e: Event | FocusEvent): string | null {
  const value = (e.target as HTMLInputElement).value

  return value === '' ? null : value
}
</script>

<style lang="postcss" scoped>
.SInputText.mini {
  .input {
    padding: 3px 12px;
    font-size: 14px;
  }
}

.SInputText.small {
  .input {
    padding: 7px 12px;
    font-size: 16px;
  }
}

.SInputText.medium {
  .input {
    padding: 11px 16px;
    font-size: 16px;
  }
}

.SInputText.disabled {
  .input {
    cursor: not-allowed;
    border-color: transparent;
  }
}

.SInputText.has-error {
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
  border: 1px solid var(--input-border);
  border-radius: 4px;
  width: 100%;
  font-weight: 400;
  background-color: transparent;
  transition: border-color .25s, background-color .25s;

  &::placeholder {
    font-weight: 500;
    color: var(--input-placeholder);
  }

  &:hover {
    border-color: var(--input-hover-border);
  }

  &:focus {
    border-color: var(--input-focus-border);
    background-color: var(--input-focus-bg);
  }
}
</style>
