<script setup lang="ts">
import { computed, provide } from 'vue'
import { useCardBlockSize } from '../composables/Card'
import { type ControlSize, ControlWrapKey, provideControlSize } from '../composables/Control'
import { type Responsive, useResponsive } from '../composables/Layout'

export type { ControlSize as Size }

const props = withDefaults(defineProps<{
  size?: ControlSize
  wrap?: Responsive<boolean>
}>(), { wrap: undefined })

const wrap = useResponsive(() => props.wrap ?? { desktop: false, mobile: true })
provide(ControlWrapKey, wrap)

const cardSize = useCardBlockSize()

const sizeDict = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  xsmall: 'small',
  small: 'small',
  medium: 'small',
  large: 'medium',
  xlarge: 'medium',
  null: null
} as const

const _size = computed(() => {
  return props.size ?? sizeDict[cardSize.value ?? 'null'] ?? 'small'
})

const classes = computed(() => [
  _size.value,
  { wrap: wrap.value },
  cardSize.value ? `card-size-${cardSize.value}` : null
])

provideControlSize(_size)
</script>

<template>
  <div class="SControl" :class="classes">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SControl {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.SControl.xs { gap: 8px; height: 28px; }
.SControl.sm { gap: 8px; height: 32px; }
.SControl.md { gap: 8px; height: 36px; }
.SControl.lg { gap: 12px; height: 40px; }
.SControl.xl { gap: 16px; height: 48px; }

.SControl.small  { gap: 8px; height: 32px; }
.SControl.medium { gap: 12px; height: 40px; }
.SControl.wrap {
  flex-wrap: wrap;
  height: auto;
  min-width: 0;
  max-width: 100%;
}
</style>
