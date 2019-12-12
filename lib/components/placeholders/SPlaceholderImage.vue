<template>
  <SPlaceholderBlank class="SPlaceholderImage" :loaded="loaded">
    <div class="placeholder" :style="styles" />

    <div class="img">
      <img class="img-src" :src="img" :alt="alt" @load="load">
    </div>
  </SPlaceholderBlank>
</template>

<script>
import SPlaceholderBlank from './SPlaceholderBlank'

export default {
  components: {
    SPlaceholderBlank
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

.SPlaceholderImage >>> .loader {
  justify-content: center;
  align-items: center;
  border: 1px solid var(--c-divider-light);
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
