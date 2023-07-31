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
.SCardHeaderTitle.info    { color: var(--c-info-text); }
.SCardHeaderTitle.success { color: var(--c-success-text); }
.SCardHeaderTitle.warning { color: var(--c-warning-text); }
.SCardHeaderTitle.danger  { color: var(--c-danger-text); }
</style>
