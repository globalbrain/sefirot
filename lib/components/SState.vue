<script setup lang="ts">
import { computed } from 'vue'

export type Size = 'mini' | 'small' | 'medium' | 'large'
export type Mode = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
  as?: string
  size?: Size
  mode?: Mode
  label: string
}>()

const classes = computed(() => [
  props.size ?? 'small',
  props.mode ?? 'neutral'
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
  border: 1px solid var(--c-border-mute-1);
  border-radius: 6px;
  font-weight: 500;
  white-space: nowrap;
  background-color: var(--c-bg-mute-1);
}

.SState.mini {
  gap: 6px;
  padding: 0 6px;
  height: 20px;

  .indicator {
    border-radius: 2px;
    width: 8px;
    height: 8px;
  }

  .label {
    font-size: 12px;
  }
}

.SState.small {
  gap: 8px;
  padding: 0 8px;
  height: 24px;

  .indicator {
    border-radius: 3px;
    width: 10px;
    height: 10px;
  }

  .label {
    font-size: 12px;
  }
}

.SState.medium {
  gap: 8px;
  padding: 0 8px;
  height: 28px;

  .indicator {
    border-radius: 3px;
    width: 10px;
    height: 10px;
  }

  .label {
    font-size: 12px;
  }
}

.SState.large {
  gap: 10px;
  padding: 0 10px;
  height: 32px;

  .indicator {
    border-radius: 4px;
    width: 12px;
    height: 12px;
  }

  .label {
    font-size: 14px;
  }
}

.SState.neutral {
  .indicator { background-color: var(--c-neutral-1); }
}

.SState.mute  {
  .label     { color: var(--c-text-2); }
  .indicator { background-color: var(--c-fg-gray-1); }
}

.SState.info  {
  .indicator { background-color: var(--c-fg-info-1); }
}

.SState.success  {
  .indicator { background-color: var(--c-fg-success-1); }
}

.SState.warning  {
  .indicator { background-color: var(--c-fg-warning-1); }
}

.SState.danger  {
  .indicator { background-color: var(--c-fg-danger-1); }
}

.label {
  transition: color 0.25s;
}

.indicator {
  display: block;
  transition: background-color 0.25s;
}
</style>
