<script setup lang="ts">
import { computed } from 'vue'

export type Size = 'mini' | 'small' | 'medium' | 'large'
export type Mode = 'default' | 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
  as?: string
  size?: Size
  mode?: Mode
  label: string
}>()

const classes = computed(() => [
  props.size ?? 'small',
  props.mode ?? 'default'
])
</script>

<template>
  <component :is="as ?? 'span'" class="SState" :class="classes">
    <span class="indicator" />
    <span class="label">{{ label }}</span>
  </component>
</template>

<style scoped lang="postcss">
.SState {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--c-divider);
  font-weight: 500;
  white-space: nowrap;
  background-color: transparent;
}

.SState.mini {
  gap: 6px;
  border-radius: 10px;
  padding: 0 6px;
  height: 20px;

  .indicator {
    width: 8px;
    height: 8px;
  }

  .label {
    font-size: 12px;
  }
}

.SState.small {
  gap: 6px;
  border-radius: 12px;
  padding: 0 8px;
  height: 24px;

  .indicator {
    width: 10px;
    height: 10px;
  }

  .label {
    font-size: 12px;
  }
}

.SState.medium {
  gap: 6px;
  border-radius: 14px;
  padding: 0 8px;
  height: 28px;

  .indicator {
    width: 10px;
    height: 10px;
  }

  .label {
    font-size: 12px;
  }
}

.SState.large {
  gap: 8px;
  border-radius: 16px;
  padding: 0 10px;
  height: 32px;

  .indicator {
    width: 12px;
    height: 12px;
  }

  .label {
    font-size: 14px;
  }
}

.SState.default {
  .label     { color: var(--c-text-1); }
  .indicator { background-color: var(--c-fg-gray-1); }
}

.SState.mute {
  .label     { color: var(--c-text-2); }
  .indicator { background-color: var(--c-fg-gray-1); }
}

.SState.neutral {
  .label     { color: var(--c-text-1); }
  .indicator { background-color: var(--c-neutral-1); }
}

.SState.info {
  .label     { color: var(--c-text-1); }
  .indicator { background-color: var(--c-fg-info-1); }
}

.SState.success {
  .label     { color: var(--c-text-1); }
  .indicator { background-color: var(--c-fg-success-1); }
}

.SState.warning {
  .label     { color: var(--c-text-1); }
  .indicator { background-color: var(--c-fg-warning-1); }
}

.SState.danger {
  .label     { color: var(--c-text-1); }
  .indicator { background-color: var(--c-fg-danger-1); }
}

.label {
  transition: color 0.25s;
}

.indicator {
  display: block;
  border-radius: 50%;
  transition: background-color 0.25s;
}
</style>
