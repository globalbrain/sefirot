<template lang="md">
<StoryBase title="Input with Action">
  <div class="input">
    <SInputText
      v-model="text"
      name="action-name"
      :action="action"
      placeholder="Start searching..."
    />
  </div>
</StoryBase>

```vue
<template>
  <div class="input">
    <SInputText
      v-model="text"
      name="action-name"
      :action="action"
      placeholder="Start searching..."
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SIconSliders from '@globalbrain/sefirot/components/icons/SIconSliders.vue'
import SInputText from '@globalbrain/sefirot/lib/components/SInputText.vue'

export default defineComponent({
  components: {
    SIconSliders,
    SInputText
  },

  setup() {
    const action = {
      type: 'select',
      icon: SIconSliders,
      text: 'Filters',
      clickable: true
    }

    const text = ref('')

    return {
      action,
      text
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.input {
  max-width: 480px;
}
</style>
```
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SIconSliders from '@@/lib/components/icons/SIconSliders.vue'
import SInputText from '@@/lib/components/SInputText.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputText,
    StoryBase
  },

  setup() {
    const action = {
      type: 'select',
      icon: SIconSliders,
      text: 'Filters',
      clickable: true
    }

    const text = ref('')

    return {
      action,
      text
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.input {
  max-width: 480px;
}
</style>
