<template lang="md">
<StoryBase title="Filled input">
  <div class="input">
    <SInputText
      v-model="text"
      mode="filled"
      name="name-filled"
      label="Name"
      placeholder="John Doe"
    />
  </div>
</StoryBase>

```vue
<template>
  <div class="input">
    <SInputText
      v-model="text"
      mode="filled"
      name="name"
      label="Label"
      placeholder="John Doe"
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

  setup() {
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
