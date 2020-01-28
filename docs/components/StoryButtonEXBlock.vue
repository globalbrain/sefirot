<template lang="md">
<StoryBase title="Medium Buttons">
  <div class="list">
    <div class="item">
      <SButton label="PRIMARY" block />
    </div>
    <div class="item">
      <SButton label="SECONDARY" type="secondary" block />
    </div>
  </div>
</StoryBase>

```html
<template>
  <div class="list">
    <div class="item">
      <SButton label="PRIMARY" block />
    </div>
    <div class="item">
      <SButton label="SECONDARY" type="secondary" block />
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'

export default createComponent({
  components: {
    SButton
  }
})
</script>

<style lang="postcss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.item {
  padding: 8px;
  width: 50%;
}
</style>
```
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import SButton from '@@/lib/components/SButton.vue'
import StoryBase from '@/components/StoryBase.vue'

export default createComponent({
  components: {
    SButton,
    StoryBase
  }
})
</script>

<style lang="postcss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.item {
  padding: 8px;
  width: 50%;
}
</style>
