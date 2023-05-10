<script setup lang="ts">
import { type MaybeRef } from '@vueuse/core'
import { computed, unref, useSlots } from 'vue'
import { type Position } from '../composables/Tooltip'
import SFragment from './SFragment.vue'
import SIcon from './SIcon.vue'
import SLink from './SLink.vue'
import SSpinner from './SSpinner.vue'
import STooltip from './STooltip.vue'

export type Size = 'mini' | 'small' | 'medium' | 'large' | 'jumbo'

export type Type = 'fill' | 'outline' | 'text'

export type Mode =
  | 'neutral'
  | 'mute'
  | 'white'
  | 'black'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'

export interface Tooltip {
  tag?: string
  text?: MaybeRef<string>
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
  props.mode ?? 'neutral',
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
    :tag="tooltip?.tag"
    :text="unref(tooltip?.text)"
    :position="tooltip?.position"
    display="inline-block"
    :trigger="tooltip?.trigger ?? 'both'"
    :timeout="tooltip?.timeout"
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
  align-items: center;
  letter-spacing: 0;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
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

.SButton.fill {
  font-weight: 500;

  &.neutral {
    border-color: var(--button-fill-neutral-border-color);
    color: var(--button-fill-neutral-text-color);
    background-color: var(--button-fill-neutral-bg-color);

    &:hover  { background-color: var(--button-fill-neutral-hover-bg-color); }
    &:active { background-color: var(--button-fill-neutral-active-bg-color); }

    & .loader-icon { color: var(--button-fill-neutral-loader-color); }
  }

  &.mute {
    border-color: var(--button-fill-mute-border-color);
    color: var(--button-fill-mute-text-color);
    background-color: var(--button-fill-mute-bg-color);

    &:hover  { background-color: var(--button-fill-mute-hover-bg-color); }
    &:active { background-color: var(--button-fill-mute-active-bg-color); }

    & .loader-icon { color: var(--button-fill-mute-loader-color); }
  }

  &.white {
    border-color: var(--button-fill-white-border-color);
    color: var(--button-fill-white-text-color);
    background-color: var(--button-fill-white-bg-color);

    &:hover  { background-color: var(--button-fill-white-hover-bg-color); }
    &:active { background-color: var(--button-fill-white-active-bg-color); }

    & .loader-icon { color: var(--button-fill-white-loader-color); }
  }

  &.black {
    border-color: var(--button-fill-black-border-color);
    color: var(--button-fill-black-text-color);
    background-color: var(--button-fill-black-bg-color);

    &:hover  { background-color: var(--button-fill-black-hover-bg-color); }
    &:active { background-color: var(--button-fill-black-active-bg-color); }

    & .loader-icon { color: var(--button-fill-black-loader-color); }
  }

  &.info {
    border-color: var(--button-fill-info-border-color);
    color: var(--button-fill-info-text-color);
    background-color: var(--button-fill-info-bg-color);

    &:hover  { background-color: var(--button-fill-info-hover-bg-color); }
    &:active { background-color: var(--button-fill-info-active-bg-color); }

    & .loader-icon { color: var(--button-fill-info-loader-color); }
  }

  &.success {
    border-color: var(--button-fill-success-border-color);
    color: var(--button-fill-success-text-color);
    background-color: var(--button-fill-success-bg-color);

    &:hover  { background-color: var(--button-fill-success-hover-bg-color); }
    &:active { background-color: var(--button-fill-success-active-bg-color); }

    & .loader-icon { color: var(--button-fill-success-loader-color); }
  }

  &.warning {
    border-color: var(--button-fill-warning-border-color);
    color: var(--button-fill-warning-text-color);
    background-color: var(--button-fill-warning-bg-color);

    &:hover  { background-color: var(--button-fill-warning-hover-bg-color); }
    &:active { background-color: var(--button-fill-warning-active-bg-color); }

    & .loader-icon { color: var(--button-fill-warning-loader-color); }
  }

  &.danger {
    border-color: var(--button-fill-danger-border-color);
    color: var(--button-fill-danger-text-color);
    background-color: var(--button-fill-danger-bg-color);

    &:hover  { background-color: var(--button-fill-danger-hover-bg-color); }
    &:active { background-color: var(--button-fill-danger-active-bg-color); }

    & .loader-icon { color: var(--button-fill-danger-loader-color); }
  }
}

.SButton.fill .icon,
.SButton.fill .label {
  &.neutral { color: var(--button-fill-neutral-content-color);}
  &.mute    { color: var(--button-fill-mute-content-color); }
  &.white   { color: var(--button-fill-white-content-color); }
  &.black   { color: var(--button-fill-black-content-color); }
  &.info    { color: var(--button-fill-info-content-color); }
  &.success { color: var(--button-fill-success-content-color); }
  &.warning { color: var(--button-fill-warning-content-color); }
  &.danger  { color: var(--button-fill-danger-content-color); }
}

.SButton.fill.disabled {
  &.neutral {
    border-color: var(--button-fill-neutral-disabled-border-color);
    color: var(--button-fill-neutral-disabled-text-color);
    background-color: var(--button-fill-neutral-disabled-bg-color);

    &:hover  { background-color: var(--button-fill-neutral-disabled-bg-color); }
    &:active { background-color: var(--button-fill-neutral-disabled-bg-color); }
  }

  &.white {
    border-color: var(--button-fill-white-disabled-border-color);
    color: var(--button-fill-white-disabled-text-color);
    background-color: var(--button-fill-white-disabled-bg-color);

    &:hover  { background-color: var(--button-fill-white-disabled-bg-color); }
    &:active { background-color: var(--button-fill-white-disabled-bg-color); }
  }

  &.black {
    border-color: var(--button-fill-black-disabled-border-color);
    color: var(--button-fill-black-disabled-text-color);
    background-color: var(--button-fill-black-disabled-bg-color);

    &:hover  { background-color: var(--button-fill-black-disabled-bg-color); }
    &:active { background-color: var(--button-fill-black-disabled-bg-color); }
  }

  &.mute {
    border-color: var(--button-fill-mute-disabled-border-color);
    color: var(--button-fill-mute-disabled-text-color);
    background-color: var(--button-fill-mute-disabled-bg-color);

    &:hover  { background-color: var(--button-fill-mute-disabled-bg-color); }
    &:active { background-color: var(--button-fill-mute-disabled-bg-color); }
  }

  &.info {
    border-color: var(--button-fill-info-disabled-border-color);
    color: var(--button-fill-info-disabled-text-color);
    background-color: var(--button-fill-info-disabled-bg-color);

    &:hover  { background-color: var(--button-fill-info-disabled-bg-color); }
    &:active { background-color: var(--button-fill-info-disabled-bg-color); }
  }

  &.success {
    border-color: var(--button-fill-success-disabled-border-color);
    color: var(--button-fill-success-disabled-text-color);
    background-color: var(--button-fill-success-disabled-bg-color);

    &:hover  { background-color: var(--button-fill-success-disabled-bg-color); }
    &:active { background-color: var(--button-fill-success-disabled-bg-color); }
  }

  &.warning {
    border-color: var(--button-fill-warning-disabled-border-color);
    color: var(--button-fill-warning-disabled-text-color);
    background-color: var(--button-fill-warning-disabled-bg-color);

    &:hover  { background-color: var(--button-fill-warning-disabled-bg-color); }
    &:active { background-color: var(--button-fill-warning-disabled-bg-color); }
  }

  &.danger {
    border-color: var(--button-fill-danger-disabled-border-color);
    color: var(--button-fill-danger-disabled-text-color);
    background-color: var(--button-fill-danger-disabled-bg-color);

    &:hover  { background-color: var(--button-fill-danger-disabled-bg-color); }
    &:active { background-color: var(--button-fill-danger-disabled-bg-color); }
  }
}

.SButton.fill.disabled .icon,
.SButton.fill.disabled .label {
  &.neutral { color: var(--button-fill-neutral-disabled-content-color); }
  &.white   { color: var(--button-fill-white-disabled-content-color); }
  &.black   { color: var(--button-fill-black-disabled-content-color); }
  &.mute    { color: var(--button-fill-mute-disabled-content-color); }
  &.info    { color: var(--button-fill-info-disabled-content-color); }
  &.success { color: var(--button-fill-success-disabled-content-color); }
  &.warning { color: var(--button-fill-warning-disabled-content-color); }
  &.danger  { color: var(--button-fill-danger-disabled-content-color); }
}

.SButton.outline {
  font-weight: 500;

  &.neutral {
    border-color: var(--button-outline-neutral-border-color);
    color: var(--button-outline-neutral-text-color);

    &:hover  { background-color: var(--button-outline-neutral-hover-bg-color); }
    &:active { background-color: var(--button-outline-neutral-active-bg-color); }

    & .loader-icon { color: var(--button-outline-neutral-loader-color); }
  }

  &.white {
    border-color: var(--button-outline-white-border-color);
    color: var(--button-outline-white-text-color);

    &:hover  { background-color: var(--button-outline-white-hover-bg-color); }
    &:active { background-color: var(--button-outline-white-active-bg-color); }

    & .loader-icon { color: var(--button-outline-white-loader-color); }
  }

  &.black {
    border-color: var(--button-outline-black-border-color);
    color: var(--button-outline-black-text-color);

    &:hover  { background-color: var(--button-outline-black-hover-bg-color); }
    &:active { background-color: var(--button-outline-black-active-bg-color); }

    & .loader-icon { color: var(--button-outline-black-loader-color); }
  }

  &.mute {
    border-color: var(--button-outline-mute-border-color);
    color: var(--button-outline-mute-text-color);

    &:hover  { background-color: var(--button-outline-mute-hover-bg-color); }
    &:active { background-color: var(--button-outline-mute-active-bg-color); }

    & .loader-icon { color: var(--button-outline-mute-loader-color); }
  }

  &.info {
    border-color: var(--button-outline-info-border-color);
    color: var(--button-outline-info-text-color);

    &:hover  { background-color: var(--button-outline-info-hover-bg-color); }
    &:active { background-color: var(--button-outline-info-active-bg-color); }

    & .loader-icon { color: var(--button-outline-info-loader-color); }
  }

  &.success {
    border-color: var(--button-outline-success-border-color);
    color: var(--button-outline-success-text-color);

    &:hover  { background-color: var(--button-outline-success-hover-bg-color); }
    &:active { background-color: var(--button-outline-success-active-bg-color); }

    & .loader-icon { color: var(--button-outline-success-loader-color); }
  }

  &.warning {
    border-color: var(--button-outline-warning-border-color);
    color: var(--button-outline-warning-text-color);

    &:hover  { background-color: var(--button-outline-warning-hover-bg-color); }
    &:active { background-color: var(--button-outline-warning-active-bg-color); }

    & .loader-icon { color: var(--button-outline-warning-loader-color); }
  }

  &.danger {
    border-color: var(--button-outline-danger-border-color);
    color: var(--button-outline-danger-text-color);

    &:hover  { background-color: var(--button-outline-danger-hover-bg-color); }
    &:active { background-color: var(--button-outline-danger-active-bg-color); }

    & .loader-icon { color: var(--button-outline-danger-loader-color); }
  }
}

.SButton.outline .icon,
.SButton.outline .label {
  &.neutral { color: var(--button-outline-neutral-content-color); }
  &.white   { color: var(--button-outline-white-content-color); }
  &.black   { color: var(--button-outline-black-content-color); }
  &.mute    { color: var(--button-outline-mute-content-color); }
  &.info    { color: var(--button-outline-info-content-color); }
  &.success { color: var(--button-outline-success-content-color); }
  &.warning { color: var(--button-outline-warning-content-color); }
  &.danger  { color: var(--button-outline-danger-content-color); }
}

.SButton.outline.disabled {
  &.neutral {
    border-color: var(--button-outline-neutral-disabled-border-color);
    color: var(--button-outline-neutral-disabled-text-color);

    &:hover  { background-color: transparent; }
    &:active { background-color: transparent; }
  }

  &.white {
    border-color: var(--button-outline-white-disabled-border-color);
    color: var(--button-outline-white-disabled-text-color);

    &:hover  { background-color: transparent; }
    &:active { background-color: transparent; }
  }

  &.black {
    border-color: var(--button-outline-black-disabled-border-color);
    color: var(--button-outline-black-disabled-text-color);

    &:hover  { background-color: transparent; }
    &:active { background-color: transparent; }
  }

  &.mute {
    border-color: var(--button-outline-mute-disabled-border-color);
    color: var(--button-outline-mute-disabled-text-color);

    &:hover  { background-color: transparent; }
    &:active { background-color: transparent; }
  }

  &.info {
    border-color: var(--button-outline-info-disabled-border-color);
    color: var(--button-outline-info-disabled-text-color);

    &:hover  { background-color: transparent; }
    &:active { background-color: transparent; }
  }

  &.success {
    border-color: var(--button-outline-success-disabled-border-color);
    color: var(--button-outline-success-disabled-text-color);

    &:hover  { background-color: transparent; }
    &:active { background-color: transparent; }
  }

  &.warning {
    border-color: var(--button-outline-warning-disabled-border-color);
    color: var(--button-outline-warning-disabled-text-color);

    &:hover  { background-color: transparent; }
    &:active { background-color: transparent; }
  }

  &.danger {
    border-color: var(--button-outline-danger-disabled-border-color);
    color: var(--button-outline-danger-disabled-text-color);

    &:hover  { background-color: transparent; }
    &:active { background-color: transparent; }
  }
}

.SButton.outline.disabled .icon,
.SButton.outline.disabled .label {
  &.neutral { color: var(--button-outline-neutral-disabled-content-color); }
  &.white   { color: var(--button-outline-white-disabled-content-color); }
  &.black   { color: var(--button-outline-black-disabled-content-color); }
  &.mute    { color: var(--button-outline-mute-disabled-content-color); }
  &.info    { color: var(--button-outline-info-disabled-content-color); }
  &.success { color: var(--button-outline-success-disabled-content-color); }
  &.warning { color: var(--button-outline-warning-disabled-content-color); }
  &.danger  { color: var(--button-outline-danger-disabled-content-color); }
}

.SButton.text {
  font-weight: 500;

  & .loader-icon { color: var(--c-neutral); }

  &.neutral {
    color: var(--button-text-neutral-text-color);

    &:hover  { background-color: var(--button-text-neutral-hover-bg-color); }
    &:active { background-color: var(--button-text-neutral-active-bg-color); }
  }

  &.white {
    color: var(--button-text-white-text-color);

    &:hover  { background-color: var(--button-text-white-hover-bg-color); }
    &:active { background-color: var(--button-text-white-active-bg-color); }
  }

  &.black {
    color: var(--button-text-black-text-color);

    &:hover  { background-color: var(--button-text-black-hover-bg-color); }
    &:active { background-color: var(--button-text-black-active-bg-color); }
  }

  &.mute {
    color: var(--button-text-mute-text-color);

    &:hover  { background-color: var(--button-text-mute-hover-bg-color); }
    &:active { background-color: var(--button-text-mute-active-bg-color); }
  }

  &.info {
    color: var(--button-text-info-text-color);

    &:hover  { background-color: var(--button-text-info-hover-bg-color); }
    &:active { background-color: var(--button-text-info-active-bg-color); }
  }

  &.success {
    color: var(--button-text-success-text-color);

    &:hover  { background-color: var(--button-text-success-hover-bg-color); }
    &:active { background-color: var(--button-text-success-active-bg-color); }
  }

  &.warning {
    color: var(--button-text-warning-text-color);

    &:hover  { background-color: var(--button-text-warning-hover-bg-color); }
    &:active { background-color: var(--button-text-warning-active-bg-color); }
  }

  &.danger {
    color: var(--button-text-danger-text-color);

    &:hover  { background-color: var(--button-text-danger-hover-bg-color); }
    &:active { background-color: var(--button-text-danger-active-bg-color); }
  }
}

.SButton.text .icon,
.SButton.text .label {
  &.neutral { color: var(--button-text-neutral-content-color); }
  &.white   { color: var(--button-text-white-content-color); }
  &.black   { color: var(--button-text-black-content-color); }
  &.mute    { color: var(--button-text-mute-content-color); }
  &.info    { color: var(--button-text-info-content-color); }
  &.success { color: var(--button-text-success-content-color); }
  &.warning { color: var(--button-text-warning-content-color); }
  &.danger  { color: var(--button-text-danger-content-color); }
}

.SButton.text.disabled {
  &.neutral {
    color: var(--button-text-neutral-disabled-text-color);

    &:hover  { background-color: transparent; }
    &:active { background-color: transparent; }
  }

  &.white {
    color: var(--button-text-white-disabled-text-color);

    &:hover  { background-color: transparent; }
    &:active { background-color: transparent; }
  }

  &.black {
    color: var(--button-text-black-disabled-text-color);

    &:hover  { background-color: transparent; }
    &:active { background-color: transparent; }
  }

  &.mute {
    color: var(--button-text-mute-disabled-text-color);

    &:hover  { background-color: transparent; }
    &:active { background-color: transparent; }
  }

  &.info {
    color: var(--button-text-info-disabled-text-color);

    &:hover  { background-color: transparent; }
    &:active { background-color: transparent; }
  }

  &.success {
    color: var(--button-text-success-disabled-text-color);

    &:hover  { background-color: transparent; }
    &:active { background-color: transparent; }
  }

  &.warning {
    color: var(--button-text-warning-disabled-text-color);

    &:hover  { background-color: transparent; }
    &:active { background-color: transparent; }
  }

  &.danger {
    color: var(--button-text-danger-disabled-text-color);

    &:hover  { background-color: transparent; }
    &:active { background-color: transparent; }
  }
}

.SButton.text.disabled .icon,
.SButton.text.disabled .label {
  &.neutral { color: var(--button-text-neutral-disabled-content-color); }
  &.white   { color: var(--button-text-white-disabled-content-color); }
  &.black   { color: var(--button-text-black-disabled-content-color); }
  &.mute    { color: var(--button-text-mute-disabled-content-color); }
  &.info    { color: var(--button-text-info-disabled-content-color); }
  &.success { color: var(--button-text-success-disabled-content-color); }
  &.warning { color: var(--button-text-warning-disabled-content-color); }
  &.danger  { color: var(--button-text-danger-disabled-content-color); }
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

.SButton.disabled {
  cursor: not-allowed;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  transition: opacity 0.25s, transform 0.25s;
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
}
</style>
