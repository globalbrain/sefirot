<script setup lang="ts">
import IconCheckCircleFill from '@iconify-icons/ph/check-circle-fill'
import IconCircle from '@iconify-icons/ph/circle-bold'
import IconCircleDashed from '@iconify-icons/ph/circle-dashed-bold'
import IconCircleNotch from '@iconify-icons/ph/circle-notch-bold'
import IconXCircle from '@iconify-icons/ph/x-circle-bold'
import { computed } from 'vue'
import SIcon from './SIcon.vue'

export type Size = 'nano' | 'mini' | 'small' | 'medium' | 'large' | 'jumbo'
export type State = 'pending' | 'ready' | 'queued' | 'running' | 'completed' | 'failed'
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

const stateIconDict = {
  pending: IconCircle,
  ready: IconCircle,
  queued: IconCircleDashed,
  running: IconCircleNotch,
  completed: IconCheckCircleFill,
  failed: IconXCircle
}
</script>

<template>
  <div class="SIndicator" :class="classes">
    <SIcon class="icon" :icon="stateIconDict[state]" />
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
}

.SIndicator.nano   { width: 20px; height: 20px; }
.SIndicator.mini   { width: 24px; height: 24px; }
.SIndicator.small  { width: 28px; height: 28px; }
.SIndicator.medium { width: 32px; height: 32px; }
.SIndicator.large  { width: 40px; height: 40px; }
.SIndicator.jumbo  { width: 48px; height: 48px; }

.SIndicator.queued {
  animation: indicator-blink 1s linear infinite;
}

.SIndicator.running {
  animation: indicator-spin 1s linear infinite;
}

.SIndicator.colored {
  &.pending   { color: var(--c-fg-gray-1); }
  &.ready     { color: var(--c-fg-info-1); }
  &.queued    { color: var(--c-fg-info-1); }
  &.running   { color: var(--c-fg-info-1); }
  &.completed { color: var(--c-fg-success-1); }
  &.failed    { color: var(--c-fg-danger-1); }
}

.SIndicator.monochrome {
  color: var(--c-fg-gray-1);
}
</style>
