<script setup lang="ts">
defineProps<{
  height: string
}>()
</script>

<template>
  <div class="SChart" :style="{ height }">
    <slot />
  </div>
</template>
