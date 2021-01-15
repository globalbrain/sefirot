<template>
  <component
    :is="tag"
    class="SButton"
    :class="classes"
    :to="to"
    role="button"
    @click="$emit('click')"
  >
    <span class="content">
      <span v-if="icon" class="icon"><component :is="icon" class="icon-svg" /></span>
      <span v-if="label" class="label">{{ label }}</span>
    </span>

    <transition name="fade">
      <span v-if="loading" key="loading" class="loader">
        <component :is="preloaderComponent" class="loader-icon" />
      </span>
    </transition>
  </component>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@vue/composition-api'
import SIconPreloaderDark from './icons/SIconPreloaderDark.vue'
import SIconPreloaderLight from './icons/SIconPreloaderLight.vue'

type Size = 'mini' | 'small' | 'medium' | 'large' | 'jumbo'

export default defineComponent({
  props: {
    label: { type: String, default: null },
    tag: { type: String, default: 'button' },
    to: { type: String, default: '/' },
    type: { type: String, default: 'primary' },
    mode: { type: String, default: 'neutral' },
    size: { type: String as PropType<Size>, default: 'medium' },
    rounded: { type: Boolean, default: false },
    icon: { type: Object, default: null },
    block: { type: Boolean, default: false },
    inverse: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
  },

  setup(props) {
    const classes = computed(() => {
      return {
        primary: props.type === 'primary',
        secondary: props.type === 'secondary',
        tertiary: props.type === 'tertiary',
        text: props.type === 'text',
        mute: props.type === 'mute',
        neutral: props.mode === 'neutral',
        info: props.mode === 'info',
        success: props.mode === 'success',
        warning: props.mode === 'warning',
        danger: props.mode === 'danger',
        mini: props.size === 'mini',
        small: props.size === 'small',
        medium: props.size === 'medium',
        large: props.size === 'large',
        jumbo: props.size === 'jumbo',
        rounded: props.rounded,
        block: props.block,
        inverse: props.inverse,
        'has-label': props.label,
        'has-icon': props.icon,
        loading: props.loading
      }
    })

    const preloaderComponent = computed(() => {
      if (props.mode !== 'neutral') {
        return SIconPreloaderLight
      }

      if (!props.inverse && props.type === 'primary') {
        return SIconPreloaderLight
      }

      if (!props.inverse && props.type !== 'primary') {
        return SIconPreloaderDark
      }

      if (props.inverse && props.type === 'primary') {
        return SIconPreloaderDark
      }

      return SIconPreloaderLight
    })

    return {
      classes,
      preloaderComponent
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SButton {
  position: relative;
  display: inline-block;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 4px;
  letter-spacing: 1px;
  font-size: 13px;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  transition: color .25s, border-color .25s, background-color .25s;
}

.SButton.primary {
  color: var(--button-primary-text);
  background-color: var(--button-primary-bg);

  &:hover  { background-color: var(--button-primary-bg-hover); }
  &:active { background-color: var(--button-primary-bg-focus); }

  &.info {
    background-color: var(--c-info);

    &:hover  { background-color: var(--c-info-dark); }
    &:active { background-color: var(--c-info-darker); }
  }

  &.success {
    background-color: var(--c-success);

    &:hover  { background-color: var(--c-success-dark); }
    &:active { background-color: var(--c-success-darker); }
  }

  &.warning {
    background-color: var(--c-warning);

    &:hover  { background-color: var(--c-warning-dark); }
    &:active { background-color: var(--c-warning-darker); }
  }

  &.danger {
    background-color: var(--c-danger);

    &:hover  { background-color: var(--c-danger-dark); }
    &:active { background-color: var(--c-danger-darker); }
  }

  &.inverse {
    color: var(--button-primary-inverse-text);
    background-color: var(--button-primary-inverse-bg);

    &:hover  { background-color: var(--button-primary-inverse-bg-hover); }
    &:active { background-color: var(--button-primary-inverse-bg-focus); }

    &.info {
      color: var(--c-text-light-1);
      background-color: var(--c-info-light);

      &:hover  { background-color: var(--c-info); }
      &:active { background-color: var(--c-info-dark); }
    }

    &.success {
      color: var(--c-text-light-1);
      background-color: var(--c-success);

      &:hover  { background-color: var(--c-success-dark); }
      &:active { background-color: var(--c-success-darker); }
    }

    &.warning {
      color: var(--c-text-light-1);
      background-color: var(--c-warning);

      &:hover  { background-color: var(--c-warning-dark); }
      &:active { background-color: var(--c-warning-darker); }
    }

    &.danger {
      color: var(--c-text-light-1);
      background-color: var(--c-danger);

      &:hover  { background-color: var(--c-danger-dark); }
      &:active { background-color: var(--c-danger-darker); }
    }
  }
}

.SButton.secondary {
  border-color: var(--button-secondary-border);
  color: var(--button-secondary-text);

  &:hover  { background-color: var(--button-secondary-bg-hover); }
  &:active { background-color: var(--button-secondary-bg-focus); }

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

  &.inverse {
    border-color: transparent;
    color: var(--button-tertiary-inverse-text);
    background-color: var(--button-tertiary-inverse-bg);

    &:hover  { background-color: var(--button-tertiary-inverse-bg-hover); }
    &:active { background-color: var(--button-tertiary-inverse-bg-focus); }
  }
}

.SButton.text {
  color: var(--button-text-text);

  &:hover  { background-color: var(--button-text-bg-hover); }
  &:active { background-color: var(--button-text-bg-focus); }

  &.info    { color: var(--c-info); }
  &.success { color: var(--c-success); }
  &.warning { color: var(--c-warning); }
  &.danger  { color: var(--c-danger); }

  &.inverse {
    color: var(--button-text-inverse-text);

    &:hover  { background-color: var(--button-text-inverse-bg-hover); }
    &:active { background-color: var(--button-text-inverse-bg-focus); }
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

.SButton.mini {
  width: 28px;
  height: 28px;
  font-size: 12px;

  .icon-svg {
    width: 14px;
    height: 14px;
  }
}

.SButton.mini.rounded {
  border-radius: 14px;
}

.SButton.mini.has-label {
  padding: 0 8px;
  width: auto;
}

.SButton.mini.has-label.block {
  width: 100%;
}

.SButton.mini.has-icon {
  .label {
    padding-right: 1px;
    padding-left: 6px;
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
}

.SButton.small.rounded {
  border-radius: 16px;
}

.SButton.small.has-label {
  padding: 0 10px;
  width: auto;
}

.SButton.small.has-label.block {
  width: 100%;
}

.SButton.small.has-icon {
  .label {
    padding-right: 1px;
    padding-left: 8px;
  }
}

.SButton.medium {
  width: 40px;
  height: 40px;
  font-size: 13px;

  .icon-svg {
    width: 16px;
    height: 16px;
  }
}

.SButton.medium.rounded {
  border-radius: 20px;
}

.SButton.medium.has-label {
  padding: 0 12px;
  width: auto;
}

.SButton.medium.has-label.block {
  width: 100%;
}

.SButton.medium.has-icon {
  .label {
    padding-right: 1px;
    padding-left: 8px;
  }
}

.SButton.large {
  width: 48px;
  height: 48px;
  font-size: 14px;

  .label {
    transform: translateY(.5px);
  }

  .icon-svg {
    width: 18px;
    height: 18px;
  }
}

.SButton.large.rounded {
  border-radius: 24px;
}

.SButton.large.has-label {
  padding: 0 14px;
  width: auto;
}

.SButton.large.has-label.block {
  width: 100%;
}

.SButton.large.has-icon {
  .label {
    padding-right: 2px;
    padding-left: 10px;
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
}

.SButton.jumbo.rounded {
  border-radius: 32px;
}

.SButton.jumbo.has-label {
  padding: 0 24px;
  width: auto;
}

.SButton.jumbo.has-label.block {
  width: 100%;
}

.SButton.jumbo.has-icon {
  .label {
    padding-right: 2px;
    padding-left: 10px;
  }
}

.SButton.block {
  display: block;
  width: 100%;
}

.SButton.loading {
  &.primary {
    &:hover  { background-color: var(--c-black); }
    &:active { background-color: var(--c-black); }

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
  transition: opacity .25s, transform .25s;
}

.icon-svg {
  fill: currentColor;
  transition: fill .25s;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 32px;
  height: 32px;
  transform: translate(-50%, -50%);
  transition: opacity .25s, transform .25s;
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
</style>
