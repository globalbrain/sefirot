<script setup lang="ts">
import IconX from '@iconify-icons/ph/x-bold'
import SButton, { type Tooltip } from './SButton.vue'

defineProps<{
  disabled?: boolean
  tooltip?: string | Tooltip
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <div class="SCardHeaderActionClose">
    <SButton
      type="text"
      mode="mute"
      size="small"
      :icon="IconX"
      :disabled="disabled"
      :tooltip="tooltip"
      @click="$emit('click')"
    />
  </div>
</template>
