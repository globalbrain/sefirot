<template lang="md">
<StoryBase title="Large Buttons">
  <div class="list">
    <div class="item">
      <SButton label="PRIMARY" size="large" />
    </div>
    <div class="item">
      <SButton label="SECONDARY" type="secondary" size="large" />
    </div>
    <div class="item">
      <SButton label="TEXT" type="text" size="large" />
    </div>
    <div class="item">
      <SButton label="MUTE" type="mute" size="large" />
    </div>
  </div>
</StoryBase>

```html
<template>
  <SButton label="BUTTON" size="large" />
  <SButton label="SECONDARY" type="secondary" size="large" />
  <SButton label="TEXT" type="text" size="large" />
  <SButton label="MUTE" type="mute" size="large" />
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
