<script setup lang="ts">
import imageIcon from '@iconify-icons/feather/image'
import orderBy from 'lodash-es/orderBy'
import xor from 'lodash-es/xor'
import STable from 'sefirot/components/STable.vue'
// @ts-expect-error TODO: add tsconfig alias
import { useTable } from 'sefirot/composables/Table'
import { reactive, ref, computed, markRaw } from 'vue'

interface Sort {
  by: string
  order: 'asc' | 'desc'
}

const sort = reactive<Sort>({
  by: 'name',
  order: 'asc'
})

const dropdownName = [
  {
    type: 'menu',
    options: [
      { label: 'Sort ascending (A...Z)', onClick: () => updateSort('name', 'asc') },
      { label: 'Sort descending (Z...A)', onClick: () => updateSort('name', 'desc') }
    ]
  }
]

const dropdownStatusSelected = ref<string[]>([])

const dropdownStatus = [
  {
    type: 'menu',
    options: [
      { label: 'Sort ascending (A...Z)', onClick: () => updateSort('status', 'asc') },
      { label: 'Sort descending (Z...A)', onClick: () => updateSort('status', 'desc') }
    ]
  },
  {
    type: 'filter',
    search: true,
    selected: dropdownStatusSelected,
    options: [
      { label: 'Draft', value: 'Draft', onClick: updateStatusFilter },
      { label: 'Published', value: 'Published', onClick: updateStatusFilter },
      { label: 'Archived', value: 'Archived', onClick: updateStatusFilter }
    ]
  }
]

const dropdownTypeSelected = ref<string[]>([])

const dropdownType = [
  {
    type: 'menu',
    options: [
      { label: 'Sort ascending (A...Z)', onClick: () => updateSort('type', 'asc') },
      { label: 'Sort descending (Z...A)', onClick: () => updateSort('type', 'desc') }
    ]
  },
  {
    type: 'filter',
    search: true,
    selected: markRaw(dropdownTypeSelected),
    options: [
      { label: 'Photo', value: 'Photo', onClick: updateTypeFilter },
      { label: 'Illustration', value: 'Illustration', onClick: updateTypeFilter },
      { label: 'Icon', value: 'Icon', onClick: updateTypeFilter },
      { label: 'Other', value: 'Other', onClick: updateTypeFilter }
    ]
  }
]

const dropdownCreatedAt = [
  {
    type: 'menu',
    options: [
      { label: 'Sort ascending (A...Z)', onClick: () => updateSort('createdAt', 'asc') },
      { label: 'Sort descending (Z...A)', onClick: () => updateSort('createdAt', 'desc') }
    ]
  }
]

const hasFilters = computed(() => {
  return [
    dropdownStatusSelected.value.length,
    dropdownTypeSelected.value.length
  ].some((length) => length)
})

const data = [
  { name: 'Artwork 001', link: 'https://example.com', status: 'Published', type: 'Photo', createdAt: '2022-10-10' },
  { name: 'Artwork 002', link: 'https://example.com', status: 'Draft', type: 'Icon', createdAt: '2022-10-09' },
  { name: 'Artwork 003', link: 'https://example.com', status: 'Published', type: 'Photo', createdAt: '2022-10-02' },
  { name: 'Artwork 004', link: 'https://example.com', status: 'Published', type: 'Illustration', createdAt: '2022-09-12' },
  { name: 'Artwork 005', link: 'https://example.com', status: 'Archived', type: 'Other', createdAt: '2022-09-08' }
]

const filteredData = computed(() => {
  return data
    .filter((i) => filterBy(i.status, dropdownStatusSelected.value))
    .filter((i) => filterBy(i.type, dropdownTypeSelected.value))
})

const orderedData = computed(() => {
  return orderBy(filteredData.value, [sort.by], [sort.order])
})

const table = useTable({
  orders: [
    'name',
    'status',
    'type',
    'createdAt'
  ],

  columns: {
    name: {
      label: 'Name',
      dropdown: dropdownName,
      cell: {
        type: 'text',
        icon: markRaw(imageIcon),
        link: (_value, record) => record.link,
      }
    },

    status: {
      label: 'Status',
      dropdown: dropdownStatus,
      cell: {
        type: 'pill',
        color(value) {
          if (value === 'Published') {
            return 'success'
          } else if (value === 'Draft') {
            return 'info'
          } else {
            return 'mute'
          }
        }
      }
    },

    type: {
      label: 'Type',
      dropdown: dropdownType,
      cell: { type: 'text', color: 'soft' }
    },

    createdAt: {
      label: 'Created at',
      dropdown: dropdownCreatedAt,
      cell: { type: 'text', color: 'soft' }
    }
  },

  records: orderedData,
  total: computed(() => orderedData.value.length),
  page: 1,
  perPage: 5,
  reset: hasFilters,
  onReset: resetFilters
})

function updateSort(by: string, order: 'asc' | 'desc') {
  sort.by = by
  sort.order = order
}

function filterBy(value: string, filters: string[]) {
  return filters.length ? filters.includes(value) : true
}

function resetFilters() {
  dropdownStatusSelected.value = []
  dropdownTypeSelected.value = []
}

function updateStatusFilter(value: string) {
  dropdownStatusSelected.value = xor(dropdownStatusSelected.value, [value])
}

function updateTypeFilter(value: string) {
  dropdownTypeSelected.value = xor(dropdownTypeSelected.value, [value])
}
</script>

<template>
  <Story title="Components/STable">
    <Variant title="Default">
      <STable class="table" :options="table" />
    </Variant>
  </Story>
</template>

<style scoped>
.table :deep(.col-name)      { --table-col-width: 160px; }
.table :deep(.col-status)    { --table-col-width: 144px; }
.table :deep(.col-type)      { --table-col-width: 144px; }
.table :deep(.col-createdAt) { --table-col-width: 192px; --table-col-max-width: auto; }
</style>
