<template lang="md">
<StoryBase>
  <div class="image">
    <SPlaceholderImage
      img="/img/fixtures/image-1536x1024-001.jpg"
      :width="768"
      :height="512"
      :delay="3000"
    />
  </div>
</StoryBase>

```vue
<template>
  <SPlaceholderImage
    img="/img/fixtures/image-1536x1024-001.jpg"
    :width="768"
    :height="512"
    :delay="3000"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SPlaceholderImage from '@globalbrain/sefirot/lib/components/SPlaceholderImage.vue'

export default defineComponent({
  components: {
    SPlaceholderImage
  }
})
</script>
```
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SPlaceholderImage from '@@/lib/components/SPlaceholderImage.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SPlaceholderImage,
    StoryBase
  }
})
</script>
