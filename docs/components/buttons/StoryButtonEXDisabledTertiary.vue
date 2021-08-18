<template lang="md">
<StoryBase title="Disabled Tertiary Button">
  <SButton type="tertiary" label="BUTTON" disabled />
</StoryBase>

```vue
<template>
  <SButton type="tertiary" label="BUTTON" disabled />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'

export default defineComponent({
  components: {
    SButton
  }
})
</script>
```
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SButton from '@@/lib/components/SButton.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SButton,
    StoryBase
  }
})
</script>
