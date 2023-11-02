<script setup lang="ts">
import { type MaybeRef, computed, unref, useSlots } from 'vue'
import { type Position } from '../composables/Tooltip'
import SFragment from './SFragment.vue'
import SIcon from './SIcon.vue'
import SLink from './SLink.vue'
import SSpinner from './SSpinner.vue'
import STooltip from './STooltip.vue'

export type Size = 'mini' | 'small' | 'medium' | 'large' | 'jumbo'

export type Type = 'fill' | 'outline' | 'text'

export type Mode =
  | 'default'
  | 'mute'
  | 'neutral'
  | 'white'
  | 'black'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'

export interface Tooltip {
  tag?: string
  text?: MaybeRef<string | null>
  position?: Position
  trigger?: 'hover' | 'focus' | 'both'
  timeout?: number
}

const props = defineProps<{
  tag?: string
  size?: Size
  type?: Type
  mode?: Mode
  icon?: any
  iconMode?: Mode
  label?: string
  labelMode?: Mode
  href?: string
  rounded?: boolean
  block?: boolean
  loading?: boolean
  disabled?: boolean
  tooltip?: Tooltip
}>()

const emit = defineEmits<{
  (e: 'click'): void
  (e: 'disabled-click'): void
}>()

const classes = computed(() => [
  props.size ?? 'medium',
  props.type ?? 'fill',
  props.mode ?? 'default',
  { 'has-label': props.label },
  { 'has-icon': props.icon },
  { loading: props.loading },
  { rounded: props.rounded },
  { block: props.block },
  { disabled: props.disabled }
])

const computedTag = computed(() => {
  return props.tag
    ? props.tag
    : props.href ? SLink : 'button'
})

const slots = useSlots()

const hasTooltip = computed(() => {
  return slots['tooltip-text'] || unref(props.tooltip?.text)
})

function handleClick(): void {
  if (!props.loading) {
    props.disabled ? emit('disabled-click') : emit('click')
  }
}
</script>

<template>
  <SFragment
    :is="hasTooltip && STooltip"
    :tag="props.tooltip?.tag"
    :text="unref(props.tooltip?.text)"
    :position="props.tooltip?.position"
    display="inline-block"
    :trigger="props.tooltip?.trigger ?? 'both'"
    :timeout="props.tooltip?.timeout"
    :tabindex="-1"
  >
    <template v-if="$slots['tooltip-text']" #text><slot name="tooltip-text" /></template>
    <component
      :is="computedTag"
      class="SButton"
      :class="classes"
      :href="href"
      role="button"
      @click="handleClick"
    >
      <span class="content">
        <span v-if="icon" class="icon" :class="iconMode">
          <SIcon :icon="icon" class="icon-svg" />
        </span>
        <span v-if="label" class="label" :class="labelMode">
          {{ label }}
        </span>
      </span>

      <transition name="fade">
        <span v-if="loading" key="loading" class="loader">
          <SSpinner class="loader-icon" />
        </span>
      </transition>
    </component>
  </SFragment>
</template>

<style scoped lang="postcss">
.SButton {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0;
  text-align: center;
  border: 1px solid var(--button-border-color);
  border-radius: 6px;
  color: var(--button-text-color);
  background-color: var(--button-bg-color);
  overflow: hidden;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;

  &:hover {
    border-color: var(--button-hover-border-color);
    color: var(--button-hover-text-color);
    background-color: var(--button-hover-bg-color);
  }

  &:active {
    border-color: var(--button-active-border-color);
    color: var(--button-active-text-color);
    background-color: var(--button-active-bg-color);
  }
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  transition: opacity 0.25s, transform 0.25s;
}

.icon,
.label {
  color: var(--button-content-color);
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  width: 32px;
  height: 32px;
  color: var(--c-text-1);
  transform: translate(-50%, -50%);
  transition: opacity 0.25s, transform 0.25s;
}

.loader.fade-enter-from,
.loader.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(1.5);
}

