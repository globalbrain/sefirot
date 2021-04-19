<template lang="md">
<StoryBase>
  <SInputCheckboxes
    name="input01"
    label="Label"
    note="Note text"
    help="This is a help text."
    :options="options"
    v-model="input"
  />
</StoryBase>

```vue
<template>
  <SInputCheckboxes
    name="input"
    label="Label"
    note="Note text"
    help="This is a help text."
    :options="options"
    v-model="input"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputCheckboxes from '@globalbrains/sefirot/lib/components/SInputCheckboxes.vue'

export default defineComponent({
  components: {
    SInputCheckboxes
  },

  setup() {
    const input = ref([])

    const options = [
      { label: 'Check box 1', value: 1 },
      { label: 'Check box 2', value: 2 },
      { label: 'Check box 3', value: 3 }
    ]

    return {
      input,
      options
    }
  }
})
</script>
```
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputCheckboxes from '@@/lib/components/SInputCheckboxes.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputCheckboxes,
    StoryBase
  },

  setup() {
    const input = ref([])

    const options = [
      { label: 'Check box 1', value: 1 },
      { label: 'Check box 2', value: 2 },
      { label: 'Check box 3', value: 3 }
    ]

    return {
      input,
      options
    }
  }
})
</script>
