<script setup lang="ts">
import { type Component, ref, useTemplateRef } from 'vue'
import { type DropdownSection, useManualDropdownPosition } from '../composables/Dropdown'
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
const { position: verticalPlacement, update: updateVerticalPlacement }
  = useManualDropdownPosition(containerRef)

const actualAlign = ref(props.dropdownAlign)

function calculateOptimalAlign(dropdownElement: HTMLElement): 'left' | 'right' {
  // Temporarily show the dropdown to measure it (similar to tooltip approach)
  const originalDisplay = dropdownElement.style.display
  dropdownElement.style.display = 'block'
  const dropdownRect = dropdownElement.getBoundingClientRect()
  dropdownElement.style.display = originalDisplay

  const dropdownWidth = dropdownRect.width

  const viewportWidth = window.innerWidth
  const containerRect = containerRef.value!.getBoundingClientRect()

  const spaceOnRight = viewportWidth - containerRect.left
  const spaceOnLeft = containerRect.right

  if (props.dropdownAlign === 'left') {
    return spaceOnRight >= dropdownWidth ? 'left' : 'right'
  }

  return spaceOnLeft >= dropdownWidth ? 'right' : 'left'
}

async function onOpen() {
  if (!props.disabled) {
    updateVerticalPlacement()

    if (dropdownRef.value) {
      actualAlign.value = calculateOptimalAlign(dropdownRef.value)
    }

    toggle()
  }
}
</script>

<template>
  <div class="SActionMenu" :class="[{ block }, actualAlign]" ref="container">
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
      class="dropdown"
      :class="verticalPlacement"
      :style="{ display: isOpen ? 'block' : 'none' }"
      ref="dropdown"
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
  position: absolute;
  z-index: var(--z-index-dropdown);

  &.top    { bottom: calc(100% + 8px); }
  &.bottom { top: calc(100% + 8px); }
}

.SActionMenu.block {
  display: block;
}

.SActionMenu.left .dropdown  { left: 0; }
.SActionMenu.right .dropdown { right: 0; }
</style>
