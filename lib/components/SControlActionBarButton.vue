<script setup lang="ts">
import { useControlSize } from '../composables/Control'
import SButton, { type Tooltip } from './SButton.vue'

defineProps<{
  as?: string
  icon?: any
  href?: string
  disabled?: boolean
  tooltip?: string | Tooltip
}>()

defineEmits<{
  (e: 'click'): void
}>()

const size = useControlSize()
</script>

<template>
  <div class="SControlActionBarButton">
    <SButton
      :tag="as"
      type="text"
      mode="mute"
      :size="size"
      :icon="icon"
      :href="href"
      block
      :disabled="disabled"
      :tooltip="tooltip"
      @click="$emit('click')"
    />
  </div>
</template>
