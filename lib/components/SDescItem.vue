<script setup lang="ts">
import SGridItem from './SGridItem.vue'

defineProps<{
  span?: string | number
}>()
</script>

<template>
  <SGridItem class="SDescItem" :span="span">
    <slot />
  </SGridItem>
</template>
