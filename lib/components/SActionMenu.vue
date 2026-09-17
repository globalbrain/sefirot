<script setup lang="ts">
import { type Component, computed, ref, useTemplateRef } from 'vue'
import { type DropdownSection, useManualDropdownPosition } from '../composables/Dropdown'
import { useFlyout } from '../composables/Flyout'
import { useOverlayPosition, useOverlays } from '../composables/Overlays'
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

const { isOpen, toggle, close } = useFlyout(containerRef)
const { position: verticalPlacement, update: updateVerticalPlacement } =
  useManualDropdownPosition(containerRef)

const actualAlign = ref(props.dropdownAlign)
const managed = useOverlays()
const overlay = useOverlayPosition(containerRef, dropdownRef, { align: () => props.dropdownAlign })
const placement = computed(() => managed.value ? overlay.position.value : verticalPlacement.value)
const align = computed(() => managed.value ? overlay.align.value : actualAlign.value)

function onEscape(event: KeyboardEvent) {
  if (!managed.value || !isOpen.value || event.isComposing) { return }
  event.preventDefault()
  event.stopPropagation()
  close()
  containerRef.value?.querySelector<HTMLElement>('[role="button"]')?.focus()
}

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
    if (managed.value) {
      overlay.update()
    } else {
      updateVerticalPlacement()
      if (dropdownRef.value) {
        actualAlign.value = calculateOptimalAlign(dropdownRef.value)
      }
    }

    toggle()
  }
}
</script>

<template>
  <div ref="container" class="SActionMenu" :class="[{ block, managed }, align]" @keydown.esc="onEscape">
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
      :class="placement"
      :style="{ ...(managed ? overlay.inset.value : {}), display: isOpen ? 'block' : 'none' }"
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
.SActionMenu.managed .dropdown { position: fixed; }
</style>
