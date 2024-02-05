<script setup lang="ts">
import { useControlSize } from '../composables/Control'
import SButton from './SButton.vue'

defineProps<{
  as?: string
  icon?: any
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
      block
      @click="$emit('click')"
    />
  </div>
</template>
