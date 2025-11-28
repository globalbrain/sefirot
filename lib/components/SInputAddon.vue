<script setup lang="ts">
import IconCaretDown from '~icons/ph/caret-down-bold'
import { type Component, computed, ref } from 'vue'
import {
  type DropdownSection,
  getSelectedOption,
  useManualDropdownPosition
} from '../composables/Dropdown'
import { useFlyout } from '../composables/Flyout'
import SDropdown from './SDropdown.vue'

const props = withDefaults(defineProps<{
  label?: Component | string
  clickable?: boolean
  dropdown?: DropdownSection[]
  dropdownCaret?: boolean
  dropdowpPosition?: 'top' | 'bottom'
  disabled?: boolean
}>(), {
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
const { position, update: updatePosition } = useManualDropdownPosition(container)

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
      updatePosition()
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

    <div v-if="isOpen" class="dialog" :class="position">
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
  position: absolute;
  z-index: var(--z-index-dropdown);

  &.top    { bottom: calc(100% + 8px); }
  &.bottom { top: calc(100% + 8px); }
}
</style>
