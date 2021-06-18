<template lang="md">
<StoryBase>
  <STooltip class="tooltip" :text="text">
    Hover me
  </STooltip>
</StoryBase>

```vue
<template>
  <STooltip class="tooltip" :text="text">
    Hover me
  </STooltip>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import STooltip from '@@/lib/components/STooltip.vue'

export default defineComponent({
  components: {
    STooltip
  },

  setup() {
    const text = `
      Quite long descriptive text, with [helpful link](#) to navigate users.
    `

    return {
      text
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.tooltip {
  text-decoration: underline;
}
</style>
```
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import STooltip from '@@/lib/components/STooltip.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    STooltip,
    StoryBase
  },

  setup() {
    const text = `
      Quite long descriptive text, with [helpful link](#) to navigate users.
    `

    return {
      text
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.tooltip {
  text-decoration: underline;
}
</style>
