<script setup lang="ts">
import type { DefineComponent } from 'vue'

defineProps<{
  comp: DefineComponent
}>()
</script>

<template>
  <Component :is="comp" />
</template>
