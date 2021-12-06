<template>
  <SInputBase
    class="SInputTextarea"
    :class="classes"
    :label="label"
    :note="note"
    :help="help"
    :validation="validation"
  >
    <div class="container">
      <textarea
        class="input"
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
        :value="modelValue"
        @input="emitInput"
        @blur="emitBlur"
      />
    </div>
  </SInputBase>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { Validation } from '../composables/Validation'
import SInputBase from './SInputBase.vue'

type Size = 'mini' | 'small' | 'medium'

const props = defineProps({
  size: { type: String as PropType<Size>, default: 'small' },
  label: { type: String, default: null },
  note: { type: String, default: null },
  help: { type: String, default: null },
  placeholder: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  rows: { type: Number, default: 3 },
  modelValue: { type: String, default: null },
  validation: { type: Object as PropType<Validation>, default: null }
})

const emit = defineEmits(['update:modelValue'])

const classes = computed(() => [
  props.size,
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
    padding: 7px 12px;
    width: 100%;
    min-height: 88px;
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
    background-color: var(--c-input-focus-bg);
  }
}
</style>
