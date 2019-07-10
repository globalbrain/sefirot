<template lang="md">
<StoryBase title="Medium Buttons">
  <div class="list">
    <div class="item">
      <SButton label="PRIMARY" />
    </div>
    <div class="item">
      <SButton label="SECONDARY" type="secondary" />
    </div>
    <div class="item">
      <SButton label="TEXT" type="text" />
    </div>
    <div class="item">
      <SButton label="MUTE" type="mute" />
    </div>
  </div>
</StoryBase>

```html
<template>
  <SButton label="BUTTON" />
  <SButton label="SECONDARY" type="secondary" />
  <SButton label="TEXT" type="text" />
  <SButton label="MUTE" type="mute" />
</template>

<script>
import SButton from '@globalbrains/sefirot/lib/components/buttons/SButton'

export default {
  components: {
    SButton
  }
}
</script>
```
</template>

<script>
import SButton from '@@/lib/components/buttons/SButton'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SButton,
    StoryBase
  }
}
</script>

<style lang="postcss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.item {
  padding: 8px;
}
</style>
