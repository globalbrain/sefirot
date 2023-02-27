<script setup lang="ts">
import { DefineComponent } from 'vue'

defineProps<{
  comp: DefineComponent
}>()
</script>

<template>
  <Component :is="comp" />
</template>
