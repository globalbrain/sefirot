<script setup lang="ts">
import IconX from '~icons/ph/x-bold'
import SControlActionBarButton from './SControlActionBarButton.vue'

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
