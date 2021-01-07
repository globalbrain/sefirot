<template lang="md">
<StoryBase title="Multi Items Grid">
  <SGrid :records="records" :clickable="false">
    <template #columns>
      <div class="cell name">NAME</div>
      <div class="cell company">COMPANY</div>
      <div class="cell status">STATUS</div>
    </template>
    <template #default="{ record }">
      <div class="cell name">
        <div class="cell-main">{{ record.name }}</div>
        <div class="cell-sub">{{ record.email }}</div>
      </div>
      <div class="cell company">
        <div class="cell-main">{{ record.company }}</div>
        <div class="cell-sub"><a href="#">{{ record.url }}</a></div>
      </div>
      <div class="cell status">
        <div class="cell-main">{{ record.status }}</div>
        <div class="cell-sub">{{ record.activated_at }}</div>
      </div>
    </template>
  </SGrid>
</StoryBase>

```html
<template>
  <SGrid :records="records" :clickable="false">
    <template #columns>
      <div class="cell name">NAME</div>
      <div class="cell company">COMPANY</div>
      <div class="cell status">STATUS</div>
    </template>
    <template #default="{ record }">
      <div class="cell">
        <div class="cell-main">{{ '\{\{ record.name \}\}' }}</div>
        <div class="cell-sub">{{ '\{\{ record.email \}\}' }}</div>
      </div>
      <div class="cell">
        <div class="cell-main">{{ '\{\{ record.company \}\}' }}</div>
        <div class="cell-sub"><a href="#">{{ '\{\{ record.url \}\}' }}</a></div>
      </div>
      <div class="cell">
        <div class="cell-main">{{ '\{\{ record.status \}\}' }}</div>
        <div class="cell-sub">{{ '\{\{ record.activated_at \}\}' }}</div>
      </div>
    </template>
  </SGrid>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import SGrid from '@globalbrain/sefirot/lib/components/SGrid.vue'

export default defineComponent({
  components: {
    SGrid
  },

  setup() {
    const records = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', company: 'Awesome, Inc.', url: 'https://example.com', status: 'Active', activated_at: 'Jun 2, 2019' },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', company: 'GGBK Corporation', url: 'https://example.com', status: 'Active', activated_at: 'Sep 21, 2019' },
      { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', company: 'AZEK, Inc.', url: 'https://example.com', status: 'Active', activated_at: 'Feb 19, 2018' }
    ]

    return {
      records
    }
  }
})
</script>

<style lang="postcss" scoped>
.name    { width: 192px; }
.company { width: 192px; }
.status  { width: 128px; }
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

  setup () {
    const records = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', company: 'Awesome, Inc.', url: 'https://example.com', status: 'Active', activated_at: 'Jun 2, 2019' },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', company: 'GGBK Corporation', url: 'https://example.com', status: 'Active', activated_at: 'Sep 21, 2019' },
      { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', company: 'AZEK, Inc.', url: 'https://example.com', status: 'Active', activated_at: 'Feb 19, 2018' }
    ]

    return {
      records
    }
  }
})
</script>

<style lang="postcss" scoped>
.name    { width: 192px; }
.company { width: 192px; }
.status  { width: 128px; }
</style>
