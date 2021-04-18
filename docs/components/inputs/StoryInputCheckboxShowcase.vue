<template lang="md">
<StoryBase>
  <SInputCheckbox
    name="input01"
    label="Label"
    note="Note text"
    text="Text for the checkbox"
    help="This is a help text."
    v-model="value"
  />
</StoryBase>

```vue
<template>
  <SInputCheckbox
    name="input01"
    label="Label"
    note="Note text"
    text="Text for the checkbox"
    help="This is a help text."
    v-model="value"
  />
</template>

<script lang="ts">
import SInputCheckbox from '@globalbrains/sefirot/lib/components/SInputCheckbox.vue'

export default defineComponent({
  components: {
    SInputCheckbox
  },

  setup() {
    const value = ref(false)

    return {
      value
    }
  }
})
</script>
```
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputCheckbox from '@@/lib/components/SInputCheckbox.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputCheckbox,
    StoryBase
  },

  setup() {
    const value = ref(false)

    return {
      value
    }
  }
})
</script>
