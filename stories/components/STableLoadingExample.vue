<script setup lang="ts">
import IconCheck from '~icons/ph/check-bold'
import IconImageSquare from '~icons/ph/image-square-bold'
import IconNotePencil from '~icons/ph/note-pencil-bold'
import IconTrash from '~icons/ph/trash-bold'
import { orderBy, xor } from 'lodash-es'
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SControl from 'sefirot/components/SControl.vue'
import SControlButton from 'sefirot/components/SControlButton.vue'
import SControlInputSearch from 'sefirot/components/SControlInputSearch.vue'
import SControlLeft from 'sefirot/components/SControlLeft.vue'
import SControlPagination from 'sefirot/components/SControlPagination.vue'
import SControlRight from 'sefirot/components/SControlRight.vue'
import STable from 'sefirot/components/STable.vue'
import { createDropdown } from 'sefirot/composables/Dropdown'
import { useTable } from 'sefirot/composables/Table'
import { day } from 'sefirot/support/Day'
import { computed, onMounted, reactive, ref, shallowRef, watch } from 'vue'

interface Props {
  loadingDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  loadingDelay: 300
})

interface Sort {
  by: string
  order: 'asc' | 'desc'
}

const optionsSelected = ref<string[]>([])

const sort = reactive<Sort>({
  by: 'name',
  order: 'asc'
})

const dropdownName = createDropdown([
  {
    type: 'menu',
    options: [
      {
        label: 'Sort ascending (A...Z)',
        onClick: () => updateSort('name', 'asc')
      },
      {
        label: 'Sort descending (Z...A)',
        onClick: () => updateSort('name', 'desc')
      }
    ]
  }
])

const dropdownStatusSelected = ref<string[]>([])

const dropdownStatus = createDropdown([
  {
    type: 'menu',
    options: [
      {
        label: 'Sort ascending (A...Z)',
        onClick: () => updateSort('status', 'asc')
      },
      {
        label: 'Sort descending (Z...A)',
        onClick: () => updateSort('status', 'desc')
      }
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
      {
        label: 'Sort ascending (A...Z)',
        onClick: () => updateSort('type', 'asc')
      },
      {
        label: 'Sort descending (Z...A)',
        onClick: () => updateSort('type', 'desc')
      }
    ]
  },
  {
    type: 'filter',
    search: true,
    selected: dropdownTypeSelected,
    options: [
      { label: 'Photo', value: 'Photo', onClick: updateTypeFilter },
      {
        label: 'Illustration',
        value: 'Illustration',
        onClick: updateTypeFilter
      },
      { label: 'Icon', value: 'Icon', onClick: updateTypeFilter },
      { label: 'Other', value: 'Other', onClick: updateTypeFilter }
    ]
  }
])

const dropdownWidth = createDropdown([
  {
    type: 'menu',
    options: [
      {
        label: 'Sort ascending (A...Z)',
        onClick: () => updateSort('width', 'asc')
      },
      {
        label: 'Sort descending (Z...A)',
        onClick: () => updateSort('width', 'desc')
      }
    ]
  }
])

const dropdownTagsSelected = ref<string[]>([])

const dropdownTags = createDropdown([
  {
    type: 'filter',
    search: true,
    selected: dropdownTagsSelected,
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
      {
        label: 'Sort ascending (A...Z)',
        onClick: () => updateSort('createdAt', 'asc')
      },
      {
        label: 'Sort descending (Z...A)',
        onClick: () => updateSort('createdAt', 'desc')
      }
    ]
  }
])

type DataItem = {
  name: string
  link: string
  status: string
  type: string
  width: number
  authors: { image: string; name: string }[]
  createdAt: ReturnType<typeof day>
  tags: string[]
}

