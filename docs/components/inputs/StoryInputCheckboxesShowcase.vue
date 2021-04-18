<template lang="md">
<StoryBase>
  <SInputCheckboxes
    name="input01"
    label="Label"
    note="Note text"
    help="This is a help text."
    :options="options"
    v-model="form.input"
  />
</StoryBase>

```html
<template>
  <SInputCheckboxes
    name="input"
    label="Label"
    note="Note text"
    help="This is a help text."
    :options="options"
    v-model="form.input"
  />
</template>

<script>
import SInputCheckboxes from '@globalbrains/sefirot/lib/components/SInputCheckboxes'

export default {
  components: {
    SInputCheckboxes
  },

  data() {
    return {
      form: {
        input: []
      },

      options: [
        { label: 'Check box 1', value: 1 },
        { label: 'Check box 2', value: 2 },
        { label: 'Check box 3', value: 3 }
      ]
    }
  }
}
</script>
```
</template>

<script>
import SInputCheckboxes from '@@/lib/components/SInputCheckboxes'
import StoryBase from '@/components/StoryBase'

export default {
  components: {
    SInputCheckboxes,
    StoryBase
  },

  data () {
    return {
      form: {
        input: []
      },

      options: [
        { label: 'Check box 1', value: 1 },
        { label: 'Check box 2', value: 2 },
        { label: 'Check box 3', value: 3 }
      ]
    }
  }
}
</script>
