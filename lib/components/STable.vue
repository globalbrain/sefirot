<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import {
  computed,
  nextTick,
  reactive,
  ref,
  shallowRef,
  toRefs,
  watch
} from 'vue'
import type { Table } from '../composables/Table'
import SSpinner from './SSpinner.vue'
import STableCell from './STableCell.vue'
import STableColumn from './STableColumn.vue'
import STableFooter from './STableFooter.vue'
import STableHeader from './STableHeader.vue'
import STableItem from './STableItem.vue'

const props = defineProps<{
  options: Table
}>()

const {
  orders,
  columns,
  records,
  header,
  footer,
  summary,
  total,
  page,
  perPage,
  reset,
  borderless,
  loading,
  onPrev,
  onNext,
  onReset
} = toRefs(props.options)

const head = shallowRef<HTMLElement | null>(null)
const body = shallowRef<HTMLElement | null>(null)

const row = shallowRef<HTMLElement | null>(null)
const colToGrowAdjusted = ref(false)
const colToGrow = computed(() =>
  colToGrowAdjusted.value
    ? -1
    : orders.value?.findIndex((key) => columns.value[key]?.grow) ?? -1
)
const nameOfColToGrow = computed(() => orders.value[colToGrow.value])
const cellOfColToGrow = computed(() => row.value?.children[colToGrow.value])

let headLock = false
let bodyLock = false

const colWidths = reactive<Record<string, string>>({})

const showHeader = computed(() => {
  if (header?.value === true) {
    return true
  }

  if (header?.value === false) {
    return false
  }

  return total?.value !== undefined || !!reset?.value
})

const showFooter = computed(() => {
  if (loading?.value) {
    return false
  }

  if (footer?.value === true) {
    return true
  }

  if (footer?.value === false) {
    return false
  }

  return page?.value && perPage?.value && total?.value
})

const classes = computed(() => ({
  'has-header': showHeader.value,
  'has-footer': showFooter.value,
  'borderless': borderless?.value
}))

const recordsWithSummary = computed(() => {
  return (records?.value && summary?.value)
    ? [...records?.value, summary?.value]
    : records?.value ?? []
})

watch(() => records?.value, () => {
  headLock = true
  bodyLock = true
}, { flush: 'pre' })

watch(() => records?.value, () => {
  syncScroll(head.value, body.value)
  headLock = false
  bodyLock = false
}, { flush: 'post' })

const handleResize = async () => {
  if (colToGrow.value < 0 || !cellOfColToGrow.value || !row.value) {
    return
  }

  const initialWidth = getComputedStyle(cellOfColToGrow.value)
    .getPropertyValue('--table-col-width')
    .trim()

  updateColWidth(nameOfColToGrow.value, initialWidth)
  await nextTick()

  let totalWidth = 0
  for (const el of row.value.children) {
    totalWidth += el.getBoundingClientRect().width
  }

  const availableFill = row.value.getBoundingClientRect().width - totalWidth
  updateColWidth(
    nameOfColToGrow.value,
    `calc(${availableFill}px + ${initialWidth})`
  )
}

useResizeObserver(head, handleResize)

function syncHeadScroll() {
  bodyLock || syncScroll(head.value, body.value)
}

function syncBodyScroll() {
  headLock || syncScroll(body.value, head.value)
}

function syncScroll(from: HTMLElement | null, to: HTMLElement | null) {
  if (from && to) {
    to.scrollLeft = from.scrollLeft
  }
}

function lockHead(value: boolean) {
  headLock = value
}

function lockBody(value: boolean) {
  bodyLock = value
}

function updateColWidth(key: string, value: string, triggeredByUser = false) {
  colWidths[key] = value
  if (triggeredByUser && !colToGrowAdjusted.value) {
    colToGrowAdjusted.value = true
    Object.entries(columns.value).some(([key, col]) => {
      if (col.fillOnAdjust) {
        colWidths[key] = 'auto'
        return true
      }
      return false
    })
  }
}

function isSummary(index: number) {
  return index === records?.value?.length
}

function getCell(key: string, index: number) {
  return (isSummary(index) && columns.value[key]?.summaryCell)
    ? columns.value[key]?.summaryCell
    : columns.value[key]?.cell
}
</script>

