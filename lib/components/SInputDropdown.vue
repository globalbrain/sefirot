<script setup lang="ts" generic="T = any">
import IconCaretDown from '~icons/ph/caret-down'
import IconCaretUp from '~icons/ph/caret-up'
import xor from 'lodash-es/xor'
import { computed, ref } from 'vue'
import { type DropdownSectionFilter, useManualDropdownPosition } from '../composables/Dropdown'
import { useFlyout } from '../composables/Flyout'
import { useTrans } from '../composables/Lang'
import { type Option } from '../support/InputDropdown'
import SDropdown from './SDropdown.vue'
import SInputBase, { type Props as BaseProps } from './SInputBase.vue'
import SInputDropdownItem from './SInputDropdownItem.vue'

export interface Props<T = any> extends BaseProps {
  placeholder?: string
  options: Option<T>[]
  position?: 'top' | 'bottom'
  noSearch?: boolean
  nullable?: boolean
  closeOnClick?: boolean
  disabled?: boolean
}

const props = defineProps<Props<T>>()

// Single- vs multi-select is inferred from the bound model at runtime: an array
// model selects multiple values, anything else a single value (or `null`) — so no
// `multiple` prop is needed (unlike SInputAsyncDropdown).
const model = defineModel<T | T[] | null>({ required: true })

const { t } = useTrans({
  en: {
    ph: 'Select items'
  },
  ja: {
    ph: '項目を選択してください'
  }
})

const container = ref<HTMLDivElement>()
const box = ref<HTMLDivElement>()

const { isOpen, open, close } = useFlyout(container)
const { inset, update: updatePosition } = useManualDropdownPosition(
  container,
  () => props.position
)

const classes = computed(() => [
  props.size ?? 'small',
  { disabled: props.disabled }
])

const dropdownOptions = computed<DropdownSectionFilter[]>(() => [{
  type: 'filter',
  search: props.noSearch === undefined ? true : !props.noSearch,
  selected: model.value,
  options: props.options,
  onClick: onSelect
}])

const selected = computed<Option<T> | Option<T>[] | null>(() => {
  if (Array.isArray(model.value)) {
    return props.options.filter((o) => (model.value as T[]).includes(o.value))
  }

  return props.options.find((o) => o.value === model.value) ?? null
})

const hasSelected = computed(() => {
  return Array.isArray(selected.value) ? selected.value.length > 0 : !!selected.value
})

const removable = computed(() => {
  if (Array.isArray(model.value)) {
    return !!props.nullable || (selected.value as Option<T>[]).length > 1
  }

  return !!props.nullable
})

async function onOpen() {
  if (!props.disabled) {
    updatePosition()
    open()
  }
}

// Clicking (or Enter on — see onEnterToggle) the box toggles the flyout —
// closing returns focus to the box so keyboard interaction continues from the
// control instead of falling to `document.body`. ArrowDown stays open-only.
function onToggle() {
  if (isOpen.value) {
    close()
    box.value?.focus()
    return
  }
  onOpen()
}

// Bare Enter toggles on keydown, not keyup: a Cmd/Ctrl+Enter submit (handled
// on keydown by an enclosing editor) sheds its modifier before the Enter keyup
// when the modifier is released first, and that keyup must not reopen the
// flyout — acting on keydown sidesteps release order entirely. Key repeat is
// ignored so holding Enter doesn't flap the flyout.
function onEnterToggle(event: KeyboardEvent) {
  if (!event.repeat) {
    onToggle()
  }
}

// Escape while the flyout is open belongs to the flyout: close it and return
// focus to the box, keeping the keydown from an enclosing surface (an inline
// editor would cancel, a sheet would close). A closed dropdown leaves Escape
// to those surfaces. The Escape that cancels an IME composition never
// operates the flyout.
function onEscapeKeydown(event: KeyboardEvent) {
  if (!isOpen.value || event.isComposing) {
    return
  }
  event.stopPropagation()
  event.preventDefault()
  close()
  box.value?.focus()
}

function onSelect(value: T) {
  props.validation?.$touch()

  if (Array.isArray(model.value)) {
    const toggled = xor(model.value as T[], [value])
    if (toggled.length !== 0 || props.nullable) {
      model.value = toggled
    }
  } else if (value !== model.value) {
    model.value = value
  } else if (props.nullable) {
    model.value = null
  }

  // Return focus to the box on a selection that closes the flyout, so
  // keyboard interaction (reopening, an editor's submit shortcut) continues
  // from the control rather than falling to `document.body`.
  if (props.closeOnClick) {
    close()
    box.value?.focus()
  }
}
</script>

<template>
  <SInputBase
    class="SInputDropdown"
    :class="classes"
    :size
    :name
    :label
    :note
    :info
    :help
    :check-icon
    :check-text
    :check-color
    :validation
    :warning
    :hide-error
    :hide-warning
  >
    <div ref="container" class="container" @keydown.esc="onEscapeKeydown">
      <div
        ref="box"
        class="box"
        role="button"
        tabindex="0"
        @click="onToggle"
        @keydown.down.prevent
        @keydown.enter.exact="onEnterToggle"
        @keyup.down="onOpen"
      >
        <div class="box-content">
          <SInputDropdownItem
            v-if="hasSelected"
            :item="selected!"
            :size="size ?? 'small'"
            :removable
            :disabled="disabled ?? false"
            @remove="onSelect"
          />

          <div v-else class="box-placeholder">{{ placeholder ?? t.ph }}</div>
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
  border-radius: 8px;
  width: 100%;
  color: var(--input-text);
  background-color: var(--input-bg-color);
  box-shadow: var(--input-box-shadow);
  cursor: pointer;
  transition: border-color 0.25s, background-color 0.25s;

  &:hover {
    border-color: var(--input-hover-border-color);
  }

  /* Keyboard focus shows via the border (the input-family idiom), not the
     UA's default ring. */
  &:focus-visible {
    outline: none;
    border-color: var(--input-focus-border-color);
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
