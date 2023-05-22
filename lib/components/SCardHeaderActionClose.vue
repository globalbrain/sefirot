<script setup lang="ts">
import IconX from '@iconify-icons/ph/x-bold'
import SButton from './SButton.vue'

defineProps<{
  disabled?: boolean
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
      @click="$emit('click')"
    />
  </div>
</template>
