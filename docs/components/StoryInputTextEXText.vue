<template lang="md">
<StoryBase title="Input with text">
  <div class="input">
    <SInputText
      v-model="text"
      name="text-name"
      text="$"
      text-after="USD"
      placeholder="0.00"
    />
  </div>
</StoryBase>

```html
<template>
  <div class="input">
    <SInputText
      v-model="text"
      name="text-name"
      text="$"
      text-after="USD"
      placeholder="0.00"
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

  setup () {
    const text = ref('')

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
    const text = ref('')

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
