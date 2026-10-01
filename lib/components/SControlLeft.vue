<script setup lang="ts">
import { provideControlPosition, useControlWrap } from '../composables/Control'

const wrap = useControlWrap()

provideControlPosition('left')
</script>

<template>
  <div class="SControlLeft" :class="{ wrap }">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SControlLeft {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
}

.SControl.xs .SControlLeft { gap: 8px; height: 28px; }
.SControl.sm .SControlLeft { gap: 8px; height: 32px; }
.SControl.md .SControlLeft { gap: 8px; height: 36px; }
.SControl.lg .SControlLeft { gap: 12px; height: 40px; }
.SControl.xl .SControlLeft { gap: 16px; height: 48px; }

.SControl.small .SControlLeft  { gap: 8px; }
.SControl.medium .SControlLeft { gap: 12px; }
.SControl .SControlLeft.wrap {
  flex-wrap: wrap;
  flex-shrink: 1;
  height: auto;
  min-width: 0;
  max-width: 100%;
}

.SControlLeft.wrap > :deep(*) {
  min-width: 0;
  max-width: 100%;
}
</style>
