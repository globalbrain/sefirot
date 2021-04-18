<template lang="md">
<StoryBase>
  <div class="items">
    <SInputSwitches
      mode="info"
      name="input"
      label="Label"
      note="Note text"
      help="This is a help text."
      :options="options"
      v-model="data"
    />
  </div>
</StoryBase>

```vue
<template>
  <div class="items">
    <SInputSwitches
      name="input"
      label="Label"
      note="Note text"
      help="This is a help text."
      :options="options"
      v-model="data"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import SInputSwitches from '@globalbrain/sefirot/lib/components/SInputSwitches.vue'

export default defineComponent({
  components: {
    SInputSwitches
  },

  setup() {
    const data = ref([2])

    const options = [
      { label: 'Switch 1', value: 1 },
      { label: 'Switch 2', value: 2 },
      { label: 'Switch 3', value: 3 }
    ]

    return {
      data,
      options
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.items {
  width: 192px;
}
</style>
```
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import SInputSwitches from '@@/lib/components/SInputSwitches.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputSwitches,
    StoryBase
  },

  setup() {
    const data = ref([2])

    const options = [
      { label: 'Switch 1', value: 1 },
      { label: 'Switch 2', value: 2 },
      { label: 'Switch 3', value: 3 }
    ]

    return {
      data,
      options
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.items {
  width: 192px;
}
</style>
