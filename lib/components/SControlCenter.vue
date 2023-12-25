<script setup lang="ts">
import { provideControlPosition } from '../composables/Control'

provideControlPosition('center')
</script>

<template>
  <div class="SControlCenter">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SControlCenter {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
}

.SControl.small .SControlCenter  { gap: 8px; }
.SControl.medium .SControlCenter { gap: 12px; }
</style>
