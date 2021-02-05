<template lang="md">
<StoryBase title="Show input number with thousand separator">
  <div class="input">
    <SInputNumber
      v-model="input"
      text="$"
      textAfter="USD"
      placeholder="Placeholder text"
      :separator-help="true"
    />
  </div>
</StoryBase>

```html
<template>
  <div class="input">
    <SInputNumber
      v-model="input"
      text="$"
      textAfter="USD"
      placeholder="Placeholder text"
      :separator-help="true"
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
