<template>
  <div class="SPlaceholderImage" :class="{ loaded }">
    <div class="placeholder" :style="styles">
      <div class="loader">
        <div class="icon">
          <SIconPreloaderDark class="icon-svg" />
        </div>
      </div>

      <div class="img">
        <img class="img-src" :src="img" :alt="alt" @load="load">
      </div>
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
    img: { type: String, required: true },
    alt: { type: String, default: '' },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    delay: { type: Number, default: 0 }
  },

  data () {
    return {
      loaded: false
    }
  },

  computed: {
    styles () {
      return {
        paddingBottom: `calc((${this.height} / ${this.width}) * 100%)`
      }
    }
  },

  methods: {
    load () {
      setTimeout(() => {
        this.loaded = true

        this.$emit('load')
      }, this.delay)
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SPlaceholderImage {
  position: relative;
  width: 100%;
}

.SPlaceholderImage.loaded {
  .img {
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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid var(--c-divider);
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

.img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity .5s;
}
</style>
