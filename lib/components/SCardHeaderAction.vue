<script setup lang="ts">
import { type Component } from 'vue'
import SButton, { type Tooltip } from './SButton.vue'

defineProps<{
  icon: Component
  disabled?: boolean
  tooltip?: string | Tooltip
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <div class="SCardHeaderAction">
    <SButton
      type="text"
      mode="mute"
      size="small"
      :icon="icon"
      :disabled="disabled"
      :tooltip="tooltip"
      @click="$emit('click')"
    />
  </div>
</template>
