<template lang="md">
<StoryBase>
  <p class="text">
    To know about how a tooltip works, <STooltip class="tooltip" text="This is tooltip">hover this text</STooltip>.
  </p>
</StoryBase>

```vue
<template>
  <p class="text">
    To know about how a tooltip works,
    <STooltip class="tooltip" text="This is tooltip">hover this text</STooltip>.
  </p>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import STooltip from '@globalbrain/sefirot/lib/components/STooltip.vue'

export default defineComponent({
  components: {
    STooltip
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
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.text {
  margin: 0;
}

.tooltip {
  text-decoration: underline;
}
</style>
