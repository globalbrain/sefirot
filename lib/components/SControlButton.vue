<script setup lang="ts">
import { type Component } from 'vue'
import { useControlSize } from '../composables/Control'
import SButton, { type Mode, type Tooltip, type Type } from './SButton.vue'

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
}>()

defineEmits<{
  click: []
}>()

const size = useControlSize()
</script>

<template>
  <div class="SControlButton">
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
      :href
      :tooltip
      block
      :loading
      :disabled
      @click="$emit('click')"
    />
  </div>
</template>
