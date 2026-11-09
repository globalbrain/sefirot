<script setup lang="ts">
import { type Component, useTemplateRef } from 'vue'
import { type DropdownSection } from '../composables/Dropdown'
import { useDropdownPosition } from '../composables/DropdownPosition'
import { useFlyout } from '../composables/Flyout'
import SButton, { type Mode, type Size, type Tooltip, type Type } from './SButton.vue'
import SDropdown from './SDropdown.vue'

export type { Mode, Size, Tooltip, Type }

const props = withDefaults(defineProps<{
  tag?: Component | string
  size?: Size
  type?: Type
  mode?: Mode
  icon?: Component
  leadIcon?: Component
  trailIcon?: Component
  iconMode?: Mode
  label?: string
  labelMode?: Mode
  rounded?: boolean
  block?: boolean
  loading?: boolean
  disabled?: boolean
  tooltip?: string | Tooltip
  dropdownAlign?: 'left' | 'right'
  options: DropdownSection[]
}>(), {
  dropdownAlign: 'left'
})

const containerRef = useTemplateRef('container')
const dropdownRef = useTemplateRef('dropdown')

const { isOpen, toggle } = useFlyout(containerRef)
useDropdownPosition(containerRef, dropdownRef, isOpen, { align: () => props.dropdownAlign })

function onOpen() {
  if (!props.disabled) { toggle() }
}
</script>

<template>
  <div ref="container" class="SActionMenu" :class="{ block }">
    <div class="button">
      <SButton
        :tag
        :size
        :type
        :mode
        :icon
        :lead-icon
        :trail-icon
        :icon-mode
        :label
        :label-mode
        :rounded
        :block
        :loading
        :disabled
        :tooltip
        @click="onOpen"
      />
    </div>
    <div
      ref="dropdown"
      class="dropdown"
      :style="{ display: isOpen ? 'block' : 'none' }"
    >
      <SDropdown :sections="options" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SActionMenu {
  position: relative;
  display: inline-block;
}

.dropdown {
  position: fixed;
  z-index: var(--z-index-dropdown);

}

.SActionMenu.block {
  display: block;
}
</style>
