<script setup lang="ts">
import { type IconifyIcon } from '@iconify/vue/dist/offline'
import { type DefineComponent, computed, ref } from 'vue'
import { type Validatable } from '../composables/V'
import { isString } from '../support/Utils'
import SIcon from './SIcon.vue'
import SInputBase from './SInputBase.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Align = 'left' | 'center' | 'right'
export type CheckColor = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'
export type TextColor = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  info?: string
  note?: string
  help?: string
  type?: string
  placeholder?: string
  unitBefore?: any
  unitAfter?: any
  checkIcon?: IconifyIcon | DefineComponent
  checkText?: string
  checkColor?: CheckColor
  textColor?: TextColor | ((value: string | null) => TextColor)
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

const inputClasses = computed(() => [
  textColor.value,
  { hide: showDisplay.value }
])

const textColor = computed(() => {
  if (!props.textColor) {
    return 'neutral'
  }

  if (isString(props.textColor)) {
    return props.textColor
  }

  return props.textColor(props.modelValue)
})

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

      <div class="value">
        <div v-if="unitBefore" class="unit before">
          <span v-if="isString(unitBefore)" class="unit-text">{{ unitBefore }}</span>
          <SIcon v-else class="unit-icon" :icon="unitBefore" />
        </div>

        <div class="area">
          <input
            class="input entity"
            :class="inputClasses"
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
          <div v-if="showDisplay" class="input display" :class="[textColor]">
            {{ displayValue }}
          </div>
        </div>

        <div v-if="unitAfter" class="unit after">
          <span v-if="isString(unitAfter)" class="unit-text">{{ unitAfter }}</span>
          <SIcon v-else class="unit-icon" :icon="unitAfter" />
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
  .area  { min-height: 30px; }
  .unit  { min-height: 30px; }

  .input {
    padding: 3px 8px;
    letter-spacing: 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-mini-font-size));
  }

  .unit + .area .input      { padding-left: 6px; }
  .area:has(+ .unit) .input { padding-right: 6px; }

  .unit {
    padding: 3px 8px;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-mini-font-size));
  }

  .unit.before { padding-right: 0; }
  .unit.after  { padding-left: 0; }

  .unit-icon {
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
  .area  { min-height: 38px; }
  .unit  { min-height: 38px; }

  .input {
    padding: 7px 12px;
    letter-spacing: 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-small-font-size));
  }

  .unit + .area .input      { padding-left: 8px; }
  .area:has(+ .unit) .input { padding-right: 8px; }

  .unit {
    padding: 7px 12px;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-small-font-size));
  }

  .unit.before { padding-right: 0; }
  .unit.after  { padding-left: 0; }

  .unit-icon {
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
  .area  { min-height: 46px; }
  .unit  { min-height: 46px; }

  .input {
    padding: 11px 12px;
    letter-spacing: 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-medium-font-size));
  }

  .unit + .area .input      { padding-left: 8px; }
  .area:has(+ .unit) .input { padding-right: 8px; }

  .unit {
    padding: 11px 12px;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-medium-font-size));
  }

  .unit.before { padding-right: 0; }
  .unit.after  { padding-left: 0; }

  .unit-icon {
    width: 16px;
    height: 16px;
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

  .box:hover .input,
  .box:hover .unit {
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

.value,
.area {
  position: relative;
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.input {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  cursor: text;
  font-family: var(--input-value-font-family);

  &.neutral:not(.hide) { color: var(--input-value-color); }
  &.info:not(.hide)    { color: var(--c-text-info-1); }
  &.success:not(.hide) { color: var(--c-text-success-1); }
  &.warning:not(.hide) { color: var(--c-text-warning-1); }
  &.danger:not(.hide)  { color: var(--c-text-danger-1); }

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
  overflow: hidden;
}

.unit {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-2);
}

.unit-text {
  font-weight: 500;
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
