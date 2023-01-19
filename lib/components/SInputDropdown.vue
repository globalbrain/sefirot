<script setup lang="ts">
import IconCaretDown from '@iconify-icons/ph/caret-down-bold'
import IconCaretUp from '@iconify-icons/ph/caret-up-bold'
import xor from 'lodash-es/xor'
import { computed } from 'vue'
import { DropdownSectionFilter } from '../composables/Dropdown'
import { useFlyout } from '../composables/Flyout'
import { Validatable } from '../composables/Validation'
import { isArray } from '../support/Utils'
import SDropdown from './SDropdown.vue'
import SIcon from './SIcon.vue'
import SInputBase from './SInputBase.vue'
import SInputDropdownItem from './SInputDropdownItem.vue'

export type Size = 'mini' | 'small' | 'medium'
export type PrimitiveValue = string | number | boolean | null
export type ArrayValue = (string | number | boolean)[]
export type OptionValue = string | number | boolean

export type Option = OptionText | OptionAvatar

export interface OptionBase {
  type?: 'text' | 'avatar'
  value: OptionValue
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
  noSearch?: boolean
  nullable?: boolean
  closeOnClick?: boolean
  options: Option[]
  disabled?: boolean
  modelValue: PrimitiveValue | ArrayValue
  validation?: Validatable
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: PrimitiveValue | ArrayValue): void
}>()

const { container, isOpen, open } = useFlyout()

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
  !props.disabled && open()
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
            :removable="removable"
            :disabled="disabled ?? false"
            @remove="handleSelect"
          />

          <div v-else class="box-placeholder">{{ placeholder }}</div>
        </div>

        <div class="box-icon">
          <SIcon :icon="IconCaretUp" class="box-icon-svg up" />
          <SIcon :icon="IconCaretDown" class="box-icon-svg down" />
        </div>
      </div>

      <div v-if="isOpen" class="dropdown">
        <SDropdown :sections="dropdownOptions" />
      </div>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style lang="postcss" scoped>
.SInputDropdown.mini {
  .box {
    min-height: 32px;
  }

  .box-content {
    padding: 3px 30px 3px 12px;
    line-height: 24px;
    font-size: 14px;
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
    padding: 5px 30px 5px 8px;
    line-height: 24px;
    font-size: 16px;
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
    font-size: 16px;
  }

  .box-icon {
    top: 11px;
    right: 12px;
  }
}

.SInputDropdown.disabled {
  .box {
    background-color: var(--c-bg);
    cursor: not-allowed;

    &:hover                     { border-color: var(--c-divider); }
    &:focus:not(:focus-visible) { border-color: var(--c-divider); }
  }

  .box-icon {
    cursor: not-allowed;
  }
}

.SInputDropdown.has-error {
  .box {
    border-color: var(--c-danger);
  }
}

.container {
  position: relative;
}

.box {
  position: relative;
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  width: 100%;
  color: var(--input-text);
  background-color: var(--c-bg);
  cursor: pointer;
  transition: border-color .25s, background-color .25s;

  &:hover {
    border-color: var(--c-black);
  }

  &:focus,
  &:hover.focus {
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

.box-placeholder {
  padding: 2px 4px;
  font-weight: 500;
  color: var(--c-text-3);
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
  top: calc(100% + 8px);
  left: 0;
  z-index: var(--z-index-dropdown);
}
</style>