.loader-icon {
  width: 32px;
  height: 32px;
  color: var(--button-loader-color);
}

.SButton.mini {
  min-width: 28px;
  min-height: 28px;
  font-size: var(--button-font-size, var(--button-mini-font-size));

  &.rounded            { border-radius: 16px; }
  &.has-label          { padding: var(--button-padding, 0 12px); }
  &.has-label.has-icon { padding: var(--button-padding, 0 10px 0 8px); }
  .content             { gap: 4px; }
  .icon-svg            { width: 16px; height: 16px; }
}

.SButton.small {
  min-width: 32px;
  min-height: 32px;
  font-size: var(--button-font-size, var(--button-small-font-size));

  &.rounded            { border-radius: 16px; }
  &.has-label          { padding: var(--button-padding, 0 12px); }
  &.has-label.has-icon { padding: var(--button-padding, 0 10px 0 8px); }
  .content             { gap: 6px; }
  .icon-svg            { width: 16px; height: 16px; }
}

.SButton.medium {
  min-width: 40px;
  min-height: 40px;
  font-size: var(--button-font-size, var(--button-medium-font-size));

  &.rounded            { border-radius: 20px; }
  &.has-label          { padding: var(--button-padding, 0 16px); }
  &.has-label.has-icon { padding: var(--button-padding, 0 12px 0 10px); }
  .content             { gap: 6px; }
  .icon-svg            { width: 18px; height: 18px; }
}

.SButton.large {
  min-width: 48px;
  min-height: 48px;
  font-size: var(--button-font-size, var(--button-large-font-size));

  &.rounded            { border-radius: 24px; }
  &.has-label          { padding: var(--button-padding, 0 20px); }
  &.has-label.has-icon { padding: var(--button-padding, 0 14px 0 12px); }
  .content             { gap: 6px; }
  .icon-svg            { width: 18px; height: 18px; }
}

.SButton.jumbo {
  min-width: 64px;
  min-height: 64px;
  font-size: var(--button-font-size, var(--button-jumbo-font-size));

  &.rounded            { border-radius: 32px; }
  &.has-label          { padding: var(--button-padding, 0 24px); }
  &.has-label.has-icon { padding: var(--button-padding, 0 20px 0 18px); }
  .content             { gap: 8px; }
  .icon-svg            { width: 20px; height: 20px; }
}

.SButton.disabled {
  border-color: var(--button-disabled-border-color);
  color: var(--button-disabled-text-color);
  background-color: var(--button-disabled-bg-color);
  cursor: not-allowed;

  &:hover,
  &:active {
    border-color: var(--button-disabled-border-color);
    color: var(--button-disabled-text-color);
    background-color: var(--button-disabled-bg-color);
  }
}

.SButton.disabled .icon,
.SButton.disabled .label {
  color: var(--button-disabled-content-color);
}

