<template lang="md">
<StoryBase>
  <div class="item">
    <SInputSwitch
      name="input"
      label="Label"
      note="Note text"
      text="Text for the switch"
      help="This is a help text."
      v-model="form.input"
    />
  </div>
</StoryBase>

```html
<template>
  <SInputSwitch
    name="input"
    label="Label"
    note="Note text"
    text="Text for the switch"
    help="This is a help text."
    v-model="form.input"
  />
</template>

<script>
import SInputSwitch from '@globalbrain/sefirot/lib/components/inputs/SInputSwitch'

export default {
  components: {
    SInputSwitch
  },

  data() {
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
import SInputSwitch from '@@/lib/components/SInputSwitch'
import StoryBase from '@/components/StoryBase'

export default {
  components: {
    SInputSwitch,
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

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.item {
  width: 192px;
}
</style>
