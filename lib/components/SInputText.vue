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
    <div class="box">
      <div v-if="icon" class="icon" role="button" @click="focus">
        <component :is="icon" class="icon-svg" />
      </div>

      <input
        ref="inputEl"
        class="input"
        :class="inputClasses"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="modelValue"
        @input="emitInput"
        @blur="emitBlur"
        @keypress.enter="emitEnter"
      >
    </div>
  </SInputBase>
</template>

<script setup lang="ts">
import { PropType, ref, computed } from 'vue'
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
  icon: { type: Object, default: null },
  disabled: { type: Boolean, default: false },
  errorMessage: { type: Boolean, default: true },
  modelValue: { type: [String, Number] as PropType<string | number | null>, default: null },
  validation: { type: Object as PropType<Validatable>, default: null }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
  (e: 'blur', value: string | null): void
  (e: 'enter', value: string | null): void
}>()

const inputEl = ref<HTMLElement | null>(null)

const classes = computed(() => [
  props.size,
  { disabled: props.disabled }
])

const inputClasses = computed(() => [
  { 'has-icon': props.icon }
])

function focus() {
  inputEl.value && inputEl.value.focus()
}

function emitInput(e: Event): void {
  emit('update:modelValue', getValue(e))
}

function emitBlur(e: FocusEvent): void {
  const value = getValue(e)

  props.validation?.$touch()

  emit('update:modelValue', value)
  emit('blur', value)
}

function emitEnter(e: KeyboardEvent): void {
  const value = getValue(e)

  props.validation?.$touch()

  emit('update:modelValue', value)
  emit('enter', value)
}

function getValue(e: Event | FocusEvent | KeyboardEvent): string | null {
  const value = (e.target as HTMLInputElement).value

  return value === '' ? null : value
}
</script>

<style lang="postcss" scoped>
.SInputText.mini {
  .input {
    padding: 3px 12px;
    font-size: 14px;

    &.has-icon {
      padding-left: 30px;
    }
  }

  .icon {
    top: 9px;
    left: 10px;
  }

  .icon-svg {
    width: 14px;
    height: 14px;
  }
}

.SInputText.small {
  .input {
    padding: 7px 12px;
    font-size: 16px;

    &.has-icon {
      padding-left: 36px;
    }
  }

  .icon {
    top: 12px;
    left: 12px;
  }

  .icon-svg {
    width: 15px;
    height: 15px;
  }
}

.SInputText.medium {
  .input {
    padding: 11px 16px;
    font-size: 16px;

    &.has-icon {
      padding-left: 36px;
    }
  }

  .icon {
    top: 16px;
    left: 12px;
  }

  .icon-svg {
    width: 16px;
    height: 16px;
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

.box {
  position: relative;
  display: flex;
  flex-grow: 1;
  max-width: 100%;

  &:hover .input {
    border-color: var(--input-focus-border);
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
    background-color: transparent;
  }
}

.icon {
  position: absolute;
  cursor: text;
}

.icon-svg {
  display: block;
  fill: var(--c-text-light-2);
}
</style>
