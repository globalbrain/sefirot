<script setup lang="ts">
import { IconifyIcon } from '@iconify/vue/dist/offline'
import { DefineComponent, computed, ref } from 'vue'
import { Validatable } from '../composables/Validation'
import SIcon from './SIcon.vue'
import SInputBase from './SInputBase.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Align = 'left' | 'center' | 'right'
export type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  info?: string
  note?: string
  help?: string
  type?: string
  placeholder?: string
  checkIcon?: IconifyIcon | DefineComponent
  checkText?: string
  checkColor?: Color
  icon?: any
  align?: Align
  disabled?: boolean
  modelValue: string | null
  displayValue?: string | null
  hideError?: boolean
  validation?: Validatable
}>()

const emit = defineEmits<{
  (e: 'update:model-value', value: string | null): void
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

  emit('update:model-value', value)
  emit('blur', value)

  isFocused.value = false
}

function emitInput(e: Event): void {
  const v = getValue(e)
  emit('update:model-value', v)
  emit('input', v)
}

function emitEnter(e: KeyboardEvent): void {
  const value = getValue(e)

  props.validation?.$touch()

  emit('update:model-value', value)
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
    :check-icon="checkIcon"
    :check-text="checkText"
    :check-color="checkColor"
    :hide-error="hideError"
    :validation="validation"
  >
    <div class="box" :class="{ focus: isFocused }" @click="focus">
      <div v-if="$slots['addon-before']" class="addon before">
        <slot name="addon-before" />
      </div>

      <div v-if="icon" class="icon">
        <SIcon :icon="icon" class="icon-svg" />
      </div>

      <div class="value">
        <input
          class="input entity"
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
        <div v-if="showDisplay" class="input display">
          {{ displayValue }}
        </div>
      </div>

      <div v-if="$slots['addon-after']" class="addon after">
        <slot name="addon-after" />
      </div>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style scoped lang="postcss">
.SInputText.mini {
  .box   { min-height: 32px; }
  .value { min-height: 30px; }

  .input {
    padding: 3px 8px;
    letter-spacing: 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-mini-font-size));
  }

  .icon {
    width: 22px;
    height: 30px;
  }

  .icon-svg {
    width: 16px;
    height: 16px;
  }

  :slotted(.SInputAddon) .action {
    padding: 0 10px;
    font-size: 12px;
    font-weight: 500;
  }

  :slotted(.SInputAddon) .action-icon {
    width: 16px;
    height: 16px;
  }

  :slotted(.SInputAddon) .caret {
    margin-left: 4px;
    margin-right: -2px;
    width: 10px;
    height: 10px;
  }
}

.SInputText.small {
  .box   { min-height: 40px; }
  .value { min-height: 38px; }

  .input {
    padding: 7px 12px;
    letter-spacing: 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-small-font-size));
  }

  .icon {
    width: 26px;
    height: 38px;
  }

  .icon-svg {
    width: 16px;
    height: 16px;
  }

  :slotted(.SInputAddon) .action {
    padding: 0 12px;
    font-size: 14px;
    font-weight: 500;
  }

  :slotted(.SInputAddon) .action-icon {
    width: 16px;
    height: 16px;
  }

  :slotted(.SInputAddon) .caret {
    margin-left: 6px;
    margin-right: -2px;
    width: 12px;
    height: 12px;
  }
}

.SInputText.medium {
  .box   { min-height: 48px; }
  .value { min-height: 46px; }

  .input {
    padding: 11px 12px;
    letter-spacing: 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-medium-font-size));
  }

  .icon {
    width: 28px;
    height: 46px;
  }

  .icon-svg {
    width: 18px;
    height: 18px;
  }

  :slotted(.SInputAddon) .action {
    padding: 0 14px;
    font-size: 14px;
    font-weight: 500;
  }

  :slotted(.SInputAddon) .action-icon {
    width: 16px;
    height: 16px;
  }

  :slotted(.SInputAddon) .caret {
    margin-left: 6px;
    margin-right: -2px;
    width: 12px;
    height: 12px;
  }
}

.SInputText.disabled {
  .box,
  .box:hover,
  .box:hover:has(.SInputAddon:is(.focused, :hover)),
  .box:hover.focus,
  .box.focus:has(.SInputAddon:is(.focused, :hover)),
  .box:hover.focus:has(.SInputAddon:is(.focused, :hover)) {
    border-color: var(--input-disabled-border-color);
    background-color: var(--input-disabled-bg-color);
  }

  .box:hover .input {
    cursor: not-allowed;
  }
}

.SInputText.left .input   { text-align: left; }
.SInputText.center .input { text-align: center; }
.SInputText.right .input  { text-align: right; }

.SInputText.has-error {
  .box,
  .box:hover,
  .box:focus {
    border-color: var(--input-error-border-color);
  }
}

.box {
  position: relative;
  display: flex;
  flex-grow: 1;
  max-width: 100%;
  border: 1px solid var(--input-border-color);
  border-radius: 6px;
  background-color: var(--input-bg-color);
  transition: border-color 0.25s;

  &:hover {
    border-color: var(--input-hover-border-color);
  }

  &:hover:has(.SInputAddon:is(.focused, :hover)) {
    border-color: var(--input-border-color);
  }

  &.focus,
  &:hover.focus,
  &.focus:has(.SInputAddon:is(.focused, :hover)),
  &:hover.focus:has(.SInputAddon:is(.focused, :hover)) {
    border-color: var(--input-focus-border-color);
  }
}

.value {
  position: relative;
  flex-grow: 1;
}

.input {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  color: var(--input-value-color);
  background-color: transparent;
  cursor: text;

  &.hide,
  &.hide::placeholder {
    color: transparent;
  }

  &::placeholder {
    color: var(--input-placeholder-color);
  }
}

.display {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
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

.addon {
  display: flex;
  flex-shrink: 0;
}

.addon :slotted(.SInputAddon) .caret {
  color: var(--c-text-2);
}

.addon.before :slotted(.SInputAddon) {
  .action {
    border-right: 1px solid var(--input-border-color);
    border-radius: 5px 0 0 5px;
  }

  .dialog {
    left: 0;
  }
}

.addon.after :slotted(.SInputAddon) {
  .action {
    border-left: 1px solid var(--input-border-color);
    border-radius: 0 5px 5px 0;
  }

  .dialog {
    right: 0;
  }
}
</style>
