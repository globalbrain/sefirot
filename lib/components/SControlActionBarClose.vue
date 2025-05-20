<script setup lang="ts">
import IconX from '~icons/ph/x-bold'
import SControlActionBarButton from './SControlActionBarButton.vue'

defineProps<{
  as?: string
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <div class="SControlActionBarClose">
    <SControlActionBarButton
      :as
      :icon="IconX"
      @click="$emit('click')"
    />
  </div>
</template>