const fullData = Array.from<DataItem[]>({ length: 199 })
  .fill([
    {
      name: 'Artwork 001',
      link: 'https://example.com',
      status: 'Published',
      type: 'Photo',
      width: 1280,
      authors: [
        { image: 'https://i.pravatar.cc/64?img=1', name: 'Jane Doe' },
        { image: 'https://i.pravatar.cc/64?img=2', name: 'Daniel Green' }
      ],
      createdAt: day('2022-10-10'),
      tags: ['Info', 'News', 'Latest']
    },
    {
      name: 'Artwork 002',
      link: 'https://example.com',
      status: 'Draft',
      type: 'Icon',
      width: 1280,
      authors: [
        { image: 'https://i.pravatar.cc/64?img=3', name: 'John Black' }
      ],
      createdAt: day('2022-10-09'),
      tags: ['Info']
    },
    {
      name: 'Artwork 003',
      link: 'https://example.com',
      status: 'Published',
      type: 'Photo',
      width: 1920,
      authors: [
        { image: 'https://i.pravatar.cc/64?img=4', name: 'Kris James' },
        { image: 'https://i.pravatar.cc/64?img=5', name: 'Becky Lu' },
        { image: 'https://i.pravatar.cc/64?img=7', name: 'Thomas Wane' }
      ],
      createdAt: day('2022-10-02'),
      tags: ['Info', 'News']
    },
    {
      name: 'Artwork 004',
      link: 'https://example.com',
      status: 'Published',
      type: 'Illustration',
      width: 768,
      authors: [
        { image: 'https://i.pravatar.cc/64?img=1', name: 'Jane Doe' },
        { image: 'https://i.pravatar.cc/64?img=2', name: 'Daniel Green' }
      ],
      createdAt: day('2022-09-12'),
      tags: ['Info', 'News']
    },
    {
      name: 'Artwork 005',
      link: 'https://example.com',
      status: 'Archived',
      type: 'Other',
      width: 512,
      authors: [
        { image: 'https://i.pravatar.cc/64?img=4', name: 'Kris James' },
        { image: 'https://i.pravatar.cc/64?img=5', name: 'Becky Lu' },
        { image: 'https://i.pravatar.cc/64?img=7', name: 'Thomas Wane' }
      ],
      createdAt: day('2022-09-08'),
      tags: ['Info']
    }
  ])
  .flat()
  .map((item, index) => ({
    ...item,
    name: `Artwork ${(index + 1).toString().padStart(3, '0')}`
  }))

const perPage = shallowRef(50)
const page = shallowRef(1)

const loading = shallowRef(true)
const displayedData = shallowRef<any[]>([])

onMounted(() => {
  // Simulate initial loading
  setTimeout(() => {
    loading.value = false
  }, props.loadingDelay)
})

function gotoNextPage() {
  loading.value = true
  setTimeout(() => {
    page.value += 1
    loading.value = false
  }, props.loadingDelay)
}

function gotoPrevPage() {
  loading.value = true
  setTimeout(() => {
    page.value -= 1
    loading.value = false
  }, props.loadingDelay)
}

const filteredData = computed(() => {
  return fullData
    .filter((i) => filterBy(i.status, dropdownStatusSelected.value))
    .filter((i) => filterBy(i.type, dropdownTypeSelected.value))
    .filter((i) =>
      dropdownTagsSelected.value.every((tag) => i.tags.includes(tag))
    )
})

const orderedData = computed(() => {
  return orderBy(filteredData.value, [sort.by], [sort.order]).slice(
    (page.value - 1) * perPage.value,
    page.value * perPage.value
  )
})

// Update displayed data when loading completes
watch(loading, (newValue) => {
  if (!newValue) {
    displayedData.value = orderedData.value
  }
})

