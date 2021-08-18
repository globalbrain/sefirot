<template lang="md">
<StoryBase title="Disabled Secondary Buttons">
  <div class="list">
    <div class="item">
      <SButton type="secondary" label="NEUTRAL" disabled />
    </div>
    <div class="item">
      <SButton type="secondary" label="INFO" mode="info" disabled />
    </div>
    <div class="item">
      <SButton type="secondary" label="SUCCESS" mode="success" disabled />
    </div>
    <div class="item">
      <SButton type="secondary" label="WARNING" mode="warning" disabled />
    </div>
    <div class="item">
      <SButton type="secondary" label="DANGER" mode="danger" disabled />
    </div>
  </div>
</StoryBase>

```vue
<template>
  <div class="list">
    <div class="item">
      <SButton type="secondary" label="NEUTRAL" disabled />
    </div>
    <div class="item">
      <SButton type="secondary" label="INFO" mode="info" disabled />
    </div>
    <div class="item">
      <SButton type="secondary" label="SUCCESS" mode="success" disabled />
    </div>
    <div class="item">
      <SButton type="secondary" label="WARNING" mode="warning" disabled />
    </div>
    <div class="item">
      <SButton type="secondary" label="DANGER" mode="danger" disabled />
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
  margin: -4px;
}

.item {
  padding: 4px;
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
  margin: -4px;
}

.item {
  padding: 4px;
}
</style>