.SButton.fill {
  font-weight: 500;

  &.default {
    --button-border-color: var(--button-fill-default-border-color);
    --button-text-color: var(--button-fill-default-text-color);
    --button-bg-color: var(--button-fill-default-bg-color);
    --button-hover-border-color: var(--button-fill-default-hover-border-color);
    --button-hover-text-color: var(--button-fill-default-hover-text-color);
    --button-hover-bg-color: var(--button-fill-default-hover-bg-color);
    --button-active-border-color: var(--button-fill-default-active-border-color);
    --button-active-text-color: var(--button-fill-default-active-text-color);
    --button-active-bg-color: var(--button-fill-default-active-bg-color);
    --button-loader-color: var(--button-fill-default-loader-color);
    --button-disabled-border-color: var(--button-fill-default-disabled-border-color);
    --button-disabled-text-color: var(--button-fill-default-disabled-text-color);
    --button-disabled-bg-color: var(--button-fill-default-disabled-bg-color);
  }

  &.mute {
    --button-border-color: var(--button-fill-mute-border-color);
    --button-text-color: var(--button-fill-mute-text-color);
    --button-bg-color: var(--button-fill-mute-bg-color);
    --button-hover-border-color: var(--button-fill-mute-hover-border-color);
    --button-hover-text-color: var(--button-fill-mute-hover-text-color);
    --button-hover-bg-color: var(--button-fill-mute-hover-bg-color);
    --button-active-border-color: var(--button-fill-mute-active-border-color);
    --button-active-text-color: var(--button-fill-mute-active-text-color);
    --button-active-bg-color: var(--button-fill-mute-active-bg-color);
    --button-loader-color: var(--button-fill-mute-loader-color);
    --button-disabled-border-color: var(--button-fill-mute-disabled-border-color);
    --button-disabled-text-color: var(--button-fill-mute-disabled-text-color);
    --button-disabled-bg-color: var(--button-fill-mute-disabled-bg-color);
  }

  &.neutral {
    --button-border-color: var(--button-fill-neutral-border-color);
    --button-text-color: var(--button-fill-neutral-text-color);
    --button-bg-color: var(--button-fill-neutral-bg-color);
    --button-hover-border-color: var(--button-fill-neutral-hover-border-color);
    --button-hover-text-color: var(--button-fill-neutral-hover-text-color);
    --button-hover-bg-color: var(--button-fill-neutral-hover-bg-color);
    --button-active-border-color: var(--button-fill-neutral-active-border-color);
    --button-active-text-color: var(--button-fill-neutral-active-text-color);
    --button-active-bg-color: var(--button-fill-neutral-active-bg-color);
    --button-loader-color: var(--button-fill-neutral-loader-color);
    --button-disabled-border-color: var(--button-fill-neutral-disabled-border-color);
    --button-disabled-text-color: var(--button-fill-neutral-disabled-text-color);
    --button-disabled-bg-color: var(--button-fill-neutral-disabled-bg-color);
  }

  &.white {
    --button-border-color: var(--button-fill-white-border-color);
    --button-text-color: var(--button-fill-white-text-color);
    --button-bg-color: var(--button-fill-white-bg-color);
    --button-hover-border-color: var(--button-fill-white-hover-border-color);
    --button-hover-text-color: var(--button-fill-white-hover-text-color);
    --button-hover-bg-color: var(--button-fill-white-hover-bg-color);
    --button-active-border-color: var(--button-fill-white-active-border-color);
    --button-active-text-color: var(--button-fill-white-active-text-color);
    --button-active-bg-color: var(--button-fill-white-active-bg-color);
    --button-loader-color: var(--button-fill-white-loader-color);
    --button-disabled-border-color: var(--button-fill-white-disabled-border-color);
    --button-disabled-text-color: var(--button-fill-white-disabled-text-color);
    --button-disabled-bg-color: var(--button-fill-white-disabled-bg-color);
  }

  &.black {
    --button-border-color: var(--button-fill-black-border-color);
    --button-text-color: var(--button-fill-black-text-color);
    --button-bg-color: var(--button-fill-black-bg-color);
    --button-hover-border-color: var(--button-fill-black-hover-border-color);
    --button-hover-text-color: var(--button-fill-black-hover-text-color);
    --button-hover-bg-color: var(--button-fill-black-hover-bg-color);
    --button-active-border-color: var(--button-fill-black-active-border-color);
    --button-active-text-color: var(--button-fill-black-active-text-color);
    --button-active-bg-color: var(--button-fill-black-active-bg-color);
    --button-loader-color: var(--button-fill-black-loader-color);
    --button-disabled-border-color: var(--button-fill-black-disabled-border-color);
    --button-disabled-text-color: var(--button-fill-black-disabled-text-color);
    --button-disabled-bg-color: var(--button-fill-black-disabled-bg-color);
  }

  &.info {
    --button-border-color: var(--button-fill-info-border-color);
    --button-text-color: var(--button-fill-info-text-color);
    --button-bg-color: var(--button-fill-info-bg-color);
    --button-hover-border-color: var(--button-fill-info-hover-border-color);
    --button-hover-text-color: var(--button-fill-info-hover-text-color);
    --button-hover-bg-color: var(--button-fill-info-hover-bg-color);
    --button-active-border-color: var(--button-fill-info-active-border-color);
    --button-active-text-color: var(--button-fill-info-active-text-color);
    --button-active-bg-color: var(--button-fill-info-active-bg-color);
    --button-loader-color: var(--button-fill-info-loader-color);
    --button-disabled-border-color: var(--button-fill-info-disabled-border-color);
    --button-disabled-text-color: var(--button-fill-info-disabled-text-color);
    --button-disabled-bg-color: var(--button-fill-info-disabled-bg-color);
  }

  &.success {
    --button-border-color: var(--button-fill-success-border-color);
    --button-text-color: var(--button-fill-success-text-color);
    --button-bg-color: var(--button-fill-success-bg-color);
    --button-hover-border-color: var(--button-fill-success-hover-border-color);
    --button-hover-text-color: var(--button-fill-success-hover-text-color);
    --button-hover-bg-color: var(--button-fill-success-hover-bg-color);
    --button-active-border-color: var(--button-fill-success-active-border-color);
    --button-active-text-color: var(--button-fill-success-active-text-color);
    --button-active-bg-color: var(--button-fill-success-active-bg-color);
    --button-loader-color: var(--button-fill-success-loader-color);
    --button-disabled-border-color: var(--button-fill-success-disabled-border-color);
    --button-disabled-text-color: var(--button-fill-success-disabled-text-color);
    --button-disabled-bg-color: var(--button-fill-success-disabled-bg-color);
  }

  &.warning {
    --button-border-color: var(--button-fill-warning-border-color);
    --button-text-color: var(--button-fill-warning-text-color);
    --button-bg-color: var(--button-fill-warning-bg-color);
    --button-hover-border-color: var(--button-fill-warning-hover-border-color);
    --button-hover-text-color: var(--button-fill-warning-hover-text-color);
    --button-hover-bg-color: var(--button-fill-warning-hover-bg-color);
    --button-active-border-color: var(--button-fill-warning-active-border-color);
    --button-active-text-color: var(--button-fill-warning-active-text-color);
    --button-active-bg-color: var(--button-fill-warning-active-bg-color);
    --button-loader-color: var(--button-fill-warning-loader-color);
    --button-disabled-border-color: var(--button-fill-warning-disabled-border-color);
    --button-disabled-text-color: var(--button-fill-warning-disabled-text-color);
    --button-disabled-bg-color: var(--button-fill-warning-disabled-bg-color);
  }

  &.danger {
    --button-border-color: var(--button-fill-danger-border-color);
    --button-text-color: var(--button-fill-danger-text-color);
    --button-bg-color: var(--button-fill-danger-bg-color);
    --button-hover-border-color: var(--button-fill-danger-hover-border-color);
    --button-hover-text-color: var(--button-fill-danger-hover-text-color);
    --button-hover-bg-color: var(--button-fill-danger-hover-bg-color);
    --button-active-border-color: var(--button-fill-danger-active-border-color);
    --button-active-text-color: var(--button-fill-danger-active-text-color);
    --button-active-bg-color: var(--button-fill-danger-active-bg-color);
    --button-loader-color: var(--button-fill-danger-loader-color);
    --button-disabled-border-color: var(--button-fill-danger-disabled-border-color);
    --button-disabled-text-color: var(--button-fill-danger-disabled-text-color);
    --button-disabled-bg-color: var(--button-fill-danger-disabled-bg-color);
  }
}

