<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  className?: string
  width?: string
}>()

const classes = computed(() => [
  'STableItem',
  props.className,
  `col-${props.name}`,
  { adjusted: !!props.width },
  { auto: props.width === 'auto' }
])
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.STableItem {
  position: var(--table-col-position, relative);
  left: var(--table-col-left, 0px);
  right: var(--table-col-right, auto);
  z-index: var(--table-col-z-index, auto);
  flex-shrink: 0;
  flex-grow: 1;
  border-left: var(--table-col-border-left, 0px) solid var(--c-gutter);
  border-right: 1px solid var(--c-gutter);
  margin-left: calc(var(--table-col-border-left, 0px) * -1);
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
