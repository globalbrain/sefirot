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

.SControl.small .SControlRight  { gap: 8px; }
.SControl.medium .SControlRight { gap: 12px; }
</style>
