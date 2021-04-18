<template lang="md">
<StoryBase>
  <SMarkdown content="**We** shape our _buildings_. Thereafter, _they_ shape **us**." class="collapse" />
</StoryBase>

```vue
<template>
  <SMarkdown content="**We** shape our _buildings_. Thereafter, _they_ shape **us**." />
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
import SMarkdown from '@@/lib/components/SMarkdown.vue'
import StoryBase from '@/components/StoryBase.vue'

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
