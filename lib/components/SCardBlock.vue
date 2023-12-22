<script setup lang="ts">
import { computed } from 'vue'
import { type CardBlockSize, provideCardBlockSize } from '../composables/Card'

export type { CardBlockSize as Size }

// @deprecated Use `Size` instead.
export type Space = 'compact' | 'wide' | 'xwide'

const props = defineProps<{
  size?: CardBlockSize

  // @deprecated Use `:size` from instead.
  space?: Space
}>()

const spaceToSizeDict = {
  compact: 'medium',
  wide: 'large',
  xwide: 'xlarge',
  null: null
}

const classes = computed(() => [
  props.size ?? spaceToSizeDict[props.space ?? 'null'] ?? null
])

provideCardBlockSize(computed(() => props.size ?? null))
</script>

<template>
  <div class="SCardBlock" :class="classes">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SCardBlock {
  background-color: var(--c-bg-elv-3);

  &.xsmall { padding: 12px; }
  &.small  { padding: 16px; }
  &.medium { padding: 24px; }
  &.large  { padding: 32px; }
  &.xlarge { padding: 48px; }
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
