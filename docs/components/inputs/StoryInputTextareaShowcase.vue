<template lang="md">
<StoryBase>
  <SInputTextarea
    name="input"
    label="Label"
    note="Note text"
    help="This is a help text."
    placeholder="Placeholder text."
    :rows="5"
    v-model="text"
  />
</StoryBase>

```vue
<template>
  <SInputTextarea
    name="input"
    label="Label"
    note="Note text"
    help="This is a help text."
    placeholder="Placeholder text."
    :rows="5"
    v-model="text"
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
