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

```html
<template>
  <SPlaceholderImage
    img="/img/fixtures/image-1536x1024-001.jpg"
    :width="768"
    :height="512"
    :delay="3000"
  />
</template>

<script>
import SPlaceholderImage from '@@/lib/components/placeholders/SPlaceholderImage'

export default {
  components: {
    SPlaceholderImage
  }
}
</script>
```
</template>

<script>
import SPlaceholderImage from '@@/lib/components/placeholders/SPlaceholderImage'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SPlaceholderImage,
    StoryBase
  }
}
</script>
