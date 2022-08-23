<template>
  <SInputBase
    class="SInputText"
    :class="classes"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
    :error-message="errorMessage"
    :validation="validation"
  >
    <div class="box">
      <input
        :id="name"
        class="input-area"
        :class="inputAreaClasses"
        :style="inputStyles"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="modelValue"
        @input="emitInput"
        @blur="emitBlur"
        @keypress.enter="emitEnter"
      >

      <div
        class="input"
        :class="inputClasses"
        :style="inputStyles"
      >
        <span v-if="displayValue !== null || modelValue !== null" class="value">
          {{ displayValue !== null ? displayValue : modelValue }}
        </span>
      </div>
    </div>
  </SInputBase>
</template>

<script lang="ts">
export type Size = 'mini' | 'small' | 'medium'
export type Align = 'left' | 'center' | 'right'
</script>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'

const props = defineProps({
  size: { type: String as PropType<Size>, default: 'small' },
  name: { type: String, default: null },
  label: { type: String, default: null },
  note: { type: String, default: null },
  help: { type: String, default: null },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: null },
  icon: { type: Object, default: null },
  align: { type: String as PropType<Align>, default: null },
  disabled: { type: Boolean, default: false },
  errorMessage: { type: Boolean, default: true },
  displayValue: { type: String as PropType<string | null>, default: null },
  modelValue: { type: [String, Number] as PropType<string | number | null>, default: null },
  validation: { type: Object as PropType<Validatable>, default: null }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
  (e: 'blur', value: string | null): void
  (e: 'enter', value: string | null): void
}>()

const classes = computed(() => [
  props.size,
  { disabled: props.disabled }
])

const inputClasses = computed(() => [
  { 'has-icon': props.icon }
])

const inputStyles = computed(() => ({
  textAlign: props.align
}))

const inputAreaClasses = computed(() => ({
  'has-icon': props.icon
}))

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
  .input,
  .input-area {
    min-height: 32px;
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
  .input,
  .input-area {
    min-height: 40px;
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
  .input,
  .input-area {
    min-height: 48px;
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
    background-color: var(--input-outlined-bg-disabled);
  }

  .box:hover .input {
    cursor: not-allowed;
    border-color: var(--input-outlined-border);
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
  width: 100%;
  line-height: 24px;
  border: 1px solid var(--input-border);
  border-radius: 4px;
  color: var(--input-text);
  transition: border-color .25s, background-color .25s;
  opacity: 1;

  .value {
    display: block;
    line-height: 24px;
    white-space: nowrap;
    overflow: hidden;
  }
}

.input-area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  letter-spacing: .4px;
  background: transparent;
  border: 1px solid transparent;
  color: transparent;

  &:focus {
    color: var(--c-text-1);
  }

  &:focus + .input .value {
    opacity: 0;
  }
}

.icon {
  position: absolute;
  cursor: text;
}

.icon-svg {
  display: block;
  fill: var(--input-placeholder);
}
</style>
