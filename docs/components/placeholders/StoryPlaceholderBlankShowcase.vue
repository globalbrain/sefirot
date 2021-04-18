<template lang="md">
<StoryBase>
  <SButton class="button" label="START LOADING" @click="startLoading" />

  <SPlaceholderBlank :loaded="loaded">
    <p class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </SPlaceholderBlank>
</StoryBase>

```vue
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

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'
import SPlaceholderBlank from '@globalbrain/sefirot/lib/components/SPlaceholderBlank.vue'

export default defineComponent({
  components: {
    SButton,
    SPlaceholderBlank
  },

  setup() {
    const loaded = ref(false)

    onMounted(() => {
      startTimer()
    })

    function startLoading(): void {
      loaded.value = false
      startTimer()
    }

    function startTimer(): void {
      setTimeout(() => { loaded.value = true }, 3000)
    }

    return {
      loaded,
      startLoading
    }
  }
})
</script>
```
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import SButton from '@@/lib/components/SButton.vue'
import SPlaceholderBlank from '@@/lib/components/SPlaceholderBlank.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SButton,
    SPlaceholderBlank,
    StoryBase
  },

  setup() {
    const loaded = ref(false)

    onMounted(() => {
      startTimer()
    })

    function startLoading(): void {
      loaded.value = false
      startTimer()
    }

    function startTimer(): void {
      setTimeout(() => { loaded.value = true }, 3000)
    }

    return {
      loaded,
      startLoading
    }
  }
})
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
