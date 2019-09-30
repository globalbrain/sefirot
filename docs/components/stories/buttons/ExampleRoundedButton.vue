<template lang="md">
<StoryBase title="Rounded Button">
  <div class="list">
    <div class="item">
      <SButton label="PRIMARY" rounded />
    </div>
    <div class="item">
      <SButton label="SECONDARY" type="secondary" rounded />
    </div>
    <div class="item">
      <SButton label="TEXT" type="text" rounded />
    </div>
    <div class="item">
      <SButton label="MUTE" type="mute" rounded />
    </div>
  </div>
</StoryBase>

```html
<template>
  <SButton label="BUTTON" rounded />
  <SButton label="SECONDARY" type="secondary" rounded />
  <SButton label="TEXT" type="text" rounded />
  <SButton label="MUTE" type="mute" rounded />
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
