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
      <SButton label="TERTIARY" type="tertiary" size="large" />
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
  <div class="list">
    <div class="item">
      <SButton label="PRIMARY" size="large" />
    </div>
    <div class="item">
      <SButton label="SECONDARY" type="secondary" size="large" />
    </div>
    <div class="item">
      <SButton label="TERTIARY" type="tertiary" size="large" />
    </div>
    <div class="item">
      <SButton label="TEXT" type="text" size="large" />
    </div>
    <div class="item">
      <SButton label="MUTE" type="mute" size="large" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'

export default defineComponent({
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
}
</style>
```
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SButton from '@@/lib/components/SButton.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
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
}
</style>
