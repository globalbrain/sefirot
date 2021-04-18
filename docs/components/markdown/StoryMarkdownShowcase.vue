<template lang="md">
<StoryBase>
  <SMarkdown content="Vue ~~Modules~~ _Components_ for [Global Brain](https://globalbrains.com/) **Design** System." class="collapse" />
</StoryBase>

```html
<template>
  <SMarkdown content="Vue ~~Modules~~ _Components_ for [Global Brain](https://globalbrains.com/) **Design** System." />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SMarkdown from '@globalbrain/sefirot/lib/components/SMarkdown.vue'

export default defineComponent({
  components: {
    SMarkdown
  }
})
</script>
```
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryBase from '@/components/StoryBase.vue'
import SMarkdown from '@@/lib/components/SMarkdown.vue'

export default defineComponent({
  components: {
    StoryBase,
    SMarkdown
  }
})
</script>

<style lang="postcss" scoped>
.collapse >>> p:last-child {
  margin-bottom: 0;
}
</style>
