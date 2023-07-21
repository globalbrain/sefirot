<script setup lang="ts">
import SGrid from './SGrid.vue'

defineProps<{
  cols?: string | number
  gap?: string | number
}>()
</script>

<template>
  <SGrid class="SDesc" :cols="cols" :gap="gap">
    <slot />
  </SGrid>
</template>
