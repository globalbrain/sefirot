<script setup lang="ts">
import { computed } from 'vue'
import { type CardBlockSize, provideCardBlockSize } from '../composables/Card'

export type { CardBlockSize as Size }

export type Bg =
  | 'elv-1'
  | 'elv-2'
  | 'elv-3'
  | 'elv-4'
  | 'none'

// @deprecated Use CSS utility classes instead.
export type Space = 'compact' | 'wide' | 'xwide'

const props = withDefaults(defineProps<{
  size?: CardBlockSize
  bg?: Bg

  // @deprecated Use CSS utility classes instead.
  space?: Space
}>(), {
  bg: 'elv-3'
})

const _bg = computed(() => {
  return props.bg !== 'none' ? `s-bg-${props.bg}` : null
})

provideCardBlockSize(computed(() => props.size ?? null))
</script>

<template>
  <div class="SCardBlock" :class="[size, _bg]">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SCardBlock {
  &.compact { padding: 12px; }
  &.wide    { padding: 16px; }
  &.xwide   { padding: 24px; }
}

.SCard > .SCardBlock:first-child {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.SCard > .SCardBlock:last-child {
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}

.SCardBlock.xsmall,
.SCardBlock.small,
.SCardBlock.medium,
.SCardBlock.large,
.SCardBlock.xlarge {
  display: flex;
  align-items: center;
  width: 100%;
}

.SCardBlock.xsmall { height: 40px; }
.SCardBlock.small  { height: 48px; }
.SCardBlock.medium { height: 56px; }
.SCardBlock.large  { height: 64px; }
.SCardBlock.xlarge { height: 80px; }
</style>
