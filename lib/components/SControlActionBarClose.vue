<script setup lang="ts">
import SControlActionBarButton from './SControlActionBarButton.vue'
import IconX from '~icons/ph/x-bold'

defineProps<{
  as?: string
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <div class="SControlActionBarClose">
    <SControlActionBarButton
      :as="as"
      :icon="IconX"
      @click="$emit('click')"
    />
  </div>
</template>
