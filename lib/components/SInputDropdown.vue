<script setup lang="ts">
import IconCaretDown from '~icons/ph/caret-down'
import IconCaretUp from '~icons/ph/caret-up'
import xor from 'lodash-es/xor'
import { type Component, computed, ref } from 'vue'
import { type DropdownSectionFilter, useManualDropdownPosition } from '../composables/Dropdown'
import { useFlyout } from '../composables/Flyout'
import { useTrans } from '../composables/Lang'
import { type Validatable } from '../composables/Validation'
import SDropdown from './SDropdown.vue'
import SInputBase from './SInputBase.vue'
import SInputDropdownItem from './SInputDropdownItem.vue'

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
  validation?: Validatable
}>()

const model = defineModel<PrimitiveValue | ArrayValue>({ required: true })

const { t } = useTrans({
  en: {
    ph: 'Select items'
  },
  ja: {
    ph: '項目を選択してください'
  }
})

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
  selected: model.value,
  options: props.options,
  onClick: handleSelect
}])

const selected = computed(() => {
  if (Array.isArray(model.value)) {
    return props.options.filter((o) => (model.value as ArrayValue).includes(o.value))
  }

  const item = props.options.find((o) => o.value === model.value)

  return item ?? null
})

const hasSelected = computed(() => {
  return Array.isArray(selected.value) ? selected.value.length > 0 : !!selected.value
})

const removable = computed(() => {
  if (Array.isArray(model.value)) {
    return props.nullable || (selected.value as Option[]).length > 1
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

  Array.isArray(model.value) ? handleArray(value) : handlePrimitive(value)
}

function handlePrimitive(value: OptionValue) {
  if (value !== model.value) {
    model.value = value
  } else if (props.nullable) {
    model.value = null
  }
}

function handleArray(value: OptionValue) {
  const difference = xor(model.value as ArrayValue, [value])

  if (!props.nullable && difference.length === 0) {
    return
  }

  model.value = difference
}
</script>

<template>
  <SInputBase
    class="SInputDropdown"
    :class="classes"
    :label
    :note
    :info
    :help
    :check-icon
    :check-text
    :check-color
    :validation
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
            :item="selected!"
            :size="size ?? 'small'"
            :removable
            :disabled="disabled ?? false"
            @remove="handleSelect"
          />

          <div v-else class="box-placeholder">{{ placeholder ?? t.ph }}</div>
        </div>

        <div class="box-icon">
          <IconCaretUp class="box-icon-svg up" />
          <IconCaretDown class="box-icon-svg down" />
        </div>
      </div>

      <div v-if="isOpen" class="dropdown" :class="props.position ?? position">
        <div class="dropdown-content">
          <SDropdown :sections="dropdownOptions" />
        </div>
      </div>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style scoped lang="postcss">
.container {
  position: relative;
  width: 100%;
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
  flex-grow: 1;
  max-width: 100%;
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

  &.top {
    bottom: calc(100% + 8px);

    :deep(.SDropdown) {
      transform: translateY(-100%);
    }
  }

  &.bottom {
    top: calc(100% + 8px);
  }
}

.dropdown-content {
  position: fixed;
}

.SInputDropdown.mini {
  .box {
    min-height: 32px;
  }

  .box-content {
    padding: 0 30px 0 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-mini-font-size));
  }

  .box-placeholder {
    padding-left: 10px;
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
    padding: 0 30px 0 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-small-font-size));
  }

  .box-placeholder {
    padding-left: 12px;
  }

  .box-icon {
    top: 7px;
    right: 8px;
  }
}

.SInputDropdown.medium {
  .box {
    min-height: 48px;
  }

  .box-content {
    padding: 0 40px 0 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-medium-font-size));
  }

  .box-placeholder {
    padding-left: 16px;
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
