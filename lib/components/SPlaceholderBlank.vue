<template>
  <div class="SPlaceholderBlank" :class="classes">
    <transition name="fade">
      <div v-if="!loaded" class="loader">
        <div class="icon">
          <SIconPreloaderLight v-if="$colorMode && $colorMode.value === 'dark'" class="icon-svg" />
          <SIconPreloaderDark v-else class="icon-svg" />
        </div>
      </div>
    </transition>

    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import SIconPreloaderDark from './icons/SIconPreloaderDark.vue'
import SIconPreloaderLight from './icons/SIconPreloaderLight.vue'

export default defineComponent({
  components: {
    SIconPreloaderDark,
    SIconPreloaderLight
  },

  props: {
    loaded: { type: Boolean, required: true },
    loaderPosition: { type: String, default: 'left' }
  },

  setup(props) {
    const classes = computed(() => ({
      loaded: props.loaded,
      left: props.loaderPosition === 'left',
      center: props.loaderPosition === 'center',
      right: props.loaderPosition === 'right'
    }))

    return {
      classes
    }
  }
})
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
