<template lang="md">
<StoryBase>
  <SInputTextarea
    name="input"
    label="Label"
    note="Note text"
    help="This is a help text."
    placeholder="Placeholder text."
    :rows="5"
    v-model="form.input"
  />
</StoryBase>

```html
<template>
  <SInputTextarea
    name="input"
    label="Label"
    note="Note text"
    help="This is a help text."
    placeholder="Placeholder text."
    :rows="5"
    v-model="form.input"
  />
</template>

<script>
import SInputTextarea from '@globalbrain/sefirot/lib/components/inputs/SInputTextarea'

export default {
  components: {
    SInputTextarea
  },

  data () {
    return {
      form: {
        input: ''
      }
    }
  }
}
</script>
```
</template>

<script>
import SInputTextarea from '@@/lib/components/SInputTextarea'
import StoryBase from '@/components/StoryBase'

export default {
  components: {
    SInputTextarea,
    StoryBase
  },

  data () {
    return {
      form: {
        input: ''
      }
    }
  }
}
</script>