.SButton.fill .icon,
.SButton.fill .label {
  &.default {
    --button-content-color: var(--button-fill-default-content-color);
    --button-disabled-content-color: var(--button-fill-default-disabled-content-color);
  }

  &.mute {
    --button-content-color: var(--button-fill-mute-content-color);
    --button-disabled-content-color: var(--button-fill-mute-disabled-content-color);
  }

  &.neutral {
    --button-content-color: var(--button-fill-neutral-content-color);
    --button-disabled-content-color: var(--button-fill-neutral-disabled-content-color);
  }

  &.white {
    --button-content-color: var(--button-fill-white-content-color);
    --button-disabled-content-color: var(--button-fill-white-disabled-content-color);
  }

  &.black {
    --button-content-color: var(--button-fill-black-content-color);
    --button-disabled-content-color: var(--button-fill-black-disabled-content-color);
  }

  &.info {
    --button-content-color: var(--button-fill-info-content-color);
    --button-disabled-content-color: var(--button-fill-info-disabled-content-color);
  }

  &.success {
    --button-content-color: var(--button-fill-success-content-color);
    --button-disabled-content-color: var(--button-fill-success-disabled-content-color);
  }

  &.warning {
    --button-content-color: var(--button-fill-warning-content-color);
    --button-disabled-content-color: var(--button-fill-warning-disabled-content-color);
  }

  &.danger {
    --button-content-color: var(--button-fill-danger-content-color);
    --button-disabled-content-color: var(--button-fill-danger-disabled-content-color);
  }
}

