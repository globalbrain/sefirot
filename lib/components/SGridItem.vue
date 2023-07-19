<script setup lang="ts">
defineProps<{
  span?: string | number
}>()
</script>

<template>
  <div
    class="SGridItem"
    :style="{ gridColumn: span ? `span ${span}` : undefined }"
  >
    <slot />
  </div>
</template>
