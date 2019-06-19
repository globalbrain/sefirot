<template>
  <component
    :is="tag"
    class="SButton"
    :class="classes"
    :to="to"
    role="button"
    @click="$emit('click')"
  >
    <span class="content">{{ label }}</span>

    <transition name="fade">
      <span class="loader" key="loading" v-if="loading">
        <component :is="preloaderComponent" class="loader-icon" />
      </span>
    </transition>
  </component>
</template>

<script>
import SIconPreloaderDark from '../icons/SIconPreloaderDark'
import SIconPreloaderLight from '../icons/SIconPreloaderLight'

export default {
  props: {
    label: { type: String, required: true },
    tag: { type: String, default: 'button' },
    to: { type: String, default: '/' },
    type: { type: String, default: 'primary' },
    mode: { type: String, default: 'neutral' },
    size: { type: String, default: 'medium' },
    block: { type: Boolean, default: false },
    inverse: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
  },

  computed: {
    classes () {
      return {
        primary: this.type === 'primary',
        secondary: this.type === 'secondary',
        text: this.type === 'text',
        mute: this.type === 'mute',
        neutral: this.mode === 'neutral',
        info: this.mode === 'info',
        success: this.mode === 'success',
        warning: this.mode === 'warning',
        danger: this.mode === 'danger',
        medium: this.size === 'medium',
        large: this.size === 'large',
        block: this.block,
        inverse: this.inverse,
        loading: this.loading
      }
    },

    preloaderComponent () {
      if (this.mode !== 'neutral') {
        return SIconPreloaderLight
      }

      if (!this.inverse && this.type === 'primary') {
        return SIconPreloaderLight
      }

      if (!this.inverse && this.type !== 'primary') {
        return SIconPreloaderDark
      }

      if (this.inverse && this.type === 'primary') {
        return SIconPreloaderDark
      }

      return SIconPreloaderLight
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SButton {
  position: relative;
  display: inline-block;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 2px;
  min-width: 64px;
  font-size: 14px;
  transition: color .25s, border-color .25s, background-color .25s;
  overflow: hidden;
}

.SButton.primary {
  color: var(--c-white);
  background-color: var(--c-black);

  &:hover {
    background-color: rgba(0, 0, 0, .8);
  }

  &:active {
    background-color: rgba(0, 0, 0, .7);
  }

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
    color: var(--c-black);
    background-color: var(--c-white);

    &:hover  { background-color: rgba(255, 255, 255, .85); }
    &:active { background-color: rgba(255, 255, 255, .75); }

    &.info {
      color: var(--c-white);
      background-color: var(--c-info);

      &:hover  { background-color: var(--c-info-dark); }
      &:active { background-color: var(--c-info-darker); }
    }

    &.success {
      color: var(--c-white);
      background-color: var(--c-success);

      &:hover  { background-color: var(--c-success-dark); }
      &:active { background-color: var(--c-success-darker); }
    }

    &.warning {
      color: var(--c-white);
      background-color: var(--c-warning);

      &:hover  { background-color: var(--c-warning-dark); }
      &:active { background-color: var(--c-warning-darker); }
    }

    &.danger {
      color: var(--c-white);
      background-color: var(--c-danger);

      &:hover  { background-color: var(--c-danger-dark); }
      &:active { background-color: var(--c-danger-darker); }
    }
  }
}

.SButton.secondary {
  border-color: var(--c-black);
  color: var(--c-black);

  &:hover {
    background-color: rgba(0, 0, 0, .05);
  }

  &:active {
    background-color: rgba(0, 0, 0, .1);
  }

  &.inverse {
    border-color: var(--c-white);
    color: var(--c-white);

    &:hover {
      background-color: rgba(255, 255, 255, .15);
    }

    &:active {
      background-color: rgba(255, 255, 255, .25);
    }
  }
}

.SButton.text {
  color: var(--c-black);

  &:hover {
    background-color: rgba(0, 0, 0, .05);
  }

  &:active {
    background-color: rgba(0, 0, 0, .1);
  }

  &.inverse {
    color: var(--c-white);

    &:hover {
      background-color: rgba(255, 255, 255, .15);
    }

    &:active {
      background-color: rgba(255, 255, 255, .25);
    }
  }
}

.SButton.mute {
  color: var(--c-gray);

  &:hover {
    color: var(--c-black);
    background-color: rgba(0, 0, 0, .05);
  }

  &:active {
    color: var(--c-black);
    background-color: rgba(0, 0, 0, .1);
  }

  &.inverse {
    &:hover {
      color: var(--c-white);
      background-color: rgba(255, 255, 255, .15);
    }

    &:active {
      color: var(--c-white);
      background-color: rgba(255, 255, 255, .25);
    }
  }
}

.SButton.medium {
  padding: 0 16px;
  line-height: 38px;
}

.SButton.large {
  padding: 0 32px;
  line-height: 46px;
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
  display: inline-block;
  transition: opacity .25s, transform .25s;
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
