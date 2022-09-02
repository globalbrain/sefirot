<script setup lang="ts">
import STableCellText from 'sefirot/components/STableCellText.vue'
import STableColumn from 'sefirot/components/STableColumn.vue'
import { toRefs } from 'vue'

export interface Data {
  orders: string[]
  columns: Record<string, any>
  records: any[]
}

const props = defineProps<{
  data: Data
}>()

const { orders, columns, records } = toRefs(props.data)
</script>

<template>
  <div class="STable">
    <table class="table" role="grid">
      <thead class="header">
        <STableColumn
          v-for="key in orders"
          :key="key"
          :label="columns[key].label"
          :dropdown="columns[key].dropdown"
        />
      </thead>

      <tbody>
        <tr
          v-for="record in records"
          :key="record"
          class="row"
        >
          <template v-for="key in orders" :key="key">
            <STableCellText
              v-if="columns[key].component === 'text'"
              :text="record[key]"
              :link="columns[key].link && record['link']"
              :color="columns[key].color"
            />

            <component
              v-else
              v-bind="columns[key].data"
              :is="columns[key].component"
            />
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="postcss">
.table {
  border: 1px solid var(--c-divider-light);
  border-collapse: separate;
  border-spacing: 0;
}

.row {
  border-top: 1px solid var(--c-divider-light);
  background-color: var(--c-bg);
  transition: background-color 0.1s;

  &:hover {
    background-color: var(--c-bg-soft);
  }

  &:first-child {
    border-top: 0;
    border-radius: 12px 12px 0 0;
  }

  &:last-child {
    border-radius: 0 0 12px 12px;
  }

  .dark & {
    background-color: var(--c-bg-mute);
  }

  .dark &:hover {
    background-color: var(--c-bg-soft);
  }
}
</style>
