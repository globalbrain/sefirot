<template>
  <div class="SPlaceholderBlank" :class="{ loaded }">
    <transition name="fade">
      <div class="loader" v-if="!loaded">
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
import SIconPreloaderDark from '../icons/SIconPreloaderDark'

export default {
  components: {
    SIconPreloaderDark
  },

  props: {
    loaded: { type: Boolean, required: true }
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

.loader.fade-leave-to {
  opacity: 0;
}

.icon {
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
