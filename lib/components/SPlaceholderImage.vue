<template>
  <SPlaceholderBlank class="SPlaceholderImage" :loaded="isLoaded">
    <div class="placeholder" :style="styles" />

    <div class="img">
      <img class="img-src" :src="img" :alt="alt" @load="handleLoad">
    </div>
  </SPlaceholderBlank>
</template>

<script lang="ts">
import { computed, ref, defineComponent } from '@vue/composition-api'
import SPlaceholderBlank from './SPlaceholderBlank.vue'

export default defineComponent({
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

  setup(props, { emit }) {
    const isLoaded = ref(false)

    const styles = computed(() => ({
      paddingBottom: `calc((${props.height} / ${props.width}) * 100%)`
    }))

    function handleLoad(): void {
      setTimeout(() => {
        isLoaded.value = true

        emit('load')
      }, props.delay)
    }

    return {
      isLoaded,
      styles,
      handleLoad
    }
  }
})
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
