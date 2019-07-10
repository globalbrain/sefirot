<template lang="md">
<StoryBase title="Button Modes">
  <div class="list">
    <div class="item">
      <SButton label="NEUTRAL" mode="neutral" />
    </div>
    <div class="item">
      <SButton label="INFO" mode="info" />
    </div>
    <div class="item">
      <SButton label="SUCCESS" mode="success" />
    </div>
    <div class="item">
      <SButton label="WARNING" mode="warning" />
    </div>
    <div class="item">
      <SButton label="DANGER" mode="danger" />
    </div>
  </div>
</StoryBase>

```html
<template>
  <SButton label="NEUTRAL" mode="neutral" />
  <SButton label="INFO" mode="info" />
  <SButton label="SUCCESS" mode="success" />
  <SButton label="WARNING" mode="warning" />
  <SButton label="DANGER" mode="danger" />
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
