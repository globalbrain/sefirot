<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import orderBy from 'lodash-es/orderBy'
import xor from 'lodash-es/xor'
import STable from 'sefirot/components/STable.vue'

const sort = reactive({
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
  reactive({
    type: 'filter',
    search: true,
    selected: dropdownStatusSelected,
    options: [
      { label: 'Draft', value: 'Draft', onClick: updateStatusFilter },
      { label: 'Published', value: 'Published', onClick: updateStatusFilter },
      { label: 'Archived', value: 'Archived', onClick: updateStatusFilter }
    ]
  })
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
  reactive({
    type: 'filter',
    search: true,
    selected: dropdownTypeSelected,
    options: [
      { label: 'Photo', value: 'Photo', onClick: updateTypeFilter },
      { label: 'Illustration', value: 'Illustration', onClick: updateTypeFilter },
      { label: 'Icon', value: 'Icon', onClick: updateTypeFilter },
      { label: 'Other', value: 'Other', onClick: updateTypeFilter }
    ]
  })
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

const rowData = [
  { name: 'Artwork 001', link: 'https://example.com', status: 'Published', type: 'Photo', createdAt: '2022-10-10' },
  { name: 'Artwork 002', link: 'https://example.com', status: 'Draft', type: 'Icon', createdAt: '2022-10-09' },
  { name: 'Artwork 003', link: 'https://example.com', status: 'Published', type: 'Photo', createdAt: '2022-10-02' },
  { name: 'Artwork 004', link: 'https://example.com', status: 'Published', type: 'Illustration', createdAt: '2022-09-12' },
  { name: 'Artwork 005', link: 'https://example.com', status: 'Archived', type: 'Other', createdAt: '2022-09-08' }
]

const filteredData = computed(() => {
  return rowData
    .filter((i) => filterBy(i.status, dropdownStatusSelected.value))
    .filter((i) => filterBy(i.type, dropdownTypeSelected.value))
})

const orderedData = computed(() => {
  return orderBy(filteredData.value, [sort.by], [sort.order])
})

const data = {
  orders: ['name', 'status', 'type', 'createdAt'],

  columns: {
    name: {
      label: 'Name',
      dropdown: dropdownName,
      component: 'text',
      link: true
    },

    status: {
      label: 'Status',
      dropdown: dropdownStatus,
      component: 'text',
      color: 'soft',
    },

    type: {
      label: 'Type',
      dropdown: dropdownType,
      component: 'text',
      color: 'soft'
    },

    createdAt: {
      label: 'Created at',
      dropdown: dropdownCreatedAt,
      component: 'text',
      color: 'soft'
    }
  },

  records: orderedData
}

function filterBy(value: string, filters: string[]) {
  return filters.length ? filters.includes(value) : true
}

function updateSort(by: string, order: 'asc' | 'desc') {
  sort.by = by
  sort.order = order
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
      <STable :data="data" />
    </Variant>
  </Story>
</template>
