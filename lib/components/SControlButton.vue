<script setup lang="ts">
import { useControlSize } from '../composables/Control'
import SButton, { type Mode, type Tooltip, type Type } from './SButton.vue'

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
  tooltip?: string | Tooltip
}>()

defineEmits<{
  (e: 'click'): void
}>()

const size = useControlSize()
</script>

<template>
  <div class="SControlButton">
    <SButton
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
      block
      :loading="loading"
      :disabled="disabled"
      @click="$emit('click')"
    />
  </div>
</template>
