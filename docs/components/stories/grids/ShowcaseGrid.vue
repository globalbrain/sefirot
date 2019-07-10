<template lang="md">
<StoryBase>
  <div class="holder">
    <SGrid :columns="columns" :records="records" :actions="actions" #default="{ record }">
      <p class="cell name">{{ record.name }}</p>
      <p class="cell email">{{ record.email }}</p>
      <p class="cell value">{{ record.status }}</p>
    </SGrid>
  </div>
</StoryBase>

```html
<template>
  <SGrid
    :columns="columns"
    :records="records"
    :actions="actions"
    #default="{ record }"
  >
    <p class="cell">{{ '\{\{ record.name \}\}' }}</p>
    <p class="cell">{{ '\{\{ record.email \}\}' }}</p>
    <p class="cell">{{ '\{\{ record.status \}\}' }}</p>
  </SGrid>
</template>

<script>
import SIconEye from '@globalbrain/sefirot/lib/components/icons/SIconEye'
import SIconEdit from '@globalbrain/sefirot/lib/components/icons/SIconEdit'
import SIconTrash from '@globalbrain/sefirot/lib/components/icons/SIconTrash'
import SGrid from '@globalbrain/sefirot/lib/components/grids/SGrid'

export default {
  components: {
    SGrid
  },

  data () {
    return {
      columns: [
        { name: 'name', label: 'NAME' },
        { name: 'email', label: 'EMAIL' },
        { name: 'status', label: 'STATUS' }
      ],

      records: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', status: 'Active' },
        { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', status: 'Active' }
      ],

      actions: [
        { name: 'Preview', icon: SIconEye, callback: () => {} },
        { name: 'Edit', icon: SIconEdit, callback: () => {} },
        { name: 'Delete', icon: SIconTrash, callback: () => {} }
      ]
    }
  }
}
</script>
```
</template>

<script>
import SIconEye from '@@/lib/components/icons/SIconEye'
import SIconEdit from '@@/lib/components/icons/SIconEdit'
import SIconTrash from '@@/lib/components/icons/SIconTrash'
import SGrid from '@@/lib/components/grids/SGrid'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SGrid,
    StoryBase
  },

  data () {
    return {
      columns: [
        { name: 'name', label: 'NAME' },
        { name: 'email', label: 'EMAIL' },
        { name: 'status', label: 'STATUS' }
      ],

      records: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', status: 'Active' },
        { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', status: 'Active' }
      ],

      actions: [
        { name: 'Preview', icon: SIconEye, callback: () => {} },
        { name: 'Edit', icon: SIconEdit, callback: () => {} },
        { name: 'Delete', icon: SIconTrash, callback: () => {} }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.holder {
  margin: 0 -12px;
  padding: 12px;
  overflow-x: auto;
}
.SGrid >>> .name   { width: 128px; }
.SGrid >>> .email  { width: 216px; }
.SGrid >>> .status { width: 96px; }
</style>
