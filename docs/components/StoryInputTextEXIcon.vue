<template lang="md">
<StoryBase title="Input with Icon">
  <div class="input">
    <SInputText
      v-model="text"
      name="name"
      label="Label"
      :icon="icon"
      placeholder="Start searching..."
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
      :icon="icon"
      placeholder="Start searching..."
    />
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import SIconSearch from '@globalbrain/sefirot/lib/components/icons/SIconSearch.vue'
import SInputText from '@globalbrain/sefirot/lib/components/SInputText.vue'

export default createComponent({
  components: {
    SInputText
  },

  setup () {
    const text = ref('')

    return {
      icon: SIconSearch,
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
import { createComponent, ref } from '@vue/composition-api'
import SIconSearch from '@@/lib/components/icons/SIconSearch.vue'
import SInputText from '@@/lib/components/SInputText.vue'
import StoryBase from '@/components/StoryBase.vue'

export default createComponent({
  components: {
    SInputText,
    StoryBase
  },

  setup () {
    const text = ref('')

    return {
      icon: SIconSearch,
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
