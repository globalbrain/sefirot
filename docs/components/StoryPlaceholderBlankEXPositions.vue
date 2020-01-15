<template lang="md">
<StoryBase title="Preloader Positioning">
  <SButton class="button" label="START LOADING" @click="startLoading" />

  <SPlaceholderBlank class="placeholder" :loaded="loaded" loader-position="left">
    <p class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </SPlaceholderBlank>

  <SPlaceholderBlank class="placeholder" :loaded="loaded" loader-position="center">
    <p class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </SPlaceholderBlank>

  <SPlaceholderBlank class="placeholder" :loaded="loaded" loader-position="right">
    <p class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </SPlaceholderBlank>
</StoryBase>

```html
<template>
  <SButton label="START LOADING" @click="startLoading" />

  <SPlaceholderBlank :loaded="loaded" loader-position="left">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </SPlaceholderBlank>

  <SPlaceholderBlank :loaded="loaded" loader-position="center">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </SPlaceholderBlank>

  <SPlaceholderBlank :loaded="loaded" loader-position="right">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </SPlaceholderBlank>
</template>

<script>
import SButton from '@globalbrain/sefirot/lib/components/SButton'
import SPlaceholderBlank from '@globalbrain/sefirot/lib/components/SPlaceholderBlank'

export default {
  components: {
    SButton,
    SPlaceholderBlank
  },

  data () {
    return {
      loaded: false
    }
  },

  mounted () {
    setTimeout(() => { this.loaded = true }, 3000)
  },

  methods: {
    startLoading () {
      this.loaded = false

      setTimeout(() => { this.loaded = true }, 3000)
    }
  }
}
</script>
```
</template>

<script>
import SButton from '@@/lib/components/SButton'
import SPlaceholderBlank from '@@/lib/components/SPlaceholderBlank'
import StoryBase from '@/components/StoryBase'

export default {
  components: {
    SButton,
    SPlaceholderBlank,
    StoryBase
  },

  data () {
    return {
      loaded: false
    }
  },

  mounted () {
    setTimeout(() => { this.loaded = true }, 3000)
  },

  methods: {
    startLoading () {
      this.loaded = false

      setTimeout(() => { this.loaded = true }, 3000)
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.button {
  margin-bottom: 32px;
}

.placeholder + .placeholder {
  margin-top: 24px;
}

.text {
  margin: 0;
}
</style>
