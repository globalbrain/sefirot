<template lang="md">
<StoryBase>
  <SInputRadios
    name="input"
    label="Label"
    note="Note text"
    help="This is a help text."
    :nullable="false"
    :options="options"
    v-model="form.input"
  />
</StoryBase>

```html
<template>
  <SInputRadios
    name="input"
    label="Label"
    note="Note text"
    help="This is a help text."
    :nullable="false"
    :options="options"
    v-model="form.input"
  />
</template>

<script>
import SInputRadios from '@@/lib/components/inputs/SInputRadios'

export default {
  components: {
    SInputRadios
  },

  data () {
    return {
      form: {
        input: 1
      },

      options: [
        { label: 'Radio button 1', value: 1 },
        { label: 'Radio button 2', value: 2 },
        { label: 'Radio button 3', value: 3 }
      ]
    }
  }
}
</script>
```
</template>

<script>
import SInputRadios from '@@/lib/components/inputs/SInputRadios'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SInputRadios,
    StoryBase
  },

  data () {
    return {
      form: {
        input: 1
      },

      options: [
        { label: 'Radio button 1', value: 1 },
        { label: 'Radio button 2', value: 2 },
        { label: 'Radio button 3', value: 3 }
      ]
    }
  }
}
</script>
