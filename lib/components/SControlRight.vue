<script setup lang="ts">
import { provideControlPosition, useControlWrap } from '../composables/Control'

const wrap = useControlWrap()

provideControlPosition('right')
</script>

<template>
  <div class="SControlRight" :class="{ wrap }">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SControlRight {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
}

.SControl.xs .SControlRight { gap: 8px; height: 28px; }
.SControl.sm .SControlRight { gap: 8px; height: 32px; }
.SControl.md .SControlRight { gap: 8px; height: 36px; }
.SControl.lg .SControlRight { gap: 12px; height: 40px; }
.SControl.xl .SControlRight { gap: 16px; height: 48px; }

.SControl.small .SControlRight  { gap: 8px; }
.SControl.medium .SControlRight { gap: 12px; }

.SControlLeft + .SControlRight {
  flex-grow: 0;
}
.SControl .SControlRight.wrap {
  flex-wrap: wrap;
  flex-shrink: 1;
  height: auto;
  min-width: 0;
  max-width: 100%;
}

.SControlRight.wrap > :deep(*) {
  min-width: 0;
  max-width: 100%;
}
</style>