<template>
  <div class="STable" :class="classes">
    <div class="box">
      <STableHeader
        v-if="showHeader"
        :total="total"
        :reset="reset"
        :borderless="borderless"
        :on-reset="onReset"
      />

      <div class="table" role="grid">
        <div
          class="container head"
          ref="head"
          @mouseenter="lockHead(true)"
          @mouseleave="lockHead(false)"
          @scroll="syncHeadScroll"
        >
          <div class="block">
            <div class="row" ref="row">
              <STableItem
                v-for="key in orders"
                :key="key"
                :name="key"
                :class-name="columns[key].className"
                :width="colWidths[key]"
              >
                <STableColumn
                  :name="key"
                  :label="columns[key].label"
                  :class-name="columns[key].className"
                  :dropdown="columns[key].dropdown"
                  :has-header="showHeader"
                  :resizable="columns[key].resizable"
                  @resize="(value) => updateColWidth(key, value, true)"
                />
              </STableItem>
            </div>
          </div>
        </div>

        <div
          v-if="!loading && records && records.length"
          class="container body"
          ref="body"
          @mouseenter="lockBody(true)"
          @mouseleave="lockBody(false)"
          @scroll="syncBodyScroll"
        >
          <div class="block">
            <div
              v-for="(record, rIndex) in recordsWithSummary"
              :key="rIndex"
              class="row"
              :class="isSummary(rIndex) && 'summary'"
            >
              <STableItem
                v-for="key in orders"
                :key="key"
                :name="key"
                :class-name="columns[key].className"
                :width="colWidths[key]"
              >
                <STableCell
                  :name="key"
                  :class="isSummary(rIndex) && 'summary'"
                  :class-name="columns[key].className"
                  :cell="getCell(key, rIndex)"
                  :value="record[key]"
                  :record="record"
                  :records="records"
                />
              </STableItem>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!loading && records && !records.length" class="missing">
        <p class="missing-text">
          No results matched your search.
        </p>
      </div>

      <div v-if="loading" class="loading">
        <div class="loading-icon">
          <SSpinner class="loading-svg" />
        </div>
      </div>

      <STableFooter
        v-if="showFooter"
        :total="total"
        :page="page"
        :per-page="perPage"
        :borderless="borderless"
        :on-prev="onPrev"
        :on-next="onNext"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.box {
  position: relative;
  border-top: var(--table-border-top, var(--table-border));
  border-right: var(--table-border-right, var(--table-border));
  border-bottom: var(--table-border-bottom, var(--table-border));
  border-left: var(--table-border-left, var(--table-border));
  border-radius: var(--table-border-radius);
  width: 100%;

  .STable.borderless & {
    border-right: 0;
    border-left: 0;
    border-radius: 0;
  }
}

.table {
  position: relative;
  min-width: 100%;
  white-space: nowrap;
}

.container {
  position: static;
  width: 100%;
  min-width: 100%;
  overflow-x: auto;
}

.container.head {
  position: var(--table-head-position, static);
  top: var(--table-head-top, auto);
  z-index: 100;
  border-radius: var(--table-border-radius) var(--table-border-radius) 0 0;
  background-color: var(--bg-elv-2);

  .STable.has-header & {
    border-radius: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.container.body {
  border-radius: 6px 6px var(--table-border-radius) var(--table-border-radius);

  .STable.has-footer & {
    border-radius: 0;
  }
}

.block {
  display: inline-block;
  min-width: 100%;
}

.row {
  display: flex;
  border-bottom: 1px solid var(--c-divider-2);

  .body &:last-child {
    border-bottom: 0;
  }
}

.missing {
  border-radius: 0 0 6px 6px;
  padding: 48px 32px;
  text-align: center;
  background-color: var(--c-bg-elv-3);
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--c-text-3);
}

.loading {
  border-radius: 0 0 6px 6px;
  padding: 64px 32px;
  background-color: var(--c-bg-elv-3);
}

.loading-icon {
  margin: 0 auto;
  width: 48px;
  height: 48px;
}

.loading-svg {
  width: 48px;
  height: 48px;
  color: var(--c-text-1);
}
</style>
