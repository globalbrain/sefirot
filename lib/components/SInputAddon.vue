<script setup lang="ts">
import IconCaretDown from '~icons/ph/caret-down-bold'
import { type Component, computed, ref } from 'vue'
import {
  type DropdownSection,
  getSelectedOption
} from '../composables/Dropdown'
import { useDropdownPosition } from '../composables/DropdownPosition'
import { useFlyout } from '../composables/Flyout'
import SDropdown from './SDropdown.vue'

export interface Props {
  label?: Component | string
  clickable?: boolean
  dropdown?: DropdownSection[]
  dropdownCaret?: boolean
  dropdownPosition?: 'top' | 'bottom'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  clickable: true,
  dropdown: () => [],
  dropdownCaret: true
})

const emit = defineEmits<{
  click: []
}>()

const container = ref<any>(null)

const isFocused = ref(false)

const classes = computed(() => [
  { clickable: props.clickable },
  { focused: isFocused.value },
  { disabled: props.disabled }
])

const selectedOptionLabel = computed(() => {
  return getSelectedOption(props.dropdown)?.label ?? null
})

const { isOpen, open } = useFlyout(container)
const dialog = ref<HTMLElement>()
useDropdownPosition(container, dialog, isOpen, { position: () => props.dropdownPosition })

function onFocus() {
  if (!props.disabled) {
    isFocused.value = true
  }
}

function onBlur() {
  if (!props.disabled) {
    isFocused.value = false
  }
}

function onClickButton() {
  if (!props.disabled) {
    emit('click')

    if (props.dropdown.length) {
      open()
    }
  }
}
</script>

<template>
  <div ref="container" class="SInputAddon" :class="classes" @click.stop>
    <component
      :is="clickable ? 'button' : 'div'"
      class="action"
      :disabled="clickable ? props.disabled : null"
      @focus="onFocus"
      @blur="onBlur"
      @click="onClickButton"
    >
      <span class="action-label">
        <component
          :is="props.label"
          v-if="props.label && (typeof props.label !== 'string')"
          class="action-icon"
        />
        <span v-else>
          {{ props.label ?? selectedOptionLabel }}
        </span>
      </span>

      <IconCaretDown
        v-if="props.dropdown.length && props.dropdownCaret"
        class="caret"
      />
    </component>

    <div v-if="isOpen" ref="dialog" class="dialog">
      <SDropdown :sections="dropdown" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SInputAddon {
  position: relative;
}

.action {
  display: flex;
  align-items: center;
  height: 100%;
  background-color: var(--button-fill-mute-bg-color);
  transition: background-color 0.25s;

  .SInputAddon.clickable &:hover,
  .SInputAddon.clickable.focused & {
    background-color: var(--button-fill-mute-hover-bg-color);
  }

  .SInputAddon.clickable &:active {
    background-color: var(--button-fill-mute-active-bg-color);
  }

  .SInputAddon.disabled &,
  .SInputAddon.disabled.clickable &:hover,
  .SInputAddon.disabled.clickable &:active,
  .SInputAddon.disabled.clickable.focused & {
    background-color: var(--button-fill-mute-bg-color);
    cursor: not-allowed;
  }
}

.dialog {
  position: fixed;
  z-index: var(--z-index-dropdown);

}
</style>
