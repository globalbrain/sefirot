<script setup lang="ts">
import IconImageSquare from '@iconify-icons/ph/image-square'
import { orderBy, xor } from 'lodash-es'
import STable from 'sefirot/components/STable.vue'
import { createDropdown } from 'sefirot/composables/Dropdown'
import { useTable } from 'sefirot/composables/Table'
import { day } from 'sefirot/support/Day'
import { computed, markRaw, reactive, ref } from 'vue'

interface Sort {
  by: string
  order: 'asc' | 'desc'
}

const title = 'Components / STable / 01. Playground'
const docs = '/components/table'

const optionsSelected = ref<string[]>([])

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

const dropdownWidth = createDropdown([
  {
    type: 'menu',
    options: [
      { label: 'Sort ascending (A...Z)', onClick: () => updateSort('width', 'asc') },
      { label: 'Sort descending (Z...A)', onClick: () => updateSort('width', 'desc') }
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
    width: 1280,
    createdAt: day('2022-10-10'),
    tags: ['Info', 'News', 'Latest']
  },
  {
    name: 'Artwork 002',
    link: 'https://example.com',
    status: 'Draft',
    type: 'Icon',
    width: 1280,
    createdAt: day('2022-10-09'),
    tags: ['Info']
  },
  {
    name: 'Artwork 003',
    link: 'https://example.com',
    status: 'Published',
    type: 'Photo',
    width: 1920,
    createdAt: day('2022-10-02'),
    tags: ['Info', 'News']
  },
  {
    name: 'Artwork 004',
    link: 'https://example.com',
    status: 'Published',
    type: 'Illustration',
    width: 768,
    createdAt: day('2022-09-12'),
    tags: ['Info', 'News']
  },
  {
    name: 'Artwork 005',
    link: 'https://example.com',
    status: 'Archived',
    type: 'Other',
    width: 512,
    createdAt: day('2022-09-08'),
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
  orders: [
    'name',
    'status',
    'type',
    'width',
    'tags',
    'createdAt'
  ],

  columns: computed(() => ({
    name: {
      label: 'Name',
      dropdown: dropdownName,
      grow: true,
      cell: (_, record) => ({
        type: 'text',
        icon: markRaw(IconImageSquare),
        link: record.link
      })
    },

    status: {
      label: 'Status',
      dropdown: dropdownStatus,
      cell: (_value, record) => ({
        type: 'state',
        label: record.status,
        mode: record.status === 'Published'
          ? 'success'
          : record.status === 'Draft' ? 'info' : 'mute'
      })
    },

    type: {
      label: 'Type',
      show: !optionsSelected.value.includes('hide-type'),
      dropdown: dropdownType,
      cell: { type: 'text', color: 'soft' }
    },

    width: {
      label: 'Width',
      show: !optionsSelected.value.includes('hide-width'),
      dropdown: dropdownWidth,
      cell: {
        type: 'number',
        align: 'right',
        separator: true,
        color: 'soft'
      }
    },

    createdAt: {
      label: 'Created at',
      dropdown: dropdownCreatedAt,
      cell: {
        type: 'day',
        format: 'YYYY-MM-DD',
        color: 'soft'
      },
      resizable: false
    },

    tags: {
      label: 'Tags',
      show: !optionsSelected.value.includes('hide-tags'),
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
  })),

  menu: computed(() => [
    {
      label: 'Options',
      state: optionsSelected.value.length ? 'indicate' : 'inactive',
      dropdown: createDropdown([
        {
          type: 'filter',
          selected: optionsSelected,
          options: [
            { label: 'Hide type', value: 'hide-type', onClick: updateOptions },
            { label: 'Hide width', value: 'hide-width', onClick: updateOptions },
            { label: 'Hide tags', value: 'hide-tags', onClick: updateOptions }
          ]
        }
      ])
    }
  ]),

  records: orderedData as any, // FIXME
  total: computed(() => orderedData.value.length),
  page: 1,
  perPage: 5,
  reset: hasFilters,
  onPrev: () => {},
  onNext: () => {},
  onReset: resetFilters
})

function updateOptions(value: string) {
  optionsSelected.value = xor(optionsSelected.value, [value])
}

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
    <Board :title="title" :docs="docs">
      <STable class="table" :options="table" />
    </Board>
  </Story>
</template>

<style scoped>
.table :deep(.col-name)      { --table-col-width: 160px; }
.table :deep(.col-status)    { --table-col-width: 144px; }
.table :deep(.col-type)      { --table-col-width: 128px; }
.table :deep(.col-width)     { --table-col-width: 128px; }
.table :deep(.col-tags)      { --table-col-width: 192px; }
.table :deep(.col-createdAt) { --table-col-width: 192px; }

.table {
  margin-bottom: 16px;
}
</style>
