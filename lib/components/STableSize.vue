<script setup lang="ts">
defineProps<{
  name: string
  width?: string
}>()
</script>

<template>
  <col
    class="STableSize"
    :class="[`col-${name}`, { adjusted: width }]"
  >
</template>

<style scoped lang="postcss">
.STableSize {
  width: var(--table-col-max-width, var(--table-col-width));
  min-width: var(--table-col-width);

  &.adjusted {
    width: v-bind(width) !important;
    min-width: v-bind(width) !important;
    max-width: v-bind(width) !important;
  }
}
</style>
