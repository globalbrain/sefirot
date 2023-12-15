<script setup lang="ts">
export type Space = 'compact' | 'wide' | 'xwide'

defineProps<{
  space?: Space
}>()
</script>

<template>
  <div class="SCardFooter" :class="[space ?? 'compact']">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SCardFooter {
  display: flex;
  align-items: center;
  border-radius: 0 0 5px 5px;
  background-color: var(--c-bg-elv-3);
}
</style>
