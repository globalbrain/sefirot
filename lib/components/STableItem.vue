<script setup lang="ts">
defineProps<{
  name: string
  className?: string
  width?: string
}>()
</script>

<template>
  <div
    class="STableItem"
    :class="[
      className,
      `col-${name}`,
      { adjusted: width },
      { auto: width === 'auto' }
    ]"
  >
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.STableItem {
  position: var(--table-col-position, relative);
  left: 0;
  z-index: var(--table-col-z-index, auto);
  flex-shrink: 0;
  flex-grow: 1;
  border-right: 1px solid var(--c-divider-light);
  min-width: var(--table-col-width);
  max-width: var(--table-col-width);

  &:last-child {
    border-right: 0;
  }

  &.adjusted {
    width: v-bind(width) !important;
    max-width: v-bind(width) !important;
  }

  &.adjusted:not(.auto) {
    min-width: v-bind(width) !important;
  }
}
</style>
