<script setup lang="ts">
import IconCaretDown from '~icons/ph/caret-down'
import IconCaretUp from '~icons/ph/caret-up'
import IconX from '~icons/ph/x'
import Fuse from 'fuse.js'
import xor from 'lodash-es/xor'
import { computed, nextTick, ref, watch } from 'vue'
import { type DropdownSectionFilter, useManualDropdownPosition } from '../composables/Dropdown'
import { useFlyout } from '../composables/Flyout'
import { useTrans } from '../composables/Lang'
import SAvatar from './SAvatar.vue'
import SDropdown from './SDropdown.vue'
import SInputBase, { type Props as BaseProps } from './SInputBase.vue'
import SInputDropdownItem from './SInputDropdownItem.vue'

export type { Color, Size } from './SInputBase.vue'
export interface Props extends BaseProps {
  placeholder?: string
  options: Option[]
  position?: 'top' | 'bottom'
  /** @deprecated use :search="false" */
  noSearch?: boolean
  nullable?: boolean
  closeOnClick?: boolean
  disabled?: boolean
  search?: boolean | 'inline'
}

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

const props = withDefaults(defineProps<Props>(), { search: true })

const model = defineModel<PrimitiveValue | ArrayValue>({ required: true })

const { t } = useTrans({
  en: {
    ph: 'Select items'
  },
  ja: {
    ph: '項目を選択してください'
  }
})

const container = ref<HTMLDivElement>()
const inlineInput = ref<HTMLInputElement>()
const inlineQuery = ref('')
const inlineActiveIndex = ref(-1)

const { isOpen, open } = useFlyout(container)
const { inset, update: updatePosition } = useManualDropdownPosition(container, () => props.position)

const isInlineSearch = computed(() => props.search === 'inline')

const classes = computed(() => [
  props.size ?? 'small',
  { disabled: props.disabled }
])

const inlineEnabledOptions = computed(() => {
  return props.options.filter((o) => !o.disabled)
})

const inlineFuse = computed(() => {
  return new Fuse(inlineEnabledOptions.value, { keys: ['label'] })
})

const inlineFilteredOptions = computed(() => {
  if (!isInlineSearch.value) {
    return inlineEnabledOptions.value
  }

  if (!inlineQuery.value) {
    return inlineEnabledOptions.value
  }

  return inlineFuse.value.search(inlineQuery.value).map((r) => r.item)
})

const inlineActiveOption = computed(() => {
  if (!isInlineSearch.value || inlineActiveIndex.value === -1) {
    return null
  }

  return inlineFilteredOptions.value[inlineActiveIndex.value] ?? null
})

