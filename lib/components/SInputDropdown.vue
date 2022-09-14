<template>
  <SInputBase
    class="SInputDropdown"
    :class="classes"
    :label="label"
    :note="note"
    :help="help"
    :validation="validation"
  >
    <div ref="container" class="SInputDropdown-container">
      <div
        class="SInputDropdown-box"
        role="button"
        tabindex="0"
        @click="handleOpen"
        @keydown.down.prevent
        @keyup.enter="handleOpen"
        @keyup.down="handleOpen"
      >
        <div class="SInputDropdown-box-content">
          <SInputDropdownItem
            v-if="hasSelected"
            :item="selected"
            :disabled="disabled"
            @remove="handleCallback"
          />

          <span v-else class="SInputDropdown-box-placeholder">{{ placeholder }}</span>
        </div>

        <div class="SInputDropdown-box-icon">
          <SIconChevronUp class="SInputDropdown-box-icon-svg up" />
          <SIconChevronDown class="SInputDropdown-box-icon-svg down" />
        </div>
      </div>

      <div v-if="isOpen" class="SInputDropdown-dropdown">
        <SDropdown :options="dropdownOptions" @close="close" />
      </div>
    </div>
  </SInputBase>
</template>

<script setup lang="ts">
import { PropType, computed, nextTick } from 'vue'
import isEqual from 'lodash-es/isEqual'
import { Search, Item, UseDropdownSearchOptions, useDropdown } from '../composables/Dropdown'
import { useFlyout } from '../composables/Flyout'
import { isNullish, isArray } from '../support/Utils'
import SDropdown from './SDropdown.vue'
import SInputBase from './SInputBase.vue'
import SInputDropdownItem from './SInputDropdownItem.vue'
import SIconChevronDown from './icons/SIconChevronDown.vue'
import SIconChevronUp from './icons/SIconChevronUp.vue'

type Size = 'mini' | 'small' | 'medium'
type Value = string | number | boolean | unknown[]

const props = defineProps({
  size: { type: String as PropType<Size>, default: 'small' },
  label: { type: String, default: null },
  note: { type: String, default: null },
  help: { type: String, default: null },
  placeholder: { type: String, default: null },
  search: { type: [Boolean, Object] as PropType<boolean | Search>, default: false },
  options: { type: Array as PropType<Item[]>, required: true },
  nullable: { type: Boolean, default: true },
  closeOnClick: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  modelValue: { type: [String, Number, Boolean, Array, Object] as PropType<Value>, default: null },
  validation: { type: Object as PropType<any>, default: null }
})

const emit = defineEmits(['update:modelValue'])

const { container, isOpen, open, close } = useFlyout()

const classes = computed(() => [
  props.size,
  { disabled: props.disabled }
])

const enabledItems = computed(() => {
  return props.options.filter(option => !option.disabled)
})

const dropdownOptions = useDropdown({
  search: createDropdownSearchOptions(),
  items: enabledItems,
  closeOnClick: props.closeOnClick,
  selected: computed(() => props.modelValue),
  callback: handleCallback
})

const selected = computed(() => {
  return isArray(props.modelValue)
    ? props.options.filter(o => (props.modelValue as unknown[]).includes(o.value))
    : props.options.find(o => isEqual(o.value, props.modelValue))
})

const hasSelected = computed(() => {
  return isArray(selected.value)
    ? selected.value.length > 0
    : !isNullish(selected.value) && selected.value.value !== ''
})

function createDropdownSearchOptions(): UseDropdownSearchOptions | undefined {
  if (props.search === false) {
    return undefined
  }

  if (props.search === true) {
    return {
      placeholder: 'Search items',
      missing: 'No items found.'
    }
  }

  return props.search
}

async function handleOpen(): Promise<void> {
  if (!props.disabled) {
    open()

    await nextTick()

    const el = document.querySelector<HTMLInputElement>('.SInputDropdown .SDropdown .search .SInputText input')

    el && el.focus()
  }
}

function handleCallback(item: Item): void {
  props.validation && props.validation.$touch()

  isArray(props.modelValue) ? handleArray(item.value) : handlePrimitive(item.value)
}

function handlePrimitive(value: unknown): void {
  if (!isEqual(props.modelValue, value)) {
    emit('update:modelValue', value)

    return
  }

  if (props.nullable) {
    emit('update:modelValue', null)
  }
}

function handleArray(value: unknown[]): void {
  const difference = getDifference(props.modelValue as unknown[], value)

  if (!props.nullable && difference.length === 0) {
    return
  }

  emit('update:modelValue', difference)
}

function getDifference(source: unknown[], value: unknown[]): unknown[] {
  return source
    .filter(item => !isEqual(item, value))
    .concat(source.includes(value) ? [] : [value])
}
</script>

<style lang="postcss" scoped>
.SInputDropdown.mini {
  .SInputDropdown-box {
    min-height: 32px;
  }

  .SInputDropdown-box-content {
    padding: 3px 30px 3px 12px;
    line-height: 24px;
    font-size: 14px;
  }

  .SInputDropdown-box-icon {
    top: 3px;
    right: 8px;
  }
}

.SInputDropdown.small {
  .SInputDropdown-box {
    min-height: 40px;
  }

  .SInputDropdown-box-content {
    padding: 7px 30px 7px 12px;
    line-height: 24px;
    font-size: 14px;
  }

  .SInputDropdown-box-icon {
    top: 7px;
    right: 8px;
  }
}

.SInputDropdown.medium {
  .SInputDropdown-box {
    height: 48px;
  }

  .SInputDropdown-box-content {
    padding: 11px 44px 11px 16px;
    line-height: 24px;
    font-size: 16px;
  }

  .SInputDropdown-box-icon {
    top: 11px;
    right: 12px;
  }
}

.SInputDropdown.disabled {
  .SInputDropdown-box {
    background-color: var(--input-disabled-bg);
    cursor: not-allowed;

    &:hover                     { border-color: var(--input-outlined-border); }
    &:focus:not(:focus-visible) { border-color: var(--input-outlined-border); }
  }

  .SInputDropdown-box-icon {
    cursor: not-allowed;
  }
}

.SInputSelect.has-error {
  .select {
    border-color: var(--c-danger);
  }
}

.SInputDropdown-container {
  position: relative;
}

.SInputDropdown-box {
  position: relative;
  border: 1px solid var(--input-border);
  border-radius: 4px;
  width: 100%;
  color: var(--input-text);
  cursor: pointer;
  transition: border-color .25s, background-color .25s;

  &:hover {
    border-color: var(--input-focus-border);
  }

  &:focus {
    border-color: var(--input-focus-border);
    outline: 0;
  }

}

.SInputDropdown-box-placeholder {
  font-weight: 500;
  color: var(--input-placeholder);
}

.SInputDropdown-box-icon {
  position: absolute;
  z-index: 10;
  cursor: pointer;
}

.SInputDropdown-box-icon-svg {
  display: block;
  width: 14px;
  height: 14px;
  fill: var(--input-placeholder);
}

.SInputDropdown-box-icon-svg.up {
  margin-bottom: -4px;
}

.SInputDropdown-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: var(--z-index-dropdown);
}
</style>
