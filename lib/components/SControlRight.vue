<script setup lang="ts">
import { provideControlPosition } from '../composables/Control'

provideControlPosition('right')
</script>

<template>
  <div class="SControlRight">
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
</style>
