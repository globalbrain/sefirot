<template lang="md">
<StoryBase>
  <SGrid :records="records" :actions="actions">
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

```html
<template>
  <SGrid :records="records" :actions="actions">
    <template #columns>
      <div class="cell name">NAME</div>
      <div class="cell email">EMAIL</div>
      <div class="cell status">STATUS</div>
    </template>
    <template #default="{ record }">
      <div class="cell">{{ '\{\{ record.name \}\}' }}</div>
      <div class="cell">{{ '\{\{ record.email \}\}' }}</div>
      <div class="cell">{{ '\{\{ record.status \}\}' }}</div>
    </template>
  </SGrid>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SIconEye from '@globalbrain/sefirot/lib/components/icons/SIconEye.vue'
import SIconEdit from '@globalbrain/sefirot/lib/components/icons/SIconEdit.vue'
import SIconTrash from '@globalbrain/sefirot/lib/components/icons/SIconTrash.vue'
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

    const actions = [
      { name: 'Preview', icon: SIconEye, callback: () => {} },
      { name: 'Edit', icon: SIconEdit, callback: () => {} },
      { name: 'Delete', icon: SIconTrash, callback: () => {} }
    ]

    return {
      records,
      actions
    }
  }
})
</script>

<style lang="postcss" scoped>
.name   { width: 128px; }
.email  { width: 224px; }
.status { width: 128px; }
</style>
```
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SIconEye from '@@/lib/components/icons/SIconEye.vue'
import SIconEdit from '@@/lib/components/icons/SIconEdit.vue'
import SIconTrash from '@@/lib/components/icons/SIconTrash.vue'
import SGrid from '@@/lib/components/SGrid.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SGrid,
    StoryBase
  },

  setup () {
    const records = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active' },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', status: 'Active' },
      { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', status: 'Active' }
    ]

    const actions = [
      { name: 'Preview', icon: SIconEye, callback: () => {} },
      { name: 'Edit', icon: SIconEdit, callback: () => {} },
      { name: 'Delete', icon: SIconTrash, callback: () => {} }
    ]

    return {
      records,
      actions
    }
  }
})
</script>

<style lang="postcss" scoped>
.name   { width: 128px; }
.email  { width: 224px; }
.status { width: 128px; }
</style>
