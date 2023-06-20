<script setup lang="ts">
import { type Component } from 'vue'

defineProps<{
  comp: Component
  props?: Record<string, any>
}>()
</script>

<template>
  <component :is="comp" v-bind="props" />
</template>
