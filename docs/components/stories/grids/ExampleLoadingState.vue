<template lang="md">
<StoryBase title="Loading State">
  <div class="holder">
    <SGrid :columns="columns" :records="records" :loading="loading">
      <template #header>
        <SButton label="LOAD RECORDS" @click="load" />
      </template>
      <template #default="{ record }">
        <p class="cell name">{{ record.name }}</p>
        <p class="cell email">{{ record.email }}</p>
        <p class="cell value">{{ record.status }}</p>
      </template>
    </SGrid>
  </div>
</StoryBase>

```html
<template>
  <SGrid
    :columns="columns"
    :records="records"
    :loading="loading"
    #default="{ record }"
  >
    <template #header>
      <SButton label="LOAD RECORDS" @click="load" />
    </template>

    <template #default="{ record }">
      <p class="cell">{{ '\{\{ record.name \}\}' }}</p>
      <p class="cell">{{ '\{\{ record.email \}\}' }}</p>
      <p class="cell">{{ '\{\{ record.status \}\}' }}</p>
    </template>
  </SGrid>
</template>

<script>
import SButton from '@globalbrain/sefirot/lib/components/buttons/SButton'
import SGrid from '@globalbrain/sefirot/lib/components/grids/SGrid'

export default {
  components: {
    SButton,
    SGrid,
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
  },

  methods: {
    load () {
      this.loading = true

      setTimeout(() => { this.loading = false }, 5000)
    }
  }
}
</script>
```
</template>

<script>
import SButton from '@@/lib/components/buttons/SButton'
import SGrid from '@@/lib/components/grids/SGrid'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SButton,
    SGrid,
    StoryBase
  },

  data () {
    return {
      loading: false,

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
  },

  methods: {
    load () {
      this.loading = true

      setTimeout(() => { this.loading = false }, 5000)
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
