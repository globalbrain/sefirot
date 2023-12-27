<script setup lang="ts">
import { useControlSize } from '../composables/Control'
import { type DropdownSection } from '../composables/Dropdown'
import SActionMenu, { type Mode, type Tooltip, type Type } from './SActionMenu.vue'

defineProps<{
  tag?: string
  type?: Type
  mode?: Mode
  icon?: any
  iconMode?: Mode
  label?: string
  labelMode?: Mode
  href?: string
  loading?: boolean
  disabled?: boolean
  tooltip?: Tooltip
  options: DropdownSection[]
}>()

const size = useControlSize()
</script>

<template>
  <div class="SControlActionMenu">
    <SActionMenu
      :tag="tag"
      :size="size"
      :type="type"
      :mode="mode"
      :icon="icon"
      :icon-mode="iconMode"
      :label="label"
      :label-mode="labelMode"
      :href="href"
      :tooltip="tooltip"
      :options="options"
      block
      :loading="loading"
      :disabled="disabled"
    />
  </div>
</template>
