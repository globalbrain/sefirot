<script setup lang="ts">
import { computed } from 'vue'

export type Size = 'mini' | 'small' | 'medium' | 'large'
export type Type = 'dimm' | 'fill'
export type Mode = 'default' | 'mute' | 'neutral' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
  as?: string
  size?: Size
  type?: Type
  mode?: Mode
  label?: string
  clickable?: boolean

  // @deprecated Use `as` instead.
  tag?: string
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const classes = computed(() => [
  props.size ?? 'small',
  props.type ?? 'dimm',
  props.mode ?? 'default',
  { clickable: props.clickable }
])

const computedTag = computed(() => {
  const as = props.as ?? props.tag
  return as || (props.clickable ? 'button' : 'span')
})

function onClick() {
  props.clickable && emit('click')
}
</script>

<template>
  <component
    :is="computedTag"
    class="SPill"
    :class="classes"
    :role="props.clickable ? 'button' : undefined"
    @click="onClick"
  >
    <span class="label">{{ label }}</span>
  </component>
</template>

<style scoped lang="postcss">
.SPill {
  display: inline-block;
  border: 1px solid transparent;
  letter-spacing: 0.4px;
  font-weight: 500;
  transition: border-color 0.25s, color 0.25s, background-color 0.25s;
}

.SPill.mini {
  border-radius: 10px;
  padding: 0 8px;
  line-height: 18px;
  font-size: 12px;
}

.SPill.small {
  border-radius: 12px;
  padding: 0 10px;
  line-height: 22px;
  font-size: 12px;
}

.SPill.medium {
  border-radius: 14px;
  padding: 0 12px;
  line-height: 26px;
  font-size: 12px;
}

.SPill.large {
  border-radius: 16px;
  padding: 0 12px;
  line-height: 30px;
  font-size: 14px;
}

.SPill.dimm {
  &.default {
    border-color: var(--pill-dimm-default-border-color);
    color: var(--pill-dimm-default-text-color);
    background-color: var(--pill-dimm-default-bg-color);

    &.clickable:hover { background-color: var(--pill-dimm-default-hover-bg-color); }
    &.clickable:active { background-color: var(--pill-dimm-default-active-bg-color); }
  }

  &.mute {
    border-color: var(--pill-dimm-mute-border-color);
    color: var(--pill-dimm-mute-text-color);
    background-color: var(--pill-dimm-mute-bg-color);

    &.clickable:hover { background-color: var(--pill-dimm-mute-hover-bg-color); }
    &.clickable:active { background-color: var(--pill-dimm-mute-active-bg-color); }
  }

  &.neutral {
    border-color: var(--pill-dimm-neutral-border-color);
    color: var(--pill-dimm-neutral-text-color);
    background-color: var(--pill-dimm-neutral-bg-color);

    &.clickable:hover { background-color: var(--pill-dimm-neutral-hover-bg-color); }
    &.clickable:active { background-color: var(--pill-dimm-neutral-active-bg-color); }
  }

  &.info {
    border-color: var(--pill-dimm-info-border-color);
    color: var(--pill-dimm-info-text-color);
    background-color: var(--pill-dimm-info-bg-color);

    &.clickable:hover { background-color: var(--pill-dimm-info-hover-bg-color); }
    &.clickable:active { background-color: var(--pill-dimm-info-active-bg-color); }
  }

  &.success {
    border-color: var(--pill-dimm-success-border-color);
    color: var(--pill-dimm-success-text-color);
    background-color: var(--pill-dimm-success-bg-color);

    &.clickable:hover { background-color: var(--pill-dimm-success-hover-bg-color); }
    &.clickable:active { background-color: var(--pill-dimm-success-active-bg-color); }
  }

  &.warning {
    border-color: var(--pill-dimm-warning-border-color);
    color: var(--pill-dimm-warning-text-color);
    background-color: var(--pill-dimm-warning-bg-color);

    &.clickable:hover { background-color: var(--pill-dimm-warning-hover-bg-color); }
    &.clickable:active { background-color: var(--pill-dimm-warning-active-bg-color); }
  }

  &.danger {
    border-color: var(--pill-dimm-danger-border-color);
    color: var(--pill-dimm-danger-text-color);
    background-color: var(--pill-dimm-danger-bg-color);

    &.clickable:hover { background-color: var(--pill-dimm-danger-hover-bg-color); }
    &.clickable:active { background-color: var(--pill-dimm-danger-active-bg-color); }
  }
}

.SPill.fill {
  &.default {
    border-color: var(--pill-fill-default-border-color);
    color: var(--pill-fill-default-text-color);
    background-color: var(--pill-fill-default-bg-color);

    &.clickable:hover { background-color: var(--pill-fill-default-hover-bg-color); }
    &.clickable:active { background-color: var(--pill-fill-default-active-bg-color); }
  }

  &.mute {
    border-color: var(--pill-fill-mute-border-color);
    color: var(--pill-fill-mute-text-color);
    background-color: var(--pill-fill-mute-bg-color);

    &.clickable:hover { background-color: var(--pill-fill-mute-hover-bg-color); }
    &.clickable:active { background-color: var(--pill-fill-mute-active-bg-color); }
  }

  &.neutral {
    border-color: var(--pill-fill-neutral-border-color);
    color: var(--pill-fill-neutral-text-color);
    background-color: var(--pill-fill-neutral-bg-color);

    &.clickable:hover { background-color: var(--pill-fill-neutral-hover-bg-color); }
    &.clickable:active { background-color: var(--pill-fill-neutral-active-bg-color); }
  }

  &.info {
    border-color: var(--pill-fill-info-border-color);
    color: var(--pill-fill-info-text-color);
    background-color: var(--pill-fill-info-bg-color);

    &.clickable:hover { background-color: var(--pill-fill-info-hover-bg-color); }
    &.clickable:active { background-color: var(--pill-fill-info-active-bg-color); }
  }

  &.success {
    border-color: var(--pill-fill-success-border-color);
    color: var(--pill-fill-success-text-color);
    background-color: var(--pill-fill-success-bg-color);

    &.clickable:hover { background-color: var(--pill-fill-success-hover-bg-color); }
    &.clickable:active { background-color: var(--pill-fill-success-active-bg-color); }
  }

  &.warning {
    border-color: var(--pill-fill-warning-border-color);
    color: var(--pill-fill-warning-text-color);
    background-color: var(--pill-fill-warning-bg-color);

    &.clickable:hover { background-color: var(--pill-fill-warning-hover-bg-color); }
    &.clickable:active { background-color: var(--pill-fill-warning-active-bg-color); }
  }

  &.danger {
    border-color: var(--pill-fill-danger-border-color);
    color: var(--pill-fill-danger-text-color);
    background-color: var(--pill-fill-danger-bg-color);

    &.clickable:hover { background-color: var(--pill-fill-danger-hover-bg-color); }
    &.clickable:active { background-color: var(--pill-fill-danger-active-bg-color); }
  }
}
</style>
