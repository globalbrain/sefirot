<template lang="md">
<StoryBase title="With Multi Actions">
  <SGrid :records="records" :actions="actions">
    <template #columns>
      <div class="cell name">NAME</div>
      <div class="cell company">COMPANY</div>
      <div class="cell status">STATUS</div>
    </template>
    <template #default="{ record }">
      <p class="cell name">{{ record.name }}</p>
      <p class="cell email">{{ record.email }}</p>
      <p class="cell value">{{ record.status }}</p>
    </template>
  </SGrid>
</StoryBase>

```vue
<template>
  <SGrid :records="records" :actions="actions">
    <template #columns>
      <div class="cell name">NAME</div>
      <div class="cell company">COMPANY</div>
      <div class="cell status">STATUS</div>
    </template>
    <template #default="{ record }">
      <p class="cell">{{ '\{\{ record.name \}\}' }}</p>
      <p class="cell">{{ '\{\{ record.email \}\}' }}</p>
      <p class="cell">{{ '\{\{ record.status \}\}' }}</p>
    </template>
  </SGrid>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SIconEye from '@globalbrains/sefirot/lib/components/icons/SIconEye.vue'
import SIconEdit from '@globalbrains/sefirot/lib/components/icons/SIconEdit.vue'
import SIconTrash from '@globalbrains/sefirot/lib/components/icons/SIconTrash.vue'
import SGrid from '@globalbrains/sefirot/lib/components/SGrid.vue'

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
.email  { width: 216px; }
.status { width: 96px; }
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
.email  { width: 216px; }
.status { width: 96px; }
</style>
