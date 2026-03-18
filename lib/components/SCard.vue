<script setup lang="ts">
import { computed } from 'vue'
import { provideCardState } from '../composables/Card'

export type Size = 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
export type Mode = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
  size?: Size
  mode?: Mode
}>()

const { isCollapsed } = provideCardState()

const classes = computed(() => [
  props.size,
  props.mode ?? 'neutral',
  { collapsed: isCollapsed.value }
])
</script>

<template>
  <div class="SCard" :class="classes">
    <slot />
  </div>
</template>

<style scoped>
.SCard {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1px;
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: var(--c-divider);
}

.SCard.neutral { border-color: var(--c-divider); }
.SCard.info    { border-color: var(--c-border-info-1); }
.SCard.success { border-color: var(--c-border-success-1); }
.SCard.warning { border-color: var(--c-border-warning-1); }
.SCard.danger  { border-color: var(--c-border-danger-1); }

.SCard.collapsed {
  height: 48px;
  overflow: hidden;
}

.SCard :deep(> .SCardBlock:first-child),
.SCard :deep(> .SCardClose + .SCardBlock) {
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
}

.SCard :deep(> .SCardBlock:last-child) {
  border-bottom-right-radius: 11px;
  border-bottom-left-radius: 11px;
}

.SCard :deep(> .SCardClose) {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
}
</style>
