<script setup lang="ts">
import { useVirtualizer } from '@tanstack/vue-virtual'
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
import { type Table } from '../composables/Table'
import SInputCheckbox from './SInputCheckbox.vue'
import SSpinner from './SSpinner.vue'
import STableCell from './STableCell.vue'
import STableColumn from './STableColumn.vue'
import STableFooter from './STableFooter.vue'
import STableHeader from './STableHeader.vue'
import STableItem from './STableItem.vue'

const props = defineProps<{
  options: Table
  selected?: number[]
}>()

const emit = defineEmits<{
  (e: 'update:selected', value: number[]): void
}>()

const head = shallowRef<HTMLElement | null>(null)
const body = shallowRef<HTMLElement | null>(null)
const block = shallowRef<HTMLElement | null>(null)
const row = shallowRef<HTMLElement | null>(null)

const ordersToShow = computed(() => {
  const orders = unref(props.options.orders).filter((key) => {
    return unref(props.options.columns)[key]?.show !== false
  })
  if (props.selected) {
    return ['__select', ...orders]
  }
  return orders
})

watch(() => ordersToShow.value, handleResize)

const colToGrowAdjusted = ref(false)

const colToGrow = computed(() => {
  if (colToGrowAdjusted.value) {
    return -1
  }

  return ordersToShow.value.findIndex((key) => {
    return unref(props.options.columns)[key]?.grow
  }) ?? -1
})

const nameOfColToGrow = computed(() => {
  return ordersToShow.value[colToGrow.value]
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

  return (
    unref(props.options.total) != null
    || !!unref(props.options.reset)
    || !!unref(props.options.menu)
  )
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

  return summary ? [...records, summary] : records
})

const wm = reactive(new WeakMap())

const control = computed({
  get() {
    const records = unref(props.options.records) ?? []

    const selected = records
      .map((record, i) => (wm.get(record) ? i : -1))
      .filter((i) => i >= 0)

    emit('update:selected', selected)

    return selected.length === records.length
      ? true
      : selected.length ? 'indeterminate' : false
  },

  set(newValue) {
    unref(props.options.records)?.forEach((record) => {
      wm.set(record, newValue === true)
    })
  }
})

const virtualizerOptions = computed(() => ({
  count: recordsWithSummary.value.length,
  getScrollElement: () => body.value,
  estimateSize: () => unref(props.options.rowSize) ?? 41,
  overscan: 10
}))

const rowVirtualizer = useVirtualizer(virtualizerOptions)
const virtualItems = computed(() => rowVirtualizer.value.getVirtualItems())

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
  const orders = ordersToShow.value
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
  if (key === '__select') {
    return { type: 'empty' }
  }
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
        :menu="unref(options.menu)"
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
                v-for="key in ordersToShow"
                :key="key"
                :name="key"
                :class-name="unref(options.columns)[key]?.className"
                :width="colWidths[key]"
              >
                <STableColumn
                  :name="key"
                  :label="unref(options.columns)[key]?.label"
                  :class-name="unref(options.columns)[key]?.className"
                  :dropdown="unref(options.columns)[key]?.dropdown"
                  :has-header="showHeader"
                  :resizable="unref(options.columns)[key]?.resizable"
                  @resize="(value) => updateColWidth(key, value, true)"
                >
                  <SInputCheckbox v-if="key === '__select'" v-model="control" />
                </STableColumn>
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
          <div
            class="block"
            :style="{
              width: blockWidth ? `${blockWidth}px` : '100%',
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: 'relative'
            }"
          >
            <div
              v-for="{ index, key: __key, size, start } in virtualItems"
              :key="__key"
            >
              <div
                class="row"
                :class="isSummaryOrLastClass(index)"
                :style="{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${size}px`,
                  transform: `translateY(${start}px)`
                }"
              >
                <STableItem
                  v-for="key in ordersToShow"
                  :key="key"
                  :name="key"
                  :class-name="unref(options.columns)[key]?.className"
                  :width="colWidths[key]"
                >
                  <STableCell
                    :name="key"
                    :class="isSummary(index) && 'summary'"
                    :class-name="unref(options.columns)[key]?.className"
                    :cell="getCell(key, index)"
                    :value="recordsWithSummary[index][key]"
                    :record="recordsWithSummary[index]"
                    :records="unref(options.records)!"
                  >
                    <SInputCheckbox
                      v-if="key === '__select' && !isSummary(index)"
                      :value="wm.get(recordsWithSummary[index])"
                      @change="(c) => wm.set(recordsWithSummary[index], c)"
                    />
                  </STableCell>
                </STableItem>
              </div>
            </div>
          </div>
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
  max-height: var(--table-max-height, 100%);

  .STable.has-footer & {
    border-radius: 0;
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

.col-__select {
  --table-padding-left: 0;
  --table-col-width: auto;

  :deep(.input) {
    align-items: center;
    padding: 0 16px;
    min-height: 40px;
  }

  :deep(.container) {
    padding: 0;
  }
}
</style>
