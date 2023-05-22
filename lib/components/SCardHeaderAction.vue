<script setup lang="ts">
import { type IconifyIcon } from '@iconify/vue/dist/offline'
import SButton from './SButton.vue'

defineProps<{
  icon: IconifyIcon
  disabled?: boolean
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
      @click="$emit('click')"
    />
  </div>
</template>
