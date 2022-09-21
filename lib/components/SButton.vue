<script setup lang="ts">
import { computed } from 'vue'
import SIcon from './SIcon.vue'
import SIconPreloader from './icons/SIconPreloader.vue'

export type Size = 'mini' | 'small' | 'medium' | 'large' | 'jumbo'

export type Type = 'fill' | 'outline' | 'text'

export type Mode =
  | 'neutral'
  | 'white'
  | 'black'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'mute'

const props = defineProps<{
  tag?: string
  size?: Size
  type?: Type
  mode?: Mode
  icon?: any
  label?: string
  href?: string
  loading?: boolean
  rounded?: boolean
  block?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
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

function handleClick(): void {
  !props.disabled && !props.loading && emit('click')
}
</script>

<template>
  <component
    :is="tag ?? 'button'"
    class="SButton"
    :class="classes"
    :href="href"
    role="button"
    @click="handleClick"
  >
    <span class="content">
      <span v-if="icon && 'body' in icon" class="icon"><SIcon :icon="icon" class="icon-svg" /></span>
      <span v-else-if="icon" class="icon"><component :is="icon" class="icon-svg" /></span>
      <span v-if="label" class="label">{{ label }}</span>
    </span>

    <transition name="fade">
      <span v-if="loading" key="loading" class="loader">
        <SIconPreloader class="loader-icon" />
      </span>
    </transition>
  </component>
</template>

<style lang="postcss" scoped>
.SButton {
  position: relative;
  display: inline-block;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
}

.SButton.fill {
  &.neutral {
    color: var(--button-fill-text);
    background-color: var(--button-fill-bg);

    &:hover  { background-color: var(--button-fill-bg-hover); }
    &:active { background-color: var(--button-fill-bg-focus); }

    & .loader-icon :deep(.bar) { fill: var(--c-white); }
  }

  &.white {
    color: var(--c-text-light-1);
    background-color: var(--c-white);

    &:hover  { background-color: var(--c-gray-light-3); }
    &:active { background-color: var(--c-gray-light-1); }

    & .loader-icon :deep(.bar) { fill: var(--c-white); }
  }

  &.black {
    color: var(--c-text-dark-1);
    background-color: var(--c-black);

    &:hover  { background-color: var(--c-gray-dark-4); }
    &:active { background-color: var(--c-gray-dark-3); }

    & .loader-icon :deep(.bar) { fill: var(--c-white); }
  }

  &.info {
    color: var(--c-text-dark-1);
    background-color: var(--c-info);

    &:hover  { background-color: var(--c-info-dark); }
    &:active { background-color: var(--c-info-darker); }

    & .loader-icon :deep(.bar) { fill: var(--c-white); }
  }

  &.success {
    color: var(--c-text-dark-1);
    background-color: var(--c-success);

    &:hover  { background-color: var(--c-success-dark); }
    &:active { background-color: var(--c-success-darker); }

    & .loader-icon :deep(.bar) { fill: var(--c-white); }
  }

  &.warning {
    color: var(--c-text-dark-1);
    background-color: var(--c-warning);

    &:hover  { background-color: var(--c-warning-dark); }
    &:active { background-color: var(--c-warning-darker); }

    & .loader-icon :deep(.bar) { fill: var(--c-white); }
  }

  &.danger {
    color: var(--c-text-dark-1);
    background-color: var(--c-danger);

    &:hover  { background-color: var(--c-danger-dark); }
    &:active { background-color: var(--c-danger-darker); }

    & .loader-icon :deep(.bar) { fill: var(--c-white); }
  }

  &.mute {
    border-color: var(--c-divider-light);
    color: var(--c-text-1);
    background-color: var(--c-bg-mute);

    &:hover  { border-color: var(--c-divider); background-color: var(--c-gray-light-4); }
    &:active { background-color: var(--c-bg-soft); }

    & .loader-icon :deep(.bar) { fill: var(--c-black); }

    .dark & {
      border-color: var(--c-divider-light);
      background-color: var(--c-gray-dark-4);

      &:hover  { border-color: var(--c-divider); background-color: var(--c-gray-dark-5); }
      &:active { background-color: var(--c-bg-soft); }

      & .loader-icon :deep(.bar) { fill: var(--c-white); }
    }
  }

  &.disabled {
    opacity: 0.75;
    cursor: not-allowed;

    &.neutral {
      &:hover  { background-color: var(--button-fill-bg); }
      &:active { background-color: var(--button-fill-bg); }
    }

    &.white {
      &:hover  { background-color: var(--c-gray-dark-4); }
      &:active { background-color: var(--c-gray-dark-3); }
    }

    &.black {
      color: var(--c-text-dark-1);
      background-color: var(--c-white);

      &:hover  { background-color: var(--c-gray-light-3); }
      &:active { background-color: var(--c-gray-light-1); }
    }

    &.info {
      &:hover  { background-color: var(--c-info); }
      &:active { background-color: var(--c-info); }
    }

    &.success {
      &:hover  { background-color: var(--c-success); }
      &:active { background-color: var(--c-success); }
    }

    &.warning {
      &:hover  { background-color: var(--c-warning); }
      &:active { background-color: var(--c-warning); }
    }

    &.danger {
      &:hover  { background-color: var(--c-danger); }
      &:active { background-color: var(--c-danger); }
    }
  }
}

.SButton.outline {
  &.neutral {
    border-color: var(--button-outline-border);
    color: var(--button-outline-text);

    &:hover  { background-color: var(--button-outline-bg-hover); }
    &:active { background-color: var(--button-outline-bg-focus); }
  }

  &.white {
    border-color: var(--c-white);
    color: var(--c-text-dark-1);

    &:hover  { background-color: var(--c-white-mute); }
    &:active { background-color: var(--c-gray-light-4); }
  }

  &.black {
    border-color: var(--c-black);
    color: var(--c-text-light-1);

    &:hover  { background-color: var(--c-black-mute); }
    &:active { background-color: var(--c-gray-dark-3); }
  }

  &.info {
    border-color: var(--c-info);
    color: var(--c-info);

    &:hover  { border-color: var(--c-info-dark); }
    &:active { border-color: var(--c-info-darker); }
  }

  &.success {
    border-color: var(--c-success);
    color: var(--c-success);

    &:hover  { border-color: var(--c-success-dark); }
    &:active { border-color: var(--c-success-darker); }
  }

  &.warning {
    border-color: var(--c-warning);
    color: var(--c-warning);

    &:hover  { border-color: var(--c-warning-dark); }
    &:active { border-color: var(--c-warning-darker); }
  }

  &.danger {
    border-color: var(--c-danger);
    color: var(--c-danger);

    &:hover  { border-color: var(--c-danger-dark); }
    &:active { border-color: var(--c-danger-darker); }
  }

  &.disabled {
    opacity: .75;
    cursor: not-allowed;

    &:hover  { background-color: var(--button-secondary-bg); }
    &:active { background-color: var(--button-secondary-bg); }

    &.info {
      &:hover  { border-color: var(--c-info); }
      &:active { border-color: var(--c-info); }
    }

    &.success {
      &:hover  { border-color: var(--c-success); }
      &:active { border-color: var(--c-success); }
    }

    &.warning {
      &:hover  { border-color: var(--c-warning); }
      &:active { border-color: var(--c-warning); }
    }

    &.danger {
      &:hover  { border-color: var(--c-danger); }
      &:active { border-color: var(--c-danger); }
    }
  }

  &.inverse {
    border-color: var(--button-secondary-inverse-border);
    color: var(--button-secondary-inverse-text);

    &:hover  { background-color: var(--button-secondary-inverse-bg-hover); }
    &:active { background-color: var(--button-secondary-inverse-bg-focus); }
  }
}

.SButton.text {
  &.neutral {
    color: var(--button-text-text);

    &:hover  { background-color: var(--button-text-bg-hover); }
    &:active { background-color: var(--button-text-bg-focus); }
  }

  &.info    { color: var(--c-info); }
  &.success { color: var(--c-success); }
  &.warning { color: var(--c-warning); }
  &.danger  { color: var(--c-danger); }

  &.disabled {
    opacity: .75;
    cursor: not-allowed;

    &.neutral {
      &:hover  { background-color: var(--button-text-bg); }
      &:active { background-color: var(--button-text-bg); }
    }
  }
}

.SButton.mini {
  width: 28px;
  height: 28px;
  font-size: 12px;

  .icon-svg {
    width: 14px;
    height: 14px;
  }

  &.mini.rounded {
    border-radius: 14px;
  }

  &.mini.has-label {
    padding: 0 8px;
    width: auto;
  }

  &.mini.has-label.block {
    width: 100%;
  }

  &.mini.has-icon {
    .label {
      padding-right: 1px;
      padding-left: 6px;
    }
  }
}

.SButton.small {
  width: 32px;
  height: 32px;
  font-size: 12px;

  .icon-svg {
    width: 14px;
    height: 14px;
  }

  &.small.rounded {
    border-radius: 16px;
  }

  &.small.has-label {
    padding: 0 10px;
    width: auto;
  }

  &.small.has-label.block {
    width: 100%;
  }

  &.small.has-icon {
    .label {
      padding-right: 1px;
      padding-left: 8px;
    }
  }
}

.SButton.medium {
  width: 40px;
  height: 40px;
  font-size: 14px;

  .icon-svg {
    width: 16px;
    height: 16px;
  }

  &.medium.rounded {
    border-radius: 20px;
  }

  &.medium.has-label {
    padding: 0 12px;
    width: auto;
  }

  &.medium.has-label.block {
    width: 100%;
  }

  &.medium.has-icon {
    .label {
      padding-right: 1px;
      padding-left: 8px;
    }
  }
}

.SButton.large {
  width: 48px;
  height: 48px;
  font-size: 14px;

  .icon-svg {
    width: 18px;
    height: 18px;
  }

  &.large.rounded {
    border-radius: 24px;
  }

  &.large.has-label {
    padding: 0 14px;
    width: auto;
  }

  &.large.has-label.block {
    width: 100%;
  }

  &.large.has-icon {
    .label {
      padding-right: 2px;
      padding-left: 10px;
    }
  }
}

.SButton.jumbo {
  width: 64px;
  height: 64px;
  font-size: 14px;

  .icon-svg {
    width: 18px;
    height: 18px;
  }

  &.jumbo.rounded {
    border-radius: 32px;
  }

  &.jumbo.has-label {
    padding: 0 24px;
    width: auto;
  }

  &.jumbo.has-label.block {
    width: 100%;
  }

  &.jumbo.has-icon {
    .label {
      padding-right: 2px;
      padding-left: 10px;
    }
  }
}

.SButton.block {
  display: block;
  width: 100%;
}

.SButton.loading {
  &.fill {
    &.neutral {
      color: var(--c-text-1);

      &:hover  { background-color: var(--button-fill-bg); }
      &:active { background-color: var(--button-fill-bg); }
    }

    &.white {
      &:hover  { background-color: var(--c-white); }
      &:active { background-color: var(--c-white); }
    }

    &.black {
      &:hover  { background-color: var(--c-black); }
      &:active { background-color: var(--c-black); }
    }

    &.info {
      &:hover  { background-color: var(--c-info); }
      &:active { background-color: var(--c-info); }
    }

    &.success {
      &:hover  { background-color: var(--c-success); }
      &:active { background-color: var(--c-success); }
    }

    &.warning {
      &:hover  { background-color: var(--c-warning); }
      &:active { background-color: var(--c-warning); }
    }

    &.danger {
      color: var(--c-text-1);

      &:hover  { background-color: var(--c-danger); }
      &:active { background-color: var(--c-danger); }
    }

    &.mute {
      &:hover  { border-color: var(--c-divider-light); background-color: var(--c-bg-mute); }
      &:active { background-color: var(--c-bg-mute); }

      .dark & {
        &:hover  { border-color: var(--c-divider-light); background-color: var(--c-gray-dark-4); }
        &:active { background-color: var(--c-gray-dark-4); }
      }
    }
  }

  /* Deprecated */
  &.primary {
    &:hover  { background-color: var(--button-primary-bg); }
    &:active { background-color: var(--button-primary-bg); }

    &.info {
      &:hover  { background-color: var(--c-info-light); }
      &:active { background-color: var(--c-info-light); }
    }

    &.success {
      &:hover  { background-color: var(--c-success); }
      &:active { background-color: var(--c-success); }
    }

    &.warning {
      &:hover  { background-color: var(--c-warning); }
      &:active { background-color: var(--c-warning); }
    }

    &.danger {
      &:hover  { background-color: var(--c-danger); }
      &:active { background-color: var(--c-danger); }
    }

    &.inverse {
      &:hover  { background-color: var(--c-white); }
      &:active { background-color: var(--c-white); }
    }
  }

  &.secondary,
  &.text,
  &.mute {
    &:hover  { background-color: transparent; }
    &:active { background-color: transparent; }
  }

  .content {
    opacity: 0;
    transform: scale(.9);
  }
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  transition: opacity 0.25s, transform 0.25s;
}

.icon-svg {
  fill: currentColor;
  transition: fill 0.25s;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 32px;
  height: 32px;
  color: var(--c-text-1);
  transform: translate(-50%, -50%);
  transition: opacity 0.25s, transform 0.25s;
}

.loader.fade-enter,
.loader.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(1.5);
}

