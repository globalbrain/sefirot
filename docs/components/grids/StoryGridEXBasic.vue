<template lang="md">
<StoryBase title="Basic Grid">
  <SGrid :records="records" :clickable="false">
    <template #columns>
      <div class="cell name">NAME</div>
      <div class="cell email">EMAIL</div>
      <div class="cell status">STATUS</div>
    </template>
    <template #default="{ record }">
      <div class="cell name">{{ record.name }}</div>
      <div class="cell email">{{ record.email }}</div>
      <div class="cell status">{{ record.status }}</div>
    </template>
  </SGrid>
</StoryBase>

```vue
<template>
  <SGrid :records="records" :clickable="false">
    <template #columns>
      <div class="cell name">NAME</div>
      <div class="cell email">EMAIL</div>
      <div class="cell status">STATUS</div>
    </template>
    <template #default="{ record }">
      <div class="cell name">{{ '\{\{ record.name \}\}' }}</div>
      <div class="cell email">{{ '\{\{ record.email \}\}' }}</div>
      <div class="cell status">{{ '\{\{ record.status \}\}' }}</div>
    </template>
  </SGrid>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SGrid from '@globalbrain/sefirot/lib/components/SGrid.vue'

export default defineComponent({
  components: {
    SGrid
  },

  setup() {
    const records = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active' },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', status: 'Active' },
      { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', status: 'Active' }
    ]

    return {
      records
    }
  }
})
</script>

<style lang="postcss" scoped>
.name   { width: 128px; }
.email  { width: 216px; }
.status { width: 96px; }
</style>
```
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SGrid from '@@/lib/components/SGrid.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SGrid,
    StoryBase
  },

  setup() {
    const records = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active' },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', status: 'Active' },
      { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', status: 'Active' }
    ]

    return {
      records
    }
  }
})
</script>

<style lang="postcss" scoped>
.name   { width: 128px; }
.email  { width: 216px; }
.status { width: 96px; }
</style>
