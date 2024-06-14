<script setup lang="ts">
import xor from 'lodash-es/xor'
import { type Component, computed, ref } from 'vue'
import { type DropdownSectionFilter, useManualDropdownPosition } from '../composables/Dropdown'
import { useFlyout } from '../composables/Flyout'
import { type Validatable } from '../composables/V'
import { isArray } from '../support/Utils'
import SDropdown from './SDropdown.vue'
import SInputBase from './SInputBase.vue'
import SInputDropdownItem from './SInputDropdownItem.vue'
import IconCaretDown from '~icons/ph/caret-down-bold'
import IconCaretUp from '~icons/ph/caret-up-bold'

export type Size = 'mini' | 'small' | 'medium'
export type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

export type PrimitiveValue = any
export type ArrayValue = any[]
export type OptionValue = any

export type Option = OptionText | OptionAvatar

export interface OptionBase {
  type?: 'text' | 'avatar'
  value: OptionValue
  disabled?: boolean
}

export interface OptionText extends OptionBase {
  type?: 'text'
  label: string
}

export interface OptionAvatar extends OptionBase {
  type: 'avatar'
  label: string
  image?: string | null
}

const props = defineProps<{
  size?: Size
  label?: string
  info?: string
  note?: string
  help?: string
  placeholder?: string
  checkIcon?: Component
  checkText?: string
  checkColor?: Color
  options: Option[]
  position?: 'top' | 'bottom'
  noSearch?: boolean
  nullable?: boolean
  closeOnClick?: boolean
  disabled?: boolean
  modelValue: PrimitiveValue | ArrayValue
  validation?: Validatable
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: PrimitiveValue | ArrayValue): void
}>()

const container = ref<any>(null)

const { isOpen, open } = useFlyout(container)
const { position, update: updatePosition } = useManualDropdownPosition(container)

const classes = computed(() => [
  props.size ?? 'small',
  { disabled: props.disabled }
])

const dropdownOptions = computed<DropdownSectionFilter[]>(() => [{
  type: 'filter',
  search: props.noSearch === undefined ? true : !props.noSearch,
  selected: props.modelValue,
  options: props.options,
  onClick: handleSelect
}])

const selected = computed(() => {
  if (isArray(props.modelValue)) {
    return props.options.filter((o) => (props.modelValue as ArrayValue).includes(o.value))
  }

  const item = props.options.find((o) => o.value === props.modelValue)

  return item ? [item] : []
})

const hasSelected = computed(() => {
  return selected.value.length > 0
})

const removable = computed(() => {
  if (isArray(props.modelValue)) {
    return props.nullable || selected.value.length > 1
  }

  return !!props.nullable
})

async function handleOpen() {
  if (!props.disabled) {
    updatePosition()
    open()
  }
}

function handleSelect(value: OptionValue) {
  props.validation?.$touch()

  isArray(props.modelValue) ? handleArray(value) : handlePrimitive(value)
}

function handlePrimitive(value: OptionValue) {
  if (value !== props.modelValue) {
    return emit('update:modelValue', value)
  }

  if (props.nullable) {
    emit('update:modelValue', null)
  }
}

function handleArray(value: OptionValue) {
  const difference = xor(props.modelValue as ArrayValue, [value])

  if (!props.nullable && difference.length === 0) {
    return
  }

  emit('update:modelValue', difference)
}
</script>

<template>
  <SInputBase
    class="SInputDropdown"
    :class="classes"
    :label="label"
    :note="note"
    :info="info"
    :help="help"
    :check-icon="checkIcon"
    :check-text="checkText"
    :check-color="checkColor"
    :validation="validation"
  >
    <div class="container" ref="container">
      <div
        class="box"
        role="button"
        tabindex="0"
        @click="handleOpen"
        @keydown.down.prevent
        @keyup.enter="handleOpen"
        @keyup.down="handleOpen"
      >
        <div class="box-content">
          <SInputDropdownItem
            v-if="hasSelected"
            :items="selected"
            :size="size ?? 'small'"
            :removable="removable"
            :disabled="disabled ?? false"
            @remove="handleSelect"
          />

          <div v-else class="box-placeholder">{{ placeholder }}</div>
        </div>

        <div class="box-icon">
          <IconCaretUp class="box-icon-svg up" />
          <IconCaretDown class="box-icon-svg down" />
        </div>
      </div>

      <div v-if="isOpen" class="dropdown" :class="position">
        <SDropdown :sections="dropdownOptions" />
      </div>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style scoped lang="postcss">
.container {
  position: relative;
}

.box {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid var(--input-border-color);
  border-radius: 6px;
  width: 100%;
  color: var(--input-text);
  background-color: var(--input-bg-color);;
  cursor: pointer;
  transition: border-color 0.25s, background-color 0.25s;

  &:hover {
    border-color: var(--input-hover-border-color);
  }
}

.box-content {
  display: flex;
  align-items: center;
}

.box-placeholder {
  line-height: 24px;
  color: var(--input-placeholder-color);
  overflow: hidden;
  white-space: nowrap;
}

.box-icon {
  position: absolute;
  z-index: 10;
  cursor: pointer;
}

.box-icon-svg {
  display: block;
  width: 14px;
  height: 14px;
  color: var(--c-text-2);
}

.box-icon-svg.up {
  margin-bottom: -4px;
}

.dropdown {
  position: absolute;
  left: 0;
  z-index: var(--z-index-dropdown);

  &.top    { bottom: calc(100% + 8px); }
  &.bottom { top: calc(100% + 8px); }
}

.SInputDropdown.mini {
  .box {
    min-height: 32px;
  }

  .box-content {
    padding: 3px 30px 3px 8px;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-mini-font-size));
  }

  .box-icon {
    top: 3px;
    right: 8px;
  }
}

.SInputDropdown.small {
  .box {
    min-height: 40px;
  }

  .box-content {
    padding: 5px 30px 5px 12px;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-small-font-size));
  }

  .box-icon {
    top: 7px;
    right: 8px;
  }
}

.SInputDropdown.medium {
  .box {
    height: 48px;
  }

  .box-content {
    padding: 11px 44px 11px 16px;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-medium-font-size));
  }

  .box-icon {
    top: 11px;
    right: 12px;
  }
}

.SInputDropdown.disabled {
  .box {
    border-color: var(--input-disabled-border-color);
    background-color: var(--input-disabled-bg-color);
    cursor: not-allowed;

    &:hover                     { border-color: var(--input-disabled-border-color); }
    &:focus:not(:focus-visible) { border-color: var(--input-disabled-border-color); }
  }

  .box-icon {
    cursor: not-allowed;
  }
}

.SInputDropdown.has-error {
  .box {
    border-color: var(--input-error-border-color);
  }
}
</style>
