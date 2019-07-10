<template lang="md">
<StoryBase>
  <SPlaceholderBlank :loaded="loaded">
    <p class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </SPlaceholderBlank>
</StoryBase>

```html
<template>
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
import SPlaceholderBlank from '@globalbrain/sefirot/lib/components/placeholders/SPlaceholderBlank'

export default {
  components: {
    SPlaceholderBlank
  },

  data () {
    return {
      loaded: false
    }
  },

  mounted () {
    setTimeout(() => { this.loaded = true }, 3000)
  }
}
</script>
```
</template>

<script>
import SPlaceholderBlank from '@@/lib/components/placeholders/SPlaceholderBlank'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
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
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.text {
  margin: 0;
}
</style>