const table = useTable({
  loading,
  records: displayedData,

  borderless: true,
  indexField: 'name',

  orders: [
    'name',
    'status',
    'authors',
    'type',
    'width',
    'tags',
    'createdAt',
    'actions'
  ],

  columns: {
    name: {
      label: 'Name',
      dropdown: dropdownName,
      freeze: true,
      grow: true,
      cell: (_, record) => ({
        type: 'text',
        icon: IconImageSquare,
        link: record.link
      })
    },

    status: {
      label: 'Status',
      dropdown: dropdownStatus,
      cell: (_, record) => ({
        type: 'state',
        label: record.status,
        mode:
          record.status === 'Published'
            ? 'success'
            : record.status === 'Draft'
              ? 'info'
              : 'mute'
      })
    },

    authors: {
      label: 'Authors',
      cell: (authors) => ({
        type: 'avatars',
        avatars: authors,
        nameCount: 0,
        tooltip: true
      })
    },

    type: {
      label: 'Type',
      show: computed(() => !optionsSelected.value.includes('hide-type')),
      dropdown: dropdownType,
      cell: { type: 'text', color: 'soft' }
    },

    width: {
      label: 'Width',
      show: computed(() => !optionsSelected.value.includes('hide-width')),
      dropdown: dropdownWidth,
      cell: {
        type: 'number',
        align: 'right',
        separator: true,
        color: 'soft'
      }
    },

    tags: {
      label: 'Tags',
      show: computed(() => !optionsSelected.value.includes('hide-tags')),
      dropdown: dropdownTags,
      cell: (_, record) => ({
        type: 'pills',
        pills: record.tags.map((tag: string) => ({
          label: tag,
          color:
            tag === 'Info' ? 'info' : tag === 'Latest' ? 'success' : 'mute'
        }))
      })
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

    actions: {
      cell: {
        type: 'actions',
        /* eslint-disable no-alert */
        actions: [
          {
            icon: IconCheck,
            onClick: () => {
              alert('Publish')
            }
          },
          {
            icon: IconNotePencil,
            onClick: () => {
              alert('Edit')
            }
          },
          {
            icon: IconTrash,
            onClick: () => {
              alert('Delete')
            }
          }
        ]
        /* eslint-enable */
      },
      resizable: false
    }
  }
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
  <SCard>
    <SCardBlock size="medium" class="s-px-12">
      <SControl>
        <SControlLeft>
          <SControlInputSearch class="s-max-w-320" :model-value="null" />
          <SControlButton
            type="outline"
            mode="mute"
            label="Reset filters"
            @click="resetFilters"
          />
        </SControlLeft>
        <SControlRight>
          <SControlButton mode="info" label="New item" />
        </SControlRight>
      </SControl>
    </SCardBlock>
    <SCardBlock>
      <STable class="table" :options="table" />
    </SCardBlock>
    <SCardBlock size="medium" class="s-px-12">
      <SControl>
        <SControlRight>
          <SControlPagination
            :total="filteredData.length"
            :page
            :per-page
            @next="gotoNextPage"
            @prev="gotoPrevPage"
          />
        </SControlRight>
      </SControl>
    </SCardBlock>
  </SCard>
</template>

<style scoped lang="postcss">
.table {
  --table-head-position: sticky;
  --table-head-top: 0;
}

.table :deep(.container.body) {
  /* Keep the table body inside the viewport to be scrollable */
  max-height: calc(100vh -
      /* Table control + pagination, both 56px height */
      56px * 2 -
      /* Table content header, 41px height (including border) */
      41px -
      /* Vertical paddings of Story <Board /> */
      32px * 2 -
      /* Height of Story nav header */
      56px);
}

.table :deep(.col-name) {
  --table-col-width: 144px;
}
.table :deep(.col-status) {
  --table-col-width: 128px;
}
.table :deep(.col-authors) {
  --table-col-width: 128px;
}
.table :deep(.col-type) {
  --table-col-width: 128px;
}
.table :deep(.col-width) {
  --table-col-width: 128px;
}
.table :deep(.col-tags) {
  --table-col-width: 192px;
}
.table :deep(.col-createdAt) {
  --table-col-width: 128px;
}

.table :deep(.col-actions) {
  --table-col-position: sticky;
  --table-col-z-index: 50;
  --table-col-left: auto;
  --table-col-right: 0px;
  --table-col-border-left: 1px;
}
</style>
