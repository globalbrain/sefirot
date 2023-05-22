<script setup lang="ts">
import SButton, { type Mode } from './SButton.vue'

defineProps<{
  mode?: Mode
  label?: string
  labelMode?: Mode
  loading?: boolean
  disabled?: boolean
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
      @click="$emit('click')"
    />
  </div>
</template>
