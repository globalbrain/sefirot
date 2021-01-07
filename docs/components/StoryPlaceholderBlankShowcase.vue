<template lang="md">
<StoryBase>
  <SButton class="button" label="START LOADING" @click="startLoading" />

  <SPlaceholderBlank :loaded="loaded">
    <p class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </SPlaceholderBlank>
</StoryBase>

```html
<template>
  <SButton label="START LOADING" @click="startLoading" />

  <SPlaceholderBlank :loaded="loaded">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
    </p>
  </SPlaceholderBlank>
</template>

<script>
import SButton from '@globalbrain/sefirot/lib/components/buttons/SButton'
import SPlaceholderBlank from '@globalbrain/sefirot/lib/components/placeholders/SPlaceholderBlank'

export default {
  components: {
    SButton,
    SPlaceholderBlank
  },

  data() {
    return {
      loaded: false
    }
  },

  mounted() {
    setTimeout(() => { this.loaded = true }, 3000)
  },

  methods: {
    startLoading() {
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

.text {
  margin: 0;
}
</style>
