<template lang="md">
<StoryBase title="Clearable Input">
  <div class="input">
    <SInputText
      v-model="text"
      name="name"
      label="Label"
      clearable
      placeholder="Start searching..."
      @clear="text = ''"
    />
  </div>
</StoryBase>

```html
<template>
  <div class="input">
    <SInputText
      v-model="text"
      name="name"
      label="Label"
      clearable
      placeholder="Start searching..."
      @clear="text = ''"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputText from '@globalbrain/sefirot/lib/components/SInputText.vue'

export default defineComponent({
  components: {
    SInputText
  },

  setup() {
    const text = ref('Initial value')

    return {
      text
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.input {
  max-width: 320px;
}
</style>
```
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputText from '@@/lib/components/SInputText.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputText,
    StoryBase
  },

  setup () {
    const text = ref('Initial value')

    return {
      text
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.input {
  max-width: 320px;
}
</style>
