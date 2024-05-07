<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div class="SLocalNavDescription">
    {{ text }}
  </div>
</template>

<style scoped lang="postcss">
.SLocalNavDescription {
  line-height: 24px;
  font-size: 14px;
  color: var(--c-text-2);
}
</style>
