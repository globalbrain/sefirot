<template lang="md">
<StoryBase>
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
    <div class="item">
      <SButton type="text" label="NEUTRAL" mode="neutral" />
    </div>
    <div class="item">
      <SButton type="text" label="INFO" mode="info" />
    </div>
    <div class="item">
      <SButton type="text" label="SUCCESS" mode="success" />
    </div>
    <div class="item">
      <SButton type="text" label="WARNING" mode="warning" />
    </div>
    <div class="item">
      <SButton type="text" label="DANGER" mode="danger" />
    </div>
  </div>
</StoryBase>

```vue
<template>
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
    <div class="item">
      <SButton type="text" label="NEUTRAL" mode="neutral" />
    </div>
    <div class="item">
      <SButton type="text" label="INFO" mode="info" />
    </div>
    <div class="item">
      <SButton type="text" label="SUCCESS" mode="success" />
    </div>
    <div class="item">
      <SButton type="text" label="WARNING" mode="warning" />
    </div>
    <div class="item">
      <SButton type="text" label="DANGER" mode="danger" />
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
