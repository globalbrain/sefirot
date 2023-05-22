<script setup lang="ts">
export type Space = 'compact' | 'wide'

defineProps<{
  space?: Space
}>()
</script>

<template>
  <div class="SCardBlock" :class="[space]">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SCardBlock {
  padding: var(--card-padding, 0);
  background-color: var(--c-bg-elv-3);

  &.compact { padding: 24px; }
  &.wide    { padding: 48px; }
}

.SCard > .SCardBlock:first-child {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.SCard > .SCardBlock:last-child {
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}
</style>
