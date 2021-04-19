<template lang="md">
<StoryBase title="Mini Buttons">
  <div class="list">
    <div class="item">
      <SButton label="PRIMARY" size="mini" />
    </div>
    <div class="item">
      <SButton label="SECONDARY" type="secondary" size="mini" />
    </div>
    <div class="item">
      <SButton label="TERTIARY" type="tertiary" size="mini" />
    </div>
    <div class="item">
      <SButton label="TEXT" type="text" size="mini" />
    </div>
    <div class="item">
      <SButton label="MUTE" type="mute" size="mini" />
    </div>
  </div>
</StoryBase>

```vue
<template>
  <div class="list">
    <div class="item">
      <SButton label="PRIMARY" size="mini" />
    </div>
    <div class="item">
      <SButton label="SECONDARY" type="secondary" size="mini" />
    </div>
    <div class="item">
      <SButton label="TERTIARY" type="tertiary" size="mini" />
    </div>
    <div class="item">
      <SButton label="TEXT" type="text" size="mini" />
    </div>
    <div class="item">
      <SButton label="MUTE" type="mute" size="mini" />
    </div>
  </div>
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
