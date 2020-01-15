<template lang="md">
<StoryBase>
  <SInputCheckbox
    name="input01"
    label="Label"
    note="Note text"
    text="Text for the checkbox"
    help="This is a help text."
    v-model="form.input"
  />
</StoryBase>

```html
<template>
  <SInputCheckbox
    name="input01"
    label="Label"
    note="Note text"
    text="Text for the checkbox"
    help="This is a help text."
    v-model="form.input"
  />
</template>

<script>
import SInputCheckbox from '@globalbrains/sefirot/lib/components/SInputCheckbox'

export default {
  components: {
    SInputCheckbox
  },

  data () {
    return {
      form: {
        input: false
      }
    }
  }
}
</script>
```
</template>

<script>
import SInputCheckbox from '@@/lib/components/SInputCheckbox'
import StoryBase from '@/components/StoryBase'

export default {
  components: {
    SInputCheckbox,
    StoryBase
  },

  data () {
    return {
      form: {
        input: false
      }
    }
  }
}
</script>
