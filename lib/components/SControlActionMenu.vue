<script setup lang="ts">
import { type Component } from 'vue'
import { useControlSize } from '../composables/Control'
import { type DropdownSection } from '../composables/Dropdown'
import SActionMenu, { type Mode, type Tooltip, type Type } from './SActionMenu.vue'

defineProps<{
  tag?: string
  type?: Type
  mode?: Mode
  icon?: Component
  leadIcon?: Component
  trailIcon?: Component
  iconMode?: Mode
  label?: string
  labelMode?: Mode
  href?: string
  loading?: boolean
  disabled?: boolean
  tooltip?: string | Tooltip
  options: DropdownSection[]
}>()

const size = useControlSize()
</script>

<template>
  <div class="SControlActionMenu">
    <SActionMenu
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
      :href
      :tooltip
      :options
      block
      :loading
      :disabled
    />
  </div>
</template>
