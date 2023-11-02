<script setup lang="ts">
export type Mode = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

defineProps<{
  mode?: Mode
}>()
</script>

<template>
  <div class="SHeadTitle" :class="[mode]">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SHeadTitle {
  line-height: 32px;
  font-size: 20px;
  font-weight: 500;
  color: var(--c-text-1);
}

.SHeadTitle.neutral { color: var(--c-text-1); }
.SHeadTitle.info    { color: var(--c-text-info-1); }
.SHeadTitle.success { color: var(--c-text-success-1); }
.SHeadTitle.warning { color: var(--c-text-warning-1); }
.SHeadTitle.danger  { color: var(--c-text-danger-1); }
</style>
