<template lang="md">
<StoryBase>
  <SInputRadios
    name="input"
    label="Label"
    note="Note text"
    help="This is a help text."
    :nullable="false"
    :options="options"
    v-model="value"
  />
</StoryBase>

```vue
<template>
  <SInputRadios
    name="input"
    label="Label"
    note="Note text"
    help="This is a help text."
    :nullable="false"
    :options="options"
    v-model="value"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputRadios from '@@/lib/components/SInputRadios'

export default defineComponent({
  components: {
    SInputRadios
  },

  setup() {
    const value = ref(1)

    const options = [
      { label: 'Radio button 1', value: 1 },
      { label: 'Radio button 2', value: 2 },
      { label: 'Radio button 3', value: 3 }
    ]

    return {
      value,
      options
    }
  }
})
</script>
```
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputRadios from '@@/lib/components/SInputRadios.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputRadios,
    StoryBase
  },

  setup() {
    const value = ref(1)

    const options = [
      { label: 'Radio button 1', value: 1 },
      { label: 'Radio button 2', value: 2 },
      { label: 'Radio button 3', value: 3 }
    ]

    return {
      value,
      options
    }
  }
})
</script>
