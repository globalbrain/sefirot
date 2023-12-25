<script setup lang="ts">
import { provideControlPosition } from '../composables/Control'

provideControlPosition('left')
</script>

<template>
  <div class="SControlLeft">
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

.SControl.small .SControlLeft  { gap: 8px; }
.SControl.medium .SControlLeft { gap: 12px; }
</style>
