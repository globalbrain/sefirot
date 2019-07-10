<template lang="md">
<StoryBase title="With Header">
  <div class="holder">
    <SGrid :columns="columns" :records="records" :clickable="false">
      <template #header>
        <p class="title">Users</p>
      </template>
      <template #default="{ record }">
        <p class="cell name">{{ record.name }}</p>
        <p class="cell email">{{ record.email }}</p>
        <p class="cell value">{{ record.value }}</p>
      </template>
    </SGrid>
  </div>
</StoryBase>

```html
<template>
  <SGrid
    :columns="columns"
    :records="records"
    :clickable="false"
  >
    <template #header>
      <p>Users</p>
    </template>

    <template #default="{ record }">
      <p class="cell">{{ '\{\{ record.name \}\}' }}</p>
      <p class="cell">{{ '\{\{ record.email \}\}' }}</p>
      <p class="cell">{{ '\{\{ record.value \}\}' }}</p>
    </template>
  </SGrid>
</template>

<script>
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
      ]
    }
  }
}
</script>
```
</template>

<script>
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
        { name: 'value', label: 'VALUE' }
      ],

      records: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', value: 87 },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', value: 122 },
        { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', value: 76 }
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

.SGrid >>> .name  { width: 128px; }
.SGrid >>> .email { width: 216px; }
.SGrid >>> .value { width: 96px; text-align: right; }

.title {
  margin: 0;
  font-size: 20px;
}
</style>
