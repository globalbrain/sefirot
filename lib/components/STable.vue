<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import {
  computed,
  nextTick,
  reactive,
  ref,
  shallowRef,
  unref,
  watch
} from 'vue'
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
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

const head = shallowRef<HTMLElement | null>(null)
const body = shallowRef<HTMLElement | null>(null)
const block = shallowRef<HTMLElement | null>(null)
const row = shallowRef<HTMLElement | null>(null)

const colToGrowAdjusted = ref(false)

const colToGrow = computed(() => {
  if (colToGrowAdjusted.value) {
    return -1
  }

  return unref(props.options.orders).findIndex((key) => {
    return unref(props.options.columns)[key]?.grow
  }) ?? -1
})

const nameOfColToGrow = computed(() => {
  return unref(props.options.orders)[colToGrow.value]
})

const cellOfColToGrow = computed(() => {
  return row.value?.children[colToGrow.value]
})

let headLock = false
let bodyLock = false

const colWidths = reactive<Record<string, string>>({})
const blockWidth = ref<number | undefined>()

const showHeader = computed(() => {
  const header = unref(props.options.header)

  if (header != null) {
    return header
  }

  return unref(props.options.total) != null || !!unref(props.options.reset)
})

const showFooter = computed(() => {
  if (unref(props.options.loading)) {
    return false
  }

  const footer = unref(props.options.footer)

  if (footer != null) {
    return footer
  }

  return (
    unref(props.options.page)
    && unref(props.options.perPage)
    && unref(props.options.total)
  )
})

const showMissing = computed(() => {
  return (
    !unref(props.options.loading)
    && unref(props.options.records)
    && !unref(props.options.records)!.length
  )
})

const classes = computed(() => ({
  'has-header': showHeader.value,
  'has-footer': showFooter.value,
  'borderless': unref(props.options.borderless)
}))

const recordsWithSummary = computed(() => {
  const records = unref(props.options.records) ?? []
  const summary = unref(props.options.summary)

  const res = summary ? [...records, summary] : records

  res.forEach((record, index) => {
    record.__index = index
  })

  return res
})

watch(() => props.options.records, () => {
  headLock = true
  bodyLock = true
}, { flush: 'pre' })

watch(() => props.options.records, () => {
  syncScroll(head.value, body.value)
  headLock = false
  bodyLock = false
}, { flush: 'post' })

useResizeObserver(block, ([entry]) => {
  blockWidth.value = entry.contentRect.width
})

const resizeObserver = useResizeObserver(head, handleResize)

function stopObserving() {
  const orders = unref(props.options.orders)
  colWidths[orders[orders.length - 1]] = 'auto'
  resizeObserver.stop()
}

async function handleResize() {
  if (colToGrow.value < 0 || !cellOfColToGrow.value || !row.value) {
    stopObserving()
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
  if (triggeredByUser && colToGrow.value >= 0) {
    colToGrowAdjusted.value = true
    stopObserving()
  }
}

function isSummaryOrLastClass(index: number) {
  if (isSummary(index)) {
    return 'summary'
  }

  return lastRow(index) ? 'last' : ''
}

function isSummary(index: number) {
  return index === unref(props.options.records)?.length
}

function lastRow(index: number) {
  return index === recordsWithSummary.value.length - 1
}

function getCell(key: string, index: number) {
  const col = unref(props.options.columns)[key]
  return (isSummary(index) && col?.summaryCell) ? col?.summaryCell : col?.cell
}
</script>

<template>
  <div class="STable" :class="classes">
    <div class="box">
      <STableHeader
        v-if="showHeader"
        :total="unref(options.total)"
        :reset="unref(options.reset)"
        :borderless="unref(options.borderless)"
        :on-reset="options.onReset"
      />

      <div class="table" role="grid">
        <div
          class="container head"
          ref="head"
          @mouseenter="lockHead(true)"
          @mouseleave="lockHead(false)"
          @scroll="syncHeadScroll"
        >
          <div class="block" ref="block">
            <div class="row" ref="row">
              <STableItem
                v-for="key in unref(options.orders)"
                :key="key"
                :name="key"
                :class-name="unref(options.columns)[key].className"
                :width="colWidths[key]"
              >
                <STableColumn
                  :name="key"
                  :label="unref(options.columns)[key].label"
                  :class-name="unref(options.columns)[key].className"
                  :dropdown="unref(options.columns)[key].dropdown"
                  :has-header="showHeader"
                  :resizable="unref(options.columns)[key].resizable"
                  @resize="(value) => updateColWidth(key, value, true)"
                />
              </STableItem>
            </div>
          </div>
        </div>

        <div
          v-if="!unref(options.loading) && unref(options.records)?.length"
          class="container body"
          ref="body"
          @mouseenter="lockBody(true)"
          @mouseleave="lockBody(false)"
          @scroll="syncBodyScroll"
        >
          <DynamicScroller
            :items="recordsWithSummary"
            :min-item-size="40"
            key-field="__index"
            class="block"
            :style="blockWidth ? { width: `${blockWidth}px` } : undefined"
            :prerender="Math.min(10, recordsWithSummary.length)"
          >
            <template #default="{ item: record, index: rIndex, active }">
              <DynamicScrollerItem
                :item="record"
                :active="active"
                :data-index="rIndex"
              >
                <div class="row" :class="isSummaryOrLastClass(rIndex)">
                  <STableItem
                    v-for="key in unref(options.orders)"
                    :key="key"
                    :name="key"
                    :class-name="unref(options.columns)[key].className"
                    :width="colWidths[key]"
                  >
                    <STableCell
                      :name="key"
                      :class="isSummary(rIndex) && 'summary'"
                      :class-name="unref(options.columns)[key].className"
                      :cell="getCell(key, rIndex)"
                      :value="record[key]"
                      :record="record"
                      :records="unref(options.records)!"
                    />
                  </STableItem>
                </div>
              </DynamicScrollerItem>
            </template>
          </DynamicScroller>
        </div>
      </div>

      <div v-if="showMissing" class="missing">
        <p class="missing-text">No results matched your search.</p>
      </div>

      <div v-if="unref(options.loading)" class="loading">
        <div class="loading-icon">
          <SSpinner class="loading-svg" />
        </div>
      </div>

      <STableFooter
        v-if="showFooter"
        :total="unref(options.total)"
        :page="unref(options.page)"
        :per-page="unref(options.perPage)"
        :borderless="unref(options.borderless)"
        :on-prev="options.onPrev"
        :on-next="options.onNext"
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
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .STable.has-header & {
    border-radius: 0;
  }
}

.container.body {
  border-radius: 6px 6px var(--table-border-radius) var(--table-border-radius);
  line-height: 0;

  .STable.has-footer & {
    border-radius: 0;
  }

  .block {
    max-height: var(--table-max-height, 100%);
    overflow-y: auto;
  }
}

.block {
  display: inline-block;
  min-width: 100%;
}

:deep(.row) {
  display: flex;
  border-bottom: 1px solid var(--c-divider-2);
}

:deep(.row.last),
:deep(.row.summary) {
  border-bottom: 0;
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
