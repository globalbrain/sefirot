<script setup lang="ts">
import IconCheckCircleFill from '~icons/ph/check-circle-fill'
import IconCircle from '~icons/ph/circle'
import IconCircleDashed from '~icons/ph/circle-dashed'
import IconCircleNotch from '~icons/ph/circle-notch'
import IconMinusCircle from '~icons/ph/minus-circle'
import IconXCircle from '~icons/ph/x-circle'
import { computed } from 'vue'

export type Size = 'nano' | 'mini' | 'small' | 'medium' | 'large' | 'jumbo' | 'fill'
export type State = 'pending' | 'ready' | 'queued' | 'running' | 'completed' | 'failed' | 'aborted'
export type Mode = 'colored' | 'monochrome'

const props = withDefaults(defineProps<{
  size?: Size
  state: State
  mode?: Mode
}>(), {
  size: 'medium',
  mode: 'colored'
})

const classes = computed(() => [
  props.size,
  props.state,
  props.mode
])
</script>

<template>
  <div class="SIndicator" :class="classes">
    <IconCircle v-if="props.state === 'pending' || props.state === 'ready'" class="icon" />
    <IconCircleDashed v-if="props.state === 'queued'" class="icon" />
    <IconCircleNotch v-if="props.state === 'running'" class="icon" />
    <IconCheckCircleFill v-if="props.state === 'completed'" class="icon" />
    <IconXCircle v-if="props.state === 'failed'" class="icon" />
    <IconMinusCircle v-if="props.state === 'aborted'" class="icon aborted" />
  </div>
</template>

<style scoped lang="postcss">
@keyframes indicator-blink {
  0%   { opacity: 1; }
  50%  { opacity: 0.5; }
  100% { opacity: 1; }
}

@keyframes indicator-spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.icon {
  width: 100%;
  height: 100%;

  &.aborted {
    transform: rotate(-45deg);
  }
}

.SIndicator.nano   { width: 20px; height: 20px; }
.SIndicator.mini   { width: 24px; height: 24px; }
.SIndicator.small  { width: 28px; height: 28px; }
.SIndicator.medium { width: 32px; height: 32px; }
.SIndicator.large  { width: 40px; height: 40px; }
.SIndicator.jumbo  { width: 48px; height: 48px; }
.SIndicator.fill   { width: 100%; height: 100%; }

.SIndicator.queued {
  animation: indicator-blink 1.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

.SIndicator.running {
  animation: indicator-spin 1.5s linear infinite;
}

.SIndicator.colored {
  &.pending   { color: var(--c-fg-gray-1); }
  &.ready     { color: var(--c-fg-info-1); }
  &.queued    { color: var(--c-fg-info-1); }
  &.running   { color: var(--c-fg-info-1); }
  &.completed { color: var(--c-fg-success-1); }
  &.failed    { color: var(--c-fg-danger-1); }
  &.aborted   { color: var(--c-fg-gray-1); }
}

.SIndicator.monochrome {
  color: var(--c-fg-gray-1);
}
</style>
