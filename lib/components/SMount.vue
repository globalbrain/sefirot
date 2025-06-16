<script setup lang="ts">
import { type Component, onMounted, ref } from 'vue'

defineProps<{
  tag?: string | Component
}>()

const mount = ref(true)

onMounted(() => {
  setTimeout(() => { mount.value = false }, 100)
})
</script>

<template>
  <component :is="tag ?? 'div'" class="SMount mount-active" :class="{ mount }">
    <slot />
  </component>
</template>
