<template lang="md">
<StoryBase>
  <div class="input">
    <SInputSelect
      name="input"
      label="Label"
      note="Note text"
      help="This is a help text."
      placeholder="Please select an item"
      :options="options"
      v-model="form.input"
    />
  </div>
</StoryBase>

```html
<template>
  <SInputSelect
    name="input"
    label="Label"
    note="Note text"
    help="This is a help text."
    placeholder="Please select an item"
    :options="options"
    v-model="form.input"
  />
</template>

<script>
import SInputSelect from '@globalbrain/sefirot/lib/components/inputs/SInputSelect'

export default {
  components: {
    SInputSelect
  },

  data () {
    return {
      form: {
        input: null
      },

      options: [
        { label: 'First option', value: 1 },
        { label: 'Second option', value: 2 },
        { label: 'Third option', value: 3 }
      ]
    }
  }
}
</script>
```
</template>

<script>
import SInputSelect from '@@/lib/components/inputs/SInputSelect'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SInputSelect,
    StoryBase
  },

  data () {
    return {
      form: {
        input: null
      },

      options: [
        { label: 'First option', value: 1 },
        { label: 'Second option', value: 2 },
        { label: 'Third option', value: 3 }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
.input {
  max-width: 320px;
}
</style>
