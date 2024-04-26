<script setup lang="ts">
import SButton, { type Mode, type Tooltip } from './SButton.vue'

defineProps<{
  mode?: Mode
  label?: string
  labelMode?: Mode
  loading?: boolean
  disabled?: boolean
  tooltip?: string | Tooltip
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <div class="SCardFooterAction">
    <SButton
      size="medium"
      :mode="mode"
      :label="label"
      :label-mode="labelMode"
      :loading="loading"
      :disabled="disabled"
      :tooltip="tooltip"
      @click="$emit('click')"
    />
  </div>
</template>
