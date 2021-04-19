<template lang="md">
<StoryBase title="Clear Mode">
  <SInputTextarea
    v-model="text"
    mode="clear"
    placeholder="Placeholder text"
    :rows="10"
  />
</StoryBase>

```vue
<template>
  <SInputTextarea
    v-model="text"
    mode="clear"
    placeholder="Placeholder text"
    :rows="10"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputTextarea from '@globalbrain/sefirot/lib/components/SInputTextarea.vue'

export default defineComponent({
  components: {
    SInputTextarea
  },

  setup() {
    const text = ref('')

    return {
      text
    }
  }
})
</script>
```
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputTextarea from '@@/lib/components/SInputTextarea.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputTextarea,
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
