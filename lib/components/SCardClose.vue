<script setup lang="ts">
import IconX from '~icons/ph/x'
import SButton from './SButton.vue'

defineEmits<{
  click: []
}>()
</script>

<template>
  <div class="SCardClose">
    <SButton
      size="sm"
      type="text"
      mode="mute"
      :icon="IconX"
      @click="$emit('click')"
    />
  </div>
</template>
