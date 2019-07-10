<template lang="md">
<StoryBase>
  <SInputSwitches
    name="input"
    label="Label"
    note="Note text"
    help="This is a help text."
    :options="options"
    v-model="form.input"
  />
</StoryBase>

```html
<template>
  <SInputSwitches
    name="input"
    label="Label"
    note="Note text"
    help="This is a help text."
    :options="options"
    v-model="form.input"
  />
</template>

<script>
import SInputSwitches from '@globalbrain/sefirot/lib/components/inputs/SInputSwitches'

export default {
  components: {
    SInputSwitches
  },

  data () {
    return {
      form: {
        input: [2]
      },

      options: [
        { label: 'Switch 1', value: 1 },
        { label: 'Switch 2', value: 2 },
        { label: 'Switch 3', value: 3 }
      ]
    }
  }
}
</script>
```
</template>

<script>
import SInputSwitches from '@@/lib/components/inputs/SInputSwitches'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SInputSwitches,
    StoryBase
  },

  data () {
    return {
      form: {
        input: [2]
      },

      options: [
        { label: 'Switch 1', value: 1 },
        { label: 'Switch 2', value: 2 },
        { label: 'Switch 3', value: 3 }
      ]
    }
  }
}
</script>