.SButton.outline {
  font-weight: 500;

  --button-loader-color: var(--c-neutral-1);
  --button-hover-border-color: var(--button-border-color);
  --button-hover-text-color: var(--button-text-color);
  --button-active-border-color: var(--button-border-color);
  --button-active-text-color: var(--button-text-color);

  &.default {
    --button-border-color: var(--button-outline-default-border-color);
    --button-text-color: var(--button-outline-default-text-color);
    --button-hover-bg-color: var(--button-outline-default-hover-bg-color);
    --button-active-bg-color: var(--button-outline-default-active-bg-color);
    --button-disabled-border-color: var(--button-outline-default-disabled-border-color);
    --button-disabled-text-color: var(--button-outline-default-disabled-text-color);
  }

  &.mute {
    --button-border-color: var(--button-outline-mute-border-color);
    --button-text-color: var(--button-outline-mute-text-color);
    --button-hover-bg-color: var(--button-outline-mute-hover-bg-color);
    --button-active-bg-color: var(--button-outline-mute-active-bg-color);
    --button-disabled-border-color: var(--button-outline-mute-disabled-border-color);
    --button-disabled-text-color: var(--button-outline-mute-disabled-text-color);
  }

  &.neutral {
    --button-border-color: var(--button-outline-neutral-border-color);
    --button-text-color: var(--button-outline-neutral-text-color);
    --button-hover-bg-color: var(--button-outline-neutral-hover-bg-color);
    --button-active-bg-color: var(--button-outline-neutral-active-bg-color);
    --button-disabled-border-color: var(--button-outline-neutral-disabled-border-color);
    --button-disabled-text-color: var(--button-outline-neutral-disabled-text-color);
  }

  &.white {
    --button-border-color: var(--button-outline-white-border-color);
    --button-text-color: var(--button-outline-white-text-color);
    --button-hover-bg-color: var(--button-outline-white-hover-bg-color);
    --button-active-bg-color: var(--button-outline-white-active-bg-color);
    --button-disabled-border-color: var(--button-outline-white-disabled-border-color);
    --button-disabled-text-color: var(--button-outline-white-disabled-text-color);
  }

  &.black {
    --button-border-color: var(--button-outline-black-border-color);
    --button-text-color: var(--button-outline-black-text-color);
    --button-hover-bg-color: var(--button-outline-black-hover-bg-color);
    --button-active-bg-color: var(--button-outline-black-active-bg-color);
    --button-disabled-border-color: var(--button-outline-black-disabled-border-color);
    --button-disabled-text-color: var(--button-outline-black-disabled-text-color);
  }

  &.info {
    --button-border-color: var(--button-outline-info-border-color);
    --button-text-color: var(--button-outline-info-text-color);
    --button-hover-bg-color: var(--button-outline-info-hover-bg-color);
    --button-active-bg-color: var(--button-outline-info-active-bg-color);
    --button-disabled-border-color: var(--button-outline-info-disabled-border-color);
    --button-disabled-text-color: var(--button-outline-info-disabled-text-color);
  }

  &.success {
    --button-border-color: var(--button-outline-success-border-color);
    --button-text-color: var(--button-outline-success-text-color);
    --button-hover-bg-color: var(--button-outline-success-hover-bg-color);
    --button-active-bg-color: var(--button-outline-success-active-bg-color);
    --button-disabled-border-color: var(--button-outline-success-disabled-border-color);
    --button-disabled-text-color: var(--button-outline-success-disabled-text-color);
  }

  &.warning {
    --button-border-color: var(--button-outline-warning-border-color);
    --button-text-color: var(--button-outline-warning-text-color);
    --button-hover-bg-color: var(--button-outline-warning-hover-bg-color);
    --button-active-bg-color: var(--button-outline-warning-active-bg-color);
    --button-disabled-border-color: var(--button-outline-warning-disabled-border-color);
    --button-disabled-text-color: var(--button-outline-warning-disabled-text-color);
  }

  &.danger {
    --button-border-color: var(--button-outline-danger-border-color);
    --button-text-color: var(--button-outline-danger-text-color);
    --button-hover-bg-color: var(--button-outline-danger-hover-bg-color);
    --button-active-bg-color: var(--button-outline-danger-active-bg-color);
    --button-disabled-border-color: var(--button-outline-danger-disabled-border-color);
    --button-disabled-text-color: var(--button-outline-danger-disabled-text-color);
  }
}

