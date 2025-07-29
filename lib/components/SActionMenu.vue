<script setup lang="ts">
import { type Component, ref } from 'vue'
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

const container = ref<any>(null)

const { isOpen, toggle } = useFlyout(container)
const { position, update: updatePosition } = useManualDropdownPosition(container)

async function onOpen() {
  if (!props.disabled) {
    updatePosition()
    toggle()
  }
}
</script>

<template>
  <div class="SActionMenu" :class="[{ block }, dropdownAlign]" ref="container">
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
    <div v-if="isOpen" class="dropdown" :class="position">
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
