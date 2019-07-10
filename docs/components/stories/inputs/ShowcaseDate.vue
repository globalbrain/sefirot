<template lang="md">
<StoryBase>
  <div class="input">
    <SInputDate
      name="input"
      label="Label"
      note="Note text"
      help="This is a help text."
      v-model="form.input"
    />
  </div>
</StoryBase>

```html
<template>
  <SInputDate
    name="input"
    label="Label"
    note="Note text"
    help="This is a help text."
    v-model="form.input"
  />
</template>

<script>
import SInputDate from '@globalbrain/sefirot/lib/components/inputs/SInputDate'

export default {
  components: {
    SInputDate
  },

  data () {
    return {
      form: {
        input: null
      }
    }
  }
}
</script>
```
</template>

<script>
import SInputDate from '@@/lib/components/inputs/SInputDate'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SInputDate,
    StoryBase
  },

  data () {
    return {
      form: {
        input: null
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.input {
  width: 192px;
}
</style>
