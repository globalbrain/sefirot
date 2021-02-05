<template lang="md">
<StoryBase>
  <div class="input">
    <SInputNumber
      name="input"
      label="Label"
      note="Note text"
      help="This is a help text."
      placeholder="Placeholder text"
      v-model="form.input"
    />
  </div>
</StoryBase>

```html
<template lang="md">
  <div class="input">
    <SInputNumber
      name="input"
      label="Label"
      note="Note text"
      help="This is a help text."
      placeholder="Placeholder text"
      v-model="input"
    />
  </div>
</template>

<script>
import SInputNumber from '@globalbrain/sefirot/lib/components/SInputNumber.vue'

export default {
  components: {
    SInputNumber
  },

  data() {
    return {
      input: null
    }
  }
}
</script>

<style lang="postcss" scoped>
.input {
  max-width: 320px;
}
</style>
```
</template>

<script>
import SInputNumber from '@@/lib/components/SInputNumber'
import StoryBase from '@/components/StoryBase'

export default {
  components: {
    SInputNumber,
    StoryBase
  },

  data() {
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
  max-width: 320px;
}
</style>
