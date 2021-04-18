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
      <SButton label="TERTIARY" type="tertiary" rounded />
    </div>
    <div class="item">
      <SButton label="TEXT" type="text" rounded />
    </div>
    <div class="item">
      <SButton label="MUTE" type="mute" rounded />
    </div>
  </div>
</StoryBase>

```vue
<template>
  <div class="list">
    <div class="item">
      <SButton label="PRIMARY" rounded />
    </div>
    <div class="item">
      <SButton label="SECONDARY" type="secondary" rounded />
    </div>
    <div class="item">
      <SButton label="TERTIARY" type="tertiary" rounded />
    </div>
    <div class="item">
      <SButton label="TEXT" type="text" rounded />
    </div>
    <div class="item">
      <SButton label="MUTE" type="mute" rounded />
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
