<script setup lang="ts">
export type Mode = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

defineProps<{
  mode?: Mode
}>()
</script>

<template>
  <p class="SCardHeaderTitle" :class="[mode ?? 'neutral']">
    <slot />
  </p>
</template>

<style scoped lang="postcss">
.SCardHeaderTitle {
  flex-grow: 1;
  padding-left: 24px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 600;
}

.SCardHeaderTitle.neutral { color: var(--c-text-1); }
.SCardHeaderTitle.info    { color: var(--c-text-info-1); }
.SCardHeaderTitle.success { color: var(--c-text-success-1); }
.SCardHeaderTitle.warning { color: var(--c-text-warning-1); }
.SCardHeaderTitle.danger  { color: var(--c-text-danger-1); }
</style>
