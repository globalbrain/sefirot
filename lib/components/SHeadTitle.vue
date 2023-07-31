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
.SHeadTitle.info    { color: var(--c-info-text); }
.SHeadTitle.success { color: var(--c-success-text); }
.SHeadTitle.warning { color: var(--c-warning-text); }
.SHeadTitle.danger  { color: var(--c-danger-text); }
</style>
