<template lang="md">
<StoryBase>
  <div class="input">
    <SInputNumber
      name="input"
      label="Label"
      note="Note text"
      help="This is a help text."
      placeholder="123456789"
      v-model="value"
    />
  </div>
</StoryBase>

```vue
<template lang="md">
  <div class="input">
    <SInputNumber
      name="input"
      label="Label"
      note="Note text"
      help="This is a help text."
      placeholder="123456789"
      v-model="value"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputNumber from '@globalbrain/sefirot/lib/components/SInputNumber.vue'

export default defineComponent({
  components: {
    SInputNumber
  },

  setup() {
    const value = ref<number | null>(null)

    return {
      value
    }
  }
})
</script>

<style lang="postcss" scoped>
.input {
  max-width: 320px;
}
</style>
```
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputNumber from '@@/lib/components/SInputNumber.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputNumber,
    StoryBase
  },

  setup() {
    const value = ref<number | null>(null)

    return {
      value
    }
  }
})
</script>

<style lang="postcss" scoped>
.input {
  max-width: 320px;
}
</style>