.loader-icon {
  width: 32px;
  height: 32px;
}

/* Deprecated */
.SButton.primary {
  color: var(--button-primary-text);
  background-color: var(--button-primary-bg);

  &:hover  { background-color: var(--button-primary-bg-hover); }
  &:active { background-color: var(--button-primary-bg-focus); }

  &.info {
    color: var(--c-text-dark-1);
    background-color: var(--c-info);

    &:hover  { background-color: var(--c-info-dark); }
    &:active { background-color: var(--c-info-darker); }
  }

  &.success {
    color: var(--c-text-dark-1);
    background-color: var(--c-success);

    &:hover  { background-color: var(--c-success-dark); }
    &:active { background-color: var(--c-success-darker); }
  }

  &.warning {
    color: var(--c-text-dark-1);
    background-color: var(--c-warning);

    &:hover  { background-color: var(--c-warning-dark); }
    &:active { background-color: var(--c-warning-darker); }
  }

  &.danger {
    color: var(--c-text-dark-1);
    background-color: var(--c-danger);

    &:hover  { background-color: var(--c-danger-dark); }
    &:active { background-color: var(--c-danger-darker); }
  }

  &.disabled {
    opacity: .75;
    cursor: not-allowed;

    &:hover  { background-color: var(--button-primary-bg); }
    &:active { background-color: var(--button-primary-bg); }

    &.info {
      &:hover  { background-color: var(--c-info); }
      &:active { background-color: var(--c-info); }
    }

    &.success {
      &:hover  { background-color: var(--c-success); }
      &:active { background-color: var(--c-success); }
    }

    &.warning {
      &:hover  { background-color: var(--c-warning); }
      &:active { background-color: var(--c-warning); }
    }

    &.danger {
      &:hover  { background-color: var(--c-danger); }
      &:active { background-color: var(--c-danger); }
    }
  }

  & .loader-icon :deep(.bar) {
    fill: var(--c-text-inverse-1);
  }
}

