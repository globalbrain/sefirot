<script setup lang="ts">
import { type Component } from 'vue'
import { useControlSize } from '../composables/Control'
import SButton, { type Tooltip } from './SButton.vue'

defineProps<{
  as?: string
  icon?: Component
  href?: string
  disabled?: boolean
  tooltip?: string | Tooltip
}>()

defineEmits<{
  click: []
}>()

const size = useControlSize()
</script>

<template>
  <div class="SControlActionBarButton">
    <SButton
      :tag="as"
      type="text"
      mode="mute"
      :size
      :icon
      :href
      block
      :disabled
      :tooltip
      @click="$emit('click')"
    />
  </div>
</template>
