<script setup lang="ts">
import { computed, ref } from 'vue'
import { Validatable } from '../composables/Validation'
import SIcon from './SIcon.vue'
import SInputBase from './SInputBase.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Align = 'left' | 'center' | 'right'

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  info?: string
  note?: string
  help?: string
  type?: string
  placeholder?: string
  icon?: any
  align?: Align
  disabled?: boolean
  modelValue: string | null
  displayValue?: string | null
  hideError?: boolean
  validation?: Validatable
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
  (e: 'input', value: string | null): void
  (e: 'blur', value: string | null): void
  (e: 'enter', value: string | null): void
}>()

const input = ref<HTMLElement | null>(null)
const isFocused = ref(false)

const classes = computed(() => [
  props.size ?? 'small',
  props.align ?? 'left',
  { disabled: props.disabled }
])

const showDisplay = computed(() => {
  return !isFocused.value && props.displayValue
})

function focus(): void {
  input.value?.focus()
}

function onFocus(): void {
  isFocused.value = true
}

function emitBlur(e: FocusEvent): void {
  const value = getValue(e)

  props.validation?.$touch()

  emit('update:modelValue', value)
  emit('blur', value)

  isFocused.value = false
}

function emitInput(e: Event): void {
  const v = getValue(e)
  emit('update:modelValue', v)
  emit('input', v)
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

<template>
  <SInputBase
    class="SInputText"
    :class="classes"
    :name="name"
    :label="label"
    :note="note"
    :info="info"
    :help="help"
    :hide-error="hideError"
    :validation="validation"
  >
    <div class="box" :class="{ focus: isFocused }" @click="focus">
      <div v-if="icon" class="icon">
        <SIcon :icon="icon" class="icon-svg" />
      </div>

      <div class="value">
        <input
          class="input"
          :class="{ hide: showDisplay }"
          :id="name"
          :type="type ?? 'text'"
          :placeholder="placeholder"
          :disabled="disabled"
          :value="modelValue"
          ref="input"
          @focus="onFocus"
          @blur="emitBlur"
          @input="emitInput"
          @keypress.enter="emitEnter"
        >
        <div v-if="showDisplay" class="display">
          {{ displayValue }}
        </div>
      </div>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style lang="postcss" scoped>
.SInputText.mini {
  .box {
    padding: 0 8px;
    min-height: 32px;
  }

  .value,
  .input,
  .display {
    min-height: 30px;
  }

  .input,
  .display {
    padding: 3px 0;
    letter-spacing: 0;
    line-height: 24px;
    font-size: 14px;
  }

  .display {
    top: 0;
  }

  .icon {
    width: 22px;
    height: 30px;
  }

  .icon-svg {
    width: 16px;
    height: 16px;
  }
}

.SInputText.small {
  .box {
    padding: 0 12px;
    min-height: 40px;
  }

  .value,
  .input,
  .display {
    min-height: 38px;
  }

  .input,
  .display {
    padding: 5px 0;
    letter-spacing: 0;
    line-height: 24px;
    font-size: 16px;
  }

  .display {
    top: 2px;
  }

  .icon {
    width: 26px;
    height: 38px;
  }

  .icon-svg {
    width: 16px;
    height: 16px;
  }
}

.SInputText.medium {
  .box {
    padding: 0 12px;
    min-height: 48px;
  }

  .value,
  .input,
  .display {
    min-height: 46px;
  }

  .input,
  .display {
    padding: 11px 0;
    letter-spacing: 0;
    line-height: 24px;
    font-size: 16px;
  }

  .display {
    top: 0;
  }

  .icon {
    width: 28px;
    height: 46px;
  }

  .icon-svg {
    width: 18px;
    height: 18px;
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

.SInputText.left {
  .input,
  .display {
    text-align: left;
  }
}

.SInputText.center {
  .input,
  .display {
    text-align: center;
  }
}

.SInputText.right {
  .input,
  .display {
    text-align: right;
  }
}

.SInputText.has-error {
  .box {
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
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  background-color: var(--c-bg);
  cursor: text;
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

.value {
  position: relative;
  flex-grow: 1;
}

.input {
  width: 100%;
  background-color: transparent;

  &.hide,
  &.hide::placeholder {
    color: transparent;
  }

  &::placeholder {
    font-weight: 500;
    color: var(--c-text-3);
  }
}

.display {
  position: absolute;
  left: 0;
  width: 100%;
}

.icon {
  display: flex;
  align-items: center;
  cursor: text;
  color: var(--c-text-2);
}

.icon-svg {
  fill: currentColor;
}
</style>
