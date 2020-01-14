<template lang="md">
<StoryBase title="Multi Items Grid">
  <div class="holder">
    <SGrid :columns="columns" :records="records" :clickable="false" #default="{ record }">
      <div class="cell name">
        <p class="cell-main">{{ record.name }}</p>
        <p class="cell-sub">{{ record.email }}</p>
      </div>
      <div class="cell company">
        <p class="cell-main">{{ record.company }}</p>
        <p class="cell-sub"><a href="#">{{ record.url }}</a></p>
      </div>
      <div class="cell status">
        <p class="cell-main">{{ record.status }}</p>
        <p class="cell-sub">{{ record.activated_at }}</p>
      </div>
    </SGrid>
  </div>
</StoryBase>

```html
<template>
  <SGrid
    :columns="columns"
    :records="records"
    :clickable="false"
    #default="{ record }"
  >
    <div class="cell">
      <p class="cell-main">{{ '\{\{ record.name \}\}' }}</p>
      <p class="cell-sub">{{ '\{\{ record.email \}\}' }}</p>
    </div>
    <div class="cell">
      <p class="cell-main">{{ '\{\{ record.company \}\}' }}</p>
      <p class="cell-sub"><a href="#">{{ '\{\{ record.url \}\}' }}</a></p>
    </div>
    <div class="cell">
      <p class="cell-main">{{ '\{\{ record.status \}\}' }}</p>
      <p class="cell-sub">{{ '\{\{ record.activated_at \}\}' }}</p>
    </div>
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
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', company: 'Awesome, Inc.', url: 'https://example.com', status: 'Active', activated_at: 'Jun 2, 2019' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', company: 'GGBK Corporation', url: 'https://example.com', status: 'Active', activated_at: 'Sep 21, 2019' },
        { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', company: 'AZEK, Inc.', url: 'https://example.com', status: 'Active', activated_at: 'Feb 19, 2018' }
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
        { name: 'company', label: 'COMPANY' },
        { name: 'status', label: 'STATUS' }
      ],

      records: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', company: 'Awesome, Inc.', url: 'https://example.com', status: 'Active', activated_at: 'Jun 2, 2019' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', company: 'GGBK Corporation', url: 'https://example.com', status: 'Active', activated_at: 'Sep 21, 2019' },
        { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', company: 'AZEK, Inc.', url: 'https://example.com', status: 'Active', activated_at: 'Feb 19, 2018' }
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

.SGrid >>> .name    { width: 192px; }
.SGrid >>> .company { width: 192px; }
.SGrid >>> .status  { width: 128px; }
</style>