const dropdownOptions = computed<DropdownSectionFilter[]>(() => [{
  type: 'filter',
  search: props.search === true && !props.noSearch ? true : isInlineSearch.value ? 'inline' : undefined,
  selected: model.value,
  options: isInlineSearch.value ? inlineFilteredOptions.value : props.options,
  active: inlineActiveOption.value?.value,
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

watch(inlineQuery, (value) => {
  if (!isInlineSearch.value) {
    return
  }

  if (!isOpen.value) {
    handleOpen()
  }

  inlineActiveIndex.value = value ? (inlineFilteredOptions.value.length ? 0 : -1) : -1
})

watch(inlineFilteredOptions, (options) => {
  if (!isInlineSearch.value) {
    return
  }

  if (!options.length) {
    inlineActiveIndex.value = -1
    return
  }

  if (inlineActiveIndex.value >= options.length) {
    inlineActiveIndex.value = options.length - 1
  }
})

async function handleOpen() {
  if (!props.disabled) {
    updatePosition()
    open()
  }
}

function handleBoxClick() {
  if (props.disabled) {
    return
  }

  if (isInlineSearch.value) {
    focusInlineInput()
  }

  handleOpen()
}

function handleBoxKeyOpen() {
  if (!isInlineSearch.value && !props.disabled) {
    handleOpen()
  }
}

function handleSelect(value: OptionValue) {
  props.validation?.$touch()

  Array.isArray(model.value) ? handleArray(value) : handlePrimitive(value)

  if (isInlineSearch.value) {
    resetInlineSearch()
  }
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

function handleInlineFocus() {
  if (props.disabled) {
    return
  }

  handleOpen()
  focusInlineInput()
}

function handleInlineKeydown(event: KeyboardEvent) {
  if (!isInlineSearch.value || props.disabled) {
    return
  }

  if (event.key === 'Tab' && event.shiftKey) {
    return
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    event.stopPropagation()
    handleOpen()
    moveInlineActive(1)
    return
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    event.stopPropagation()
    handleOpen()
    moveInlineActive(-1)
    return
  }

  if (event.key === 'Enter' || event.key === 'Tab' || event.key === ' ' || event.key === 'Spacebar') {
    const selected = selectInlineActive()

    if (selected) {
      event.preventDefault()
      event.stopPropagation()
    }

    return
  }

  if (
    event.key === 'Backspace'
    && !inlineQuery.value
    && removable.value
  ) {
    if (Array.isArray(model.value) && (model.value as ArrayValue).length) {
      const values = model.value as ArrayValue
      handleSelect(values[values.length - 1])
      event.preventDefault()
      return
    }

    if (!Array.isArray(model.value) && model.value) {
      handleSelect(model.value)
      event.preventDefault()
    }
  }
}

function moveInlineActive(delta: number) {
  const options = inlineFilteredOptions.value

  if (!options.length) {
    inlineActiveIndex.value = -1
    return
  }

  if (inlineActiveIndex.value === -1) {
    inlineActiveIndex.value = 0
    return
  }

  const next = inlineActiveIndex.value + delta
  const lastIndex = options.length - 1

  if (next > lastIndex) {
    inlineActiveIndex.value = 0
    return
  }

  if (next < 0) {
    inlineActiveIndex.value = lastIndex
    return
  }

  inlineActiveIndex.value = next
}

function selectInlineActive() {
  const options = inlineFilteredOptions.value
  const hasInlineValue = inlineQuery.value || inlineActiveIndex.value !== -1

  if (!options.length || !hasInlineValue) {
    return false
  }

  const index = inlineActiveIndex.value === -1 ? 0 : inlineActiveIndex.value
  const option = options[index]

  if (!option) {
    return false
  }

  handleSelect(option.value)

  return true
}

function resetInlineSearch() {
  inlineQuery.value = ''
  inlineActiveIndex.value = -1

  nextTick(() => {
    focusInlineInput()
  })
}

function focusInlineInput() {
  inlineInput.value?.focus()
}
</script>

<template>
  <SInputBase
    class="SInputDropdown"
    :class="classes"
    :size
    :label
    :note
    :info
    :help
    :check-icon
    :check-text
    :check-color
    :validation
    :hide-error
  >
    <div ref="container" class="container">
      <div
        class="box"
        :class="{ 'inline-search': isInlineSearch }"
        :role="isInlineSearch ? 'combobox' : 'button'"
        :tabindex="isInlineSearch ? undefined : 0"
        @click="handleBoxClick"
        @keydown.down.prevent
        @keyup.enter="handleBoxKeyOpen"
        @keyup.down="handleBoxKeyOpen"
      >
        <div class="box-content" :class="{ inline: isInlineSearch }">
          <template v-if="isInlineSearch">
            <template v-if="Array.isArray(selected)">
              <div
                v-for="(item, i) in selected"
                :key="item.value ?? i"
                class="inline-chip"
                :class="{ avatar: item.type === 'avatar' }"
              >
                <template v-if="item.type === 'avatar'">
                  <div class="inline-chip-avatar">
                    <SAvatar size="fill" :avatar="item.image" />
                  </div>
                  <div class="inline-chip-label">{{ item.label }}</div>
                </template>
                <template v-else>
                  <div class="inline-chip-label">{{ item.label }}</div>
                </template>
                <button
                  v-if="removable"
                  class="inline-chip-close"
                  :disabled="disabled ?? false"
                  @click.stop="handleSelect(item.value)"
                >
                  <IconX class="inline-chip-close-icon" />
                </button>
              </div>
            </template>
            <template v-else-if="selected">
              <div class="inline-chip" :class="{ avatar: selected.type === 'avatar' }">
                <template v-if="selected.type === 'avatar'">
                  <div class="inline-chip-avatar">
                    <SAvatar size="fill" :avatar="selected.image" />
                  </div>
                  <div class="inline-chip-label">{{ selected.label }}</div>
                </template>
                <template v-else>
                  <div class="inline-chip-label">{{ selected.label }}</div>
                </template>
                <button
                  v-if="removable"
                  class="inline-chip-close"
                  :disabled="disabled ?? false"
                  @click.stop="handleSelect(selected.value)"
                >
                  <IconX class="inline-chip-close-icon" />
                </button>
              </div>
            </template>

            <input
              ref="inlineInput"
              v-model="inlineQuery"
              class="inline-input"
              :placeholder="!hasSelected ? (placeholder ?? t.ph) : ''"
              :disabled="disabled ?? false"
              autocomplete="off"
              @focus="handleInlineFocus"
              @click.stop="handleInlineFocus"
              @keydown="handleInlineKeydown"
            >
          </template>

          <template v-else>
            <SInputDropdownItem
              v-if="hasSelected"
              :item="selected!"
              :size="size ?? 'small'"
              :removable
              :disabled="disabled ?? false"
              @remove="handleSelect"
            />

            <div v-else class="box-placeholder">{{ placeholder ?? t.ph }}</div>
          </template>
        </div>

        <div class="box-icon">
          <IconCaretUp class="box-icon-svg up" />
          <IconCaretDown class="box-icon-svg down" />
        </div>
      </div>

      <div v-if="isOpen" class="dropdown" :style="inset">
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
  background-color: var(--input-bg-color);
  cursor: pointer;
  transition: border-color 0.25s, background-color 0.25s;

  &.inline-search {
    cursor: text;
  }

  &:hover {
    border-color: var(--input-hover-border-color);
  }
}

.box-content {
  display: flex;
  align-items: center;
  flex-grow: 1;
  max-width: 100%;

  &.inline {
    flex-wrap: wrap;
    gap: 6px;
    cursor: text;
  }
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

.inline-input {
  flex: 1 0 120px;
  min-width: 80px;
  border: none;
  padding: 0;
  line-height: 24px;
  font-size: inherit;
  font-family: var(--input-value-font-family);
  background: transparent;
  color: var(--input-text);
  outline: none;

  &::placeholder {
    color: var(--input-placeholder-color);
  }

  &:disabled {
    cursor: not-allowed;
  }
}

.inline-chip {
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid var(--c-divider);
  border-radius: 12px;
  padding: 0 10px;
  height: 24px;
  background-color: var(--input-bg-color);

  &.avatar {
    gap: 6px;
    padding: 1px 8px 1px 1px;
  }
}

.inline-chip-avatar {
  width: 20px;
  height: 20px;
}

.inline-chip-label {
  line-height: 20px;
  font-size: 12px;
  font-weight: 400;
}

.inline-chip-close {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  color: var(--c-text-2);
  transition: color 0.25s;

  &:hover {
    color: var(--c-text-1);
  }

  &:disabled {
    color: var(--c-text-3);
    cursor: not-allowed;
  }
}

.inline-chip-close-icon {
  width: 16px;
  height: 16px;
}

.dropdown {
  position: fixed;
  z-index: var(--z-index-dropdown);
}

.SInputDropdown.sm,
.SInputDropdown.mini {
  .box {
    min-height: 32px;
  }

  .box-content {
    padding: 0 30px 0 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-mini-font-size));
  }

  .box-content.inline {
    padding-left: 10px;
  }

  .box-placeholder {
    padding-left: 10px;
  }

  .box-icon {
    top: 3px;
    right: 8px;
  }
}

.SInputDropdown.md {
  .box {
    min-height: 36px;
  }

  .box-content {
    padding: 0 30px 0 0;
    line-height: 24px;
    font-size: var(--input-font-size, 14px);
  }

  .box-content.inline {
    padding-left: 10px;
  }

  .box-placeholder {
    padding-left: 10px;
  }

  .box-icon {
    top: 5px;
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

  .box-content.inline {
    padding-left: 12px;
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

  .box-content.inline {
    padding-left: 16px;
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