.SButton.secondary {
  border-color: var(--button-secondary-border);
  color: var(--button-secondary-text);

  &:hover  { background-color: var(--button-secondary-bg-hover); }
  &:active { background-color: var(--button-secondary-bg-focus); }

  &.info {
    border-color: var(--c-info);
    color: var(--c-info);

    &:hover  { border-color: var(--c-info-dark); }
    &:active { border-color: var(--c-info-darker); }
  }

  &.success {
    border-color: var(--c-success);
    color: var(--c-success);

    &:hover  { border-color: var(--c-success-dark); }
    &:active { border-color: var(--c-success-darker); }
  }

  &.warning {
    border-color: var(--c-warning);
    color: var(--c-warning);

    &:hover  { border-color: var(--c-warning-dark); }
    &:active { border-color: var(--c-warning-darker); }
  }

  &.danger {
    border-color: var(--c-danger);
    color: var(--c-danger);

    &:hover  { border-color: var(--c-danger-dark); }
    &:active { border-color: var(--c-danger-darker); }
  }

  &.disabled {
    opacity: .75;
    cursor: not-allowed;

    &:hover  { background-color: var(--button-secondary-bg); }
    &:active { background-color: var(--button-secondary-bg); }

    &.info {
      &:hover  { border-color: var(--c-info); }
      &:active { border-color: var(--c-info); }
    }

    &.success {
      &:hover  { border-color: var(--c-success); }
      &:active { border-color: var(--c-success); }
    }

    &.warning {
      &:hover  { border-color: var(--c-warning); }
      &:active { border-color: var(--c-warning); }
    }

    &.danger {
      &:hover  { border-color: var(--c-danger); }
      &:active { border-color: var(--c-danger); }
    }
  }

  &.inverse {
    border-color: var(--button-secondary-inverse-border);
    color: var(--button-secondary-inverse-text);

    &:hover  { background-color: var(--button-secondary-inverse-bg-hover); }
    &:active { background-color: var(--button-secondary-inverse-bg-focus); }
  }
}