.SButton.outline .icon,
.SButton.outline .label {
  &.default {
    --button-content-color: var(--button-outline-default-content-color);
    --button-disabled-content-color: var(--button-outline-default-disabled-content-color);
  }

  &.mute {
    --button-content-color: var(--button-outline-mute-content-color);
    --button-disabled-content-color: var(--button-outline-mute-disabled-content-color);
  }

  &.neutral {
    --button-content-color: var(--button-outline-neutral-content-color);
    --button-disabled-content-color: var(--button-outline-neutral-disabled-content-color);
  }

  &.white {
    --button-content-color: var(--button-outline-white-content-color);
    --button-disabled-content-color: var(--button-outline-white-disabled-content-color);
  }

  &.black {
    --button-content-color: var(--button-outline-black-content-color);
    --button-disabled-content-color: var(--button-outline-black-disabled-content-color);
  }

  &.info {
    --button-content-color: var(--button-outline-info-content-color);
    --button-disabled-content-color: var(--button-outline-info-disabled-content-color);
  }

  &.success {
    --button-content-color: var(--button-outline-success-content-color);
    --button-disabled-content-color: var(--button-outline-success-disabled-content-color);
  }

  &.warning {
    --button-content-color: var(--button-outline-warning-content-color);
    --button-disabled-content-color: var(--button-outline-warning-disabled-content-color);
  }

  &.danger {
    --button-content-color: var(--button-outline-danger-content-color);
    --button-disabled-content-color: var(--button-outline-danger-disabled-content-color);
  }
}

