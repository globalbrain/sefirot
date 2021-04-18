<template lang="md">
<StoryBase>
  <div class="input">
    <SInputSelect
      v-model="input"
      name="input"
      label="Label"
      note="Note text"
      help="This is a help text."
      placeholder="Please select an item"
      :options="options"
    />
  </div>
</StoryBase>

```vue
<template>
  <div class="input">
    <SInputSelect
      v-model="input"
      name="input"
      label="Label"
      note="Note text"
      help="This is a help text."
      placeholder="Please select an item"
      :options="options"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputSelect from '@globalbrain/sefirot/lib/components/SInputSelect.vue'

export default defineComponent({
  components: {
    SInputSelect
  },

  setup() {
    const input = ref<number | null>(null)

    const options = [
      { label: 'First option', value: 1 },
      { label: 'Second option', value: 2 },
      { label: 'Third option', value: 3 }
    ]

    return {
      input,
      options
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
import SInputSelect from '@@/lib/components/SInputSelect.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputSelect,
    StoryBase
  },

  setup() {
    const input = ref<number | null>(null)

    const options = [
      { label: 'First option', value: 1 },
      { label: 'Second option', value: 2 },
      { label: 'Third option', value: 3 }
    ]

    return {
      input,
      options
    }
  }
})
</script>

<style lang="postcss" scoped>
.input {
  max-width: 320px;
}
</style>