.SButton.tertiary {
  border-color: transparent;
  color: var(--button-tertiary-text);
  background-color: var(--button-tertiary-bg);

  &:hover  { background-color: var(--button-tertiary-bg-hover); }
  &:active { background-color: var(--button-tertiary-bg-focus); }

  &.disabled {
    opacity: .75;
    cursor: not-allowed;

    &:hover  { background-color: var(--button-tertiary-bg); }
    &:active { background-color: var(--button-tertiary-bg); }
  }

  &.inverse {
    border-color: transparent;
    color: var(--button-tertiary-inverse-text);
    background-color: var(--button-tertiary-inverse-bg);

    &:hover  { background-color: var(--button-tertiary-inverse-bg-hover); }
    &:active { background-color: var(--button-tertiary-inverse-bg-focus); }
  }
}


.SButton.mute {
  color: var(--button-mute-text);

  &:hover  {
    color: var(--button-mute-text-hover);
    background-color: var(--button-mute-bg-hover);
  }

  &:active {
    color: var(--button-mute-text-hover);
    background-color: var(--button-mute-bg-focus);
  }

  &.disabled {
    cursor: not-allowed;

    &:hover  {
      color: var(--button-mute-text);
      background-color: transparent;
    }

    &:active {
      color: var(--button-mute-text);
      background-color: transparent;
    }
  }

  &.inverse {
    color: var(--button-mute-inverse-text);

    &:hover {
      color: var(--button-mute-inverse-text-hover);
      background-color: var(--button-mute-inverse-bg-hover);
    }

    &:active {
      color: var(--button-mute-inverse-text);
      background-color: var(--button-mute-inverse-bg-focus);
    }
  }
}
</style>
