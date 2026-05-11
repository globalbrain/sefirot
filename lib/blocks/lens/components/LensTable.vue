<script setup lang="ts">
import { computedAsync } from '@vueuse/core'
import { cloneDeep } from 'lodash-es'
import { computed } from 'vue'
import STable from '../../../components/STable.vue'
import { type DropdownSection } from '../../../composables/Dropdown'
import { type TableColumns, useTable } from '../../../composables/Table'
import { type FieldData } from '../FieldData'
import { type LensQuerySort } from '../LensQuery'
import { type LensResult } from '../LensResult'
import { useFieldFactory } from '../composables/FieldFactory'

const props = defineProps<{
  result?: LensResult
  overrides?: Record<string, Partial<FieldData>>
  loading: boolean
  // The list of field keys to actually render as columns, in order.
  // Falls back to `result.query.select` if not provided. The catalog
  // uses this to control whether an auto-fetched `indexField` shows up
  // as a column.
  select?: string[]
  selected?: any[]
  indexField?: string
}>()

const emit = defineEmits<{
  'update:selected': [value: any[]]
  'filter-updated': [filter: any[]]
  'sort-updated': [sort: LensQuerySort]
  'cell-clicked': [value: any, record: any]
}>()

const fieldFactory = useFieldFactory()

const records = computed(() => props.result?.data ?? [])

const columnKeys = computed(() => props.select ?? props.result?.query.select ?? [])

const orders = computed(() => [
  ...columnKeys.value,
  '__last_empty__'
])

const columns = computedAsync(async () => {
  const r = props.result

  if (!r) {
    return {}
  }

  // Prepare base columns that has `__last_empty__` to fill the end space.
  const columns: TableColumns<any, any, any> = {
    __last_empty__: {
      cell: { type: 'empty' }
    }
  }

  // Build the list of columns based on the resolved column key list.
  for (const i in columnKeys.value) {
    const key = columnKeys.value[i]

    const _fieldData = cloneDeep(r.fields[key])

    const overriddenFieldData = Object.assign(
      _fieldData,
      props.overrides?.[key] ?? {}
    )

    const field = fieldFactory.make(overriddenFieldData)

    columns[key] = field.tableColumn()

    const dropdown: DropdownSection[] = []

    const sortMenu = field.tableSortMenu(onSortUpdated)
    const filterMenu = await field.tableFilterMenu(r.query.filters, onFilterUpdated)

    if (sortMenu) {
      dropdown.push(sortMenu)
    }

    if (filterMenu) {
      dropdown.push(filterMenu)
    }

    if (dropdown.length > 0) {
      columns[key].dropdown = dropdown
    }
  }

  return columns
}, {})

const table = useTable({
  records,
  orders,
  columns,
  indexField: props.indexField,
  borderless: true
})

function onSelect(value?: any[]) {
  emit('update:selected', value ?? [])
}

function onFilterUpdated(filter: any[]) {
  emit('filter-updated', filter)
}

function onSortUpdated(sort: LensQuerySort) {
  emit('sort-updated', sort)
}
</script>

<template>
  <div class="LensTable" :class="{ 'is-loading': loading, 'is-empty': (result?.data.length ?? 0) === 0 }">
    <STable
      v-if="Object.keys(columns).length > 0"
      class="table"
      :options="table"
      :selected
      @update:selected="onSelect"
    />
  </div>
</template>

<style scoped>
.LensTable {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  background-color: var(--c-bg-1);

  /**
   * Set all numbers to use tabular numbers. This is a current hack to apply
   * mono-spaced numbers to fields like Opportunity ID ("OPP-0017263").
   * In ideal scenario, we should be able to set this option per field base,
   * but it is quite tricky to scope the desired field in CSS at the moment.
   */
  font-feature-settings: "tnum";
}

.LensTable.is-loading,
.LensTable.is-empty {
  .table {
    border-bottom: 1px solid transparent;
  }
}

.LensTable :deep(.col-__select) {
  --table-col-position: sticky;
  --table-col-z-index: 50;
}

.LensTable :deep(.col-__last_empty__) { --table-col-width: 560px; }

.table {
  border-bottom: 1px solid var(--c-gutter);
}
</style>
