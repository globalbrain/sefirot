<script setup lang="ts">
import SButton, { type Tooltip } from './SButton.vue'
import IconX from '~icons/ph/x-bold'

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
