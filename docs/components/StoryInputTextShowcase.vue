<template lang="md">
<StoryBase>
  <SInputText
    v-model="data.name"
    name="name"
    label="Label"
    note="Required"
    help="Please fill in your name."
    placeholder="John Doe"
    :validation="validation.name"
  />
</StoryBase>

```html
Coming soon...
```
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'
import { require } from '@@/lib/validation/rules'
import useForm from '@@/lib/compositions/useForm'
import SInputText from '@@/lib/components/SInputText.vue'
import StoryBase from '@/components/StoryBase.vue'

export default createComponent({
  components: {
    SInputText,
    StoryBase
  },

  setup () {
    const { data, validation } = useForm({
      data: {
        name: ''
      },
      rules: {
        name: [
          new require('Name is required.')
        ]
      }
    })

    return {
      data,
      validation
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
