<template>
  <div class="SPlaceholderBlank" :class="classes">
    <transition name="fade">
      <div v-if="!loaded" class="loader">
        <div class="icon">
          <SIconPreloaderDark class="icon-svg" />
        </div>
      </div>
    </transition>

    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import SIconPreloaderDark from './icons/SIconPreloaderDark'

export default {
  components: {
    SIconPreloaderDark
  },

  props: {
    loaded: { type: Boolean, required: true },
    loaderPosition: { type: String, default: 'left' }
  },

  computed: {
    classes () {
      return {
        loaded: this.loaded,
        left: this.loaderPosition === 'left',
        center: this.loaderPosition === 'center',
        right: this.loaderPosition === 'right'
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SPlaceholderBlank {
  position: relative;
  width: 100%;
  min-height: 48px;
}

.SPlaceholderBlank.loaded {
  .content {
    opacity: 1;
  }
}

.SPlaceholderBlank.left .icon {
  top: 0;
  left: 0;
}

.SPlaceholderBlank.center .icon {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.SPlaceholderBlank.right .icon {
  top: 0;
  right: 0;
}

.loader {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  transition: opacity .5s;
}

.loader.fade-enter,
.loader.fade-leave-to {
  opacity: 0;
}

.icon {
  position: absolute;
  display: block;
  width: 48px;
  height: 48px;
}

.icon-svg {
  display: block;
  width: 48px;
  height: 48px;
}

.content {
  opacity: 0;
  transition: opacity .25s;
}
</style>
