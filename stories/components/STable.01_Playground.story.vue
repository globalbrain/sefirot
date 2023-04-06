<script setup lang="ts">
import IconImageSquare from '@iconify-icons/ph/image-square'
import orderBy from 'lodash-es/orderBy'
import xor from 'lodash-es/xor'
import STable from 'sefirot/components/STable.vue'
import { createDropdown } from 'sefirot/composables/Dropdown'
import { useTable } from 'sefirot/composables/Table'
import { computed, markRaw, reactive, ref } from 'vue'

const title = 'Components / STable / 01. Playground'

interface Sort {
  by: string
  order: 'asc' | 'desc'
}

const sort = reactive<Sort>({
  by: 'name',
  order: 'asc'
})

const dropdownName = createDropdown([
  {
    type: 'menu',
    options: [
      { label: 'Sort ascending (A...Z)', onClick: () => updateSort('name', 'asc') },
      { label: 'Sort descending (Z...A)', onClick: () => updateSort('name', 'desc') }
    ]
  }
])

const dropdownStatusSelected = ref<string[]>([])

const dropdownStatus = createDropdown([
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
])

const dropdownTypeSelected = ref<string[]>([])

const dropdownType = createDropdown([
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
])

const dropdownTagsSelected = ref<string[]>([])

const dropdownTags = createDropdown([
  {
    type: 'filter',
    search: true,
    selected: markRaw(dropdownTagsSelected),
    options: [
      { label: 'Info', value: 'Info', onClick: updateTagsFilter },
      { label: 'News', value: 'News', onClick: updateTagsFilter },
      { label: 'Latest', value: 'Latest', onClick: updateTagsFilter }
    ]
  }
])

const dropdownCreatedAt = createDropdown([
  {
    type: 'menu',
    options: [
      { label: 'Sort ascending (A...Z)', onClick: () => updateSort('createdAt', 'asc') },
      { label: 'Sort descending (Z...A)', onClick: () => updateSort('createdAt', 'desc') }
    ]
  }
])

const hasFilters = computed(() => {
  return [
    dropdownStatusSelected.value.length,
    dropdownTypeSelected.value.length,
    dropdownTagsSelected.value.length
  ].some((length) => length)
})

const data = [
  {
    name: 'Artwork 001',
    link: 'https://example.com',
    status: 'Published',
    type: 'Photo',
    createdAt: '2022-10-10',
    tags: ['Info', 'News', 'Latest']
  },
  {
    name: 'Artwork 002',
    link: 'https://example.com',
    status: 'Draft',
    type: 'Icon',
    createdAt: '2022-10-09',
    tags: ['Info']
  },
  {
    name: 'Artwork 003 Long Long Long',
    link: 'https://example.com',
    status: 'Published',
    type: 'Photo',
    createdAt: '2022-10-02',
    tags: ['Info', 'News']
  },
  {
    name: 'Artwork 004',
    link: 'https://example.com',
    status: 'Published',
    type: 'Illustration',
    createdAt: '2022-09-12',
    tags: ['Info', 'News']
  },
  {
    name: 'Artwork 005',
    link: 'https://example.com',
    status: 'Archived',
    type: 'Other',
    createdAt: '2022-09-08',
    tags: ['Info']
  }
]

const filteredData = computed(() => {
  return data
    .filter((i) => filterBy(i.status, dropdownStatusSelected.value))
    .filter((i) => filterBy(i.type, dropdownTypeSelected.value))
    .filter((i) => dropdownTagsSelected.value.every((tag) => i.tags.includes(tag)))
})

const orderedData = computed(() => {
  return orderBy(filteredData.value, [sort.by], [sort.order])
})

const table = useTable({
  orders: ['name', 'status', 'type', 'tags', 'createdAt'],

  columns: {
    name: {
      label: 'Name',
      dropdown: dropdownName,
      cell: {
        type: 'text',
        icon: markRaw(IconImageSquare),
        link: (_value, record) => record.link
      },
      grow: true
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
      cell: { type: 'text', color: 'soft' },
      resizable: false
    },

    tags: {
      label: 'Tags',
      dropdown: dropdownTags,
      cell: {
        type: 'pills',
        pills(items: string[]) {
          return items.map((item) => ({
            label: item,
            color: item === 'Info'
              ? 'info'
              : item === 'Latest' ? 'success' : 'mute'
          }))
        }
      }
    }
  },

  records: orderedData,
  total: computed(() => orderedData.value.length),
  page: 1,
  perPage: 5,
  reset: hasFilters,
  onPrev: () => {},
  onNext: () => {},
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
  dropdownTagsSelected.value = []
}

function updateStatusFilter(value: string) {
  dropdownStatusSelected.value = xor(dropdownStatusSelected.value, [value])
}

function updateTypeFilter(value: string) {
  dropdownTypeSelected.value = xor(dropdownTypeSelected.value, [value])
}

function updateTagsFilter(value: string) {
  dropdownTagsSelected.value = xor(dropdownTagsSelected.value, [value])
}
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title">
      <STable class="table" :options="table" />
    </Board>
  </Story>
</template>

<style scoped>
.table :deep(.col-name)      { --table-col-width: 160px; }
.table :deep(.col-status)    { --table-col-width: 144px; }
.table :deep(.col-type)      { --table-col-width: 144px; }
.table :deep(.col-tags)      { --table-col-width: 192px; }
.table :deep(.col-createdAt) { --table-col-width: 192px; }
</style>
