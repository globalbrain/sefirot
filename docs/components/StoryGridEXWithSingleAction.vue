<template lang="md">
<StoryBase title="With Single Action">
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
import SIconMoreHorizontal from '@globalbrain/sefirot/lib/components/icons/SIconMoreHorizontal'
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

      actions: {
        icon: SIconMoreHorizontal,
        callback: () => {}
      }
    }
  }
}
</script>
```
</template>

<script>
import SIconMoreHorizontal from '@@/lib/components/icons/SIconMoreHorizontal'
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

      actions: {
        icon: SIconMoreHorizontal,
        callback: () => {}
      }
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