.SButton.text {
  font-weight: 500;

  --button-border-color: transparent;
  --button-loader-color: var(--c-neutral-1);
  --button-hover-border-color: var(--button-border-color);
  --button-hover-text-color: var(--button-text-color);
  --button-active-border-color: var(--button-border-color);
  --button-active-text-color: var(--button-text-color);
  --button-disabled-border-color: var(--button-border-color);

  &.default {
    --button-text-color: var(--button-text-default-text-color);
    --button-hover-bg-color: var(--button-text-default-hover-bg-color);
    --button-active-bg-color: var(--button-text-default-active-bg-color);
    --button-disabled-text-color: var(--button-text-default-disabled-text-color);
  }

  &.mute {
    --button-text-color: var(--button-text-mute-text-color);
    --button-hover-bg-color: var(--button-text-mute-hover-bg-color);
    --button-active-bg-color: var(--button-text-mute-active-bg-color);
    --button-disabled-text-color: var(--button-text-mute-disabled-text-color);
  }

  &.neutral {
    --button-text-color: var(--button-text-neutral-text-color);
    --button-hover-bg-color: var(--button-text-neutral-hover-bg-color);
    --button-active-bg-color: var(--button-text-neutral-active-bg-color);
    --button-disabled-text-color: var(--button-text-neutral-disabled-text-color);
  }

  &.white {
    --button-text-color: var(--button-text-white-text-color);
    --button-hover-bg-color: var(--button-text-white-hover-bg-color);
    --button-active-bg-color: var(--button-text-white-active-bg-color);
    --button-disabled-text-color: var(--button-text-white-disabled-text-color);
  }

  &.black {
    --button-text-color: var(--button-text-black-text-color);
    --button-hover-bg-color: var(--button-text-black-hover-bg-color);
    --button-active-bg-color: var(--button-text-black-active-bg-color);
    --button-disabled-text-color: var(--button-text-black-disabled-text-color);
  }

  &.info {
    --button-text-color: var(--button-text-info-text-color);
    --button-hover-bg-color: var(--button-text-info-hover-bg-color);
    --button-active-bg-color: var(--button-text-info-active-bg-color);
    --button-disabled-text-color: var(--button-text-info-disabled-text-color);
  }

  &.success {
    --button-text-color: var(--button-text-success-text-color);
    --button-hover-bg-color: var(--button-text-success-hover-bg-color);
    --button-active-bg-color: var(--button-text-success-active-bg-color);
    --button-disabled-text-color: var(--button-text-success-disabled-text-color);
  }

  &.warning {
    --button-text-color: var(--button-text-warning-text-color);
    --button-hover-bg-color: var(--button-text-warning-hover-bg-color);
    --button-active-bg-color: var(--button-text-warning-active-bg-color);
    --button-disabled-text-color: var(--button-text-warning-disabled-text-color);
  }

  &.danger {
    --button-text-color: var(--button-text-danger-text-color);
    --button-hover-bg-color: var(--button-text-danger-hover-bg-color);
    --button-active-bg-color: var(--button-text-danger-active-bg-color);
    --button-disabled-text-color: var(--button-text-danger-disabled-text-color);
  }
}

.SButton.text .icon,
.SButton.text .label {
  &.default {
    --button-content-color: var(--button-text-default-content-color);
    --button-disabled-content-color: var(--button-text-default-disabled-content-color);
  }

  &.mute {
    --button-content-color: var(--button-text-mute-content-color);
    --button-disabled-content-color: var(--button-text-mute-disabled-content-color);
  }

  &.neutral {
    --button-content-color: var(--button-text-neutral-content-color);
    --button-disabled-content-color: var(--button-text-neutral-disabled-content-color);
  }

  &.white {
    --button-content-color: var(--button-text-white-content-color);
    --button-disabled-content-color: var(--button-text-white-disabled-content-color);
  }

  &.black {
    --button-content-color: var(--button-text-black-content-color);
    --button-disabled-content-color: var(--button-text-black-disabled-content-color);
  }

  &.info {
    --button-content-color: var(--button-text-info-content-color);
    --button-disabled-content-color: var(--button-text-info-disabled-content-color);
  }

  &.success {
    --button-content-color: var(--button-text-success-content-color);
    --button-disabled-content-color: var(--button-text-success-disabled-content-color);
  }

  &.warning {
    --button-content-color: var(--button-text-warning-content-color);
    --button-disabled-content-color: var(--button-text-warning-disabled-content-color);
  }

  &.danger {
    --button-content-color: var(--button-text-danger-content-color);
    --button-disabled-content-color: var(--button-text-danger-disabled-content-color);
  }
}

.SButton.block {
  display: flex;
  justify-content: center;
  width: 100%;
}

.SButton.loading {
  .content {
    opacity: 0;
    transform: scale(.9);
  }
}
</style>
