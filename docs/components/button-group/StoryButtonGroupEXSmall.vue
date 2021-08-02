<template lang="md">
<StoryBase title="Small Button Groups">
  <div class="group">
    <SButtonGroup v-model="value" :items="items" size="small" />
  </div>
</StoryBase>

```vue
<template>
  <div class="group">
    <SButtonGroup v-model="value" :items="items" size="small" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import SButtonGroup from '@globalbrain/sefirot/lib/components/SButtonGroup.vue'

export default defineComponent({
  components: {
    SButtonGroup
  },

  setup() {
    const value = ref('button-a')

    const items = [
      { label: 'Button A', value: 'button-a' },
      { label: 'Button B', value: 'button-b' },
      { label: 'Button C', value: 'button-c' }
    ]

    return {
      value,
      items
    }
  }
})
</script>

<style lang="postcss" scoped>
.group {
  max-width: 320px;
}
</style>
```
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SButtonGroup from '@@/lib/components/SButtonGroup.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SButtonGroup,
    StoryBase
  },

  setup() {
    const value = ref('button-a')

    const items = [
      { label: "Button A", value: 'button-a' },
      { label: "Button B", value: 'button-b' },
      { label: "Button C", value: 'button-c' }
    ]

    return {
      value,
      items
    }
  }
})
</script>

<style lang="postcss" scoped>
.group {
  max-width: 320px;
}
</style>
