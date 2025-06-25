<script setup lang="ts">
import IconImageSquare from '~icons/ph/image-square-bold'
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SControl from 'sefirot/components/SControl.vue'
import SControlButton from 'sefirot/components/SControlButton.vue'
import SControlInputSearch from 'sefirot/components/SControlInputSearch.vue'
import SControlLeft from 'sefirot/components/SControlLeft.vue'
import SControlPagination from 'sefirot/components/SControlPagination.vue'
import SControlRight from 'sefirot/components/SControlRight.vue'
import STable from 'sefirot/components/STable.vue'
import { useTable } from 'sefirot/composables/Table'
import { day } from 'sefirot/support/Day'
import { ref, shallowRef } from 'vue'

const title = 'Components / STable / 02. Single Select'
const docs = '/components/table'

const selected = ref<number | null>(null)

const data = shallowRef([
  {
    id: 1,
    name: 'Artwork 001',
    link: 'https://example.com',
    type: 'Photo',
    width: 1280,
    createdAt: day('2022-10-10')
  },
  {
    id: 2,
    name: 'Artwork 002',
    link: 'https://example.com',
    type: 'Icon',
    width: 1280,
    createdAt: day('2022-10-09')
  },
  {
    id: 3,
    name: 'Artwork 003',
    link: 'https://example.com',
    type: 'Photo',
    width: 1920,
    createdAt: day('2022-10-02')
  },
  {
    id: 4,
    name: 'Artwork 004',
    link: 'https://example.com',
    type: 'Illustration',
    width: 768,
    createdAt: day('2022-09-12')
  },
  {
    id: 5,
    name: 'Artwork 005',
    link: 'https://example.com',
    type: 'Other',
    width: 512,
    createdAt: day('2022-09-08')
  }
])

const table = useTable({
  records: data,
  indexField: 'id',
  borderless: true,
  orders: [
    'name',
    'type',
    'width',
    'createdAt'
  ],
  columns: {
    name: {
      label: 'Name',
      freeze: true,
      grow: true,
      cell: (_, record) => ({
        type: 'text',
        icon: IconImageSquare,
        link: record.link
      })
    },
    type: {
      label: 'Type',
      cell: {
        type: 'text'
      }
    },
    width: {
      label: 'Width',
      cell: {
        type: 'number',
        align: 'right',
        separator: true
      }
    },
    createdAt: {
      label: 'Created at',
      resizable: false,
      cell: {
        type: 'day',
        format: 'YYYY-MM-DD'
      }
    }
  }
})
</script>

<template>
  <Story :title source="Not available" auto-props-disabled>
    <Board :title :docs>
      <SCard>
        <SCardBlock size="medium" class="s-px-12">
          <SControl>
            <SControlLeft>
              <SControlInputSearch class="s-max-w-320" :model-value="null" />
            </SControlLeft>
            <SControlRight>
              <SControlButton mode="info" label="New item" />
            </SControlRight>
          </SControl>
        </SCardBlock>
        <SCardBlock>
          <STable class="table" :options="table" v-model:selected="selected" />
        </SCardBlock>
        <SCardBlock size="medium" class="s-px-12">
          <SControl>
            <SControlRight>
              <SControlPagination
                :total="5"
                :page="1"
                :per-page="5"
              />
            </SControlRight>
          </SControl>
        </SCardBlock>
      </SCard>
    </Board>
  </Story>
</template>

<style scoped lang="postcss">
.table :deep(.col-name)      { --table-col-width: 144px; }
.table :deep(.col-type)      { --table-col-width: 128px; }
.table :deep(.col-width)     { --table-col-width: 128px; }
.table :deep(.col-createdAt) { --table-col-width: 128px; }
</style>
