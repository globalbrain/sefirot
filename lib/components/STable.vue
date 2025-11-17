<script setup lang="ts" generic="S extends any = undefined">
import { useVirtualizer } from '@tanstack/vue-virtual'
import { useResizeObserver } from '@vueuse/core'
import xor from 'lodash-es/xor'
import { type CSSProperties, computed, nextTick, reactive, ref, toValue, unref, useTemplateRef, watch } from 'vue'
import { type Table } from '../composables/Table'
import { type VirtualRow, calculateStaggerContext, getRowContentStyle, useTableLoadingAnimation } from '../composables/TableLoadingAnimation'
import { scrollTableIntoView } from '../composables/TableSmoothScroll'
import { smartComputed } from '../support/Reactivity'
import { getTextSize } from '../support/Text'
import SInputCheckbox from './SInputCheckbox.vue'
import SInputRadio from './SInputRadio.vue'
import STableCell from './STableCell.vue'
import STableColumn from './STableColumn.vue'
import STableFooter from './STableFooter.vue'
import STableHeader from './STableHeader.vue'
import STableItem from './STableItem.vue'

const props = defineProps<{ options: Table }>()
const selected = defineModel<S>('selected')

const tableRoot = useTemplateRef<HTMLElement>('tableRoot')
const head = useTemplateRef<HTMLElement>('head')
const body = useTemplateRef<HTMLElement>('body')
const block = useTemplateRef<HTMLElement>('block')
const row = useTemplateRef<HTMLElement>('row')

// Animation system
const {
  showSkeleton,
  shouldFadeIn,
  displayedRecords,
  config: animationConfig,
  startLoadingState,
  endLoadingState
} = useTableLoadingAnimation()

const ordersToShow = smartComputed(() => {
  const orders = unref(props.options.orders).filter((key) => {
    const show = unref(props.options.columns)[key]?.show
    return toValue(show) !== false
  })

  if (selected.value === undefined) {
    return orders
  }

  return ['__select', ...orders]
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

const colWidths = reactive<Record<string, string>>({})
const blockWidth = ref<number | undefined>()

watch(() => unref(props.options.columns), (columns) => {
  Object.keys(columns).forEach((key) => {
    const width = columns[key]?.width
    if (width) { colWidths[key] = width }
  })
}, { immediate: true, deep: true, flush: 'pre' })

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

  return !!(
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
  const records = displayedRecords.value ?? unref(props.options.records) ?? []
  const summary = unref(props.options.summary)

  return summary ? [...records, summary] : records
})

const indexes = smartComputed(() => {
  if (selected.value === undefined) {
    return []
  }

  const records = unref(props.options.records) ?? []
  const indexField = unref(props.options.indexField)

  return records.map((record, i) => (indexField ? record[indexField] : i))
})

const control = computed({
  get() {
    if (Array.isArray(selected.value)) {
      if (!selected.value.length) {
        return false
      }

      if (selected.value.length === indexes.value.length) {
        return true
      }
    }

    return 'indeterminate'
  },

  set(newValue) {
    if (newValue === false) {
      updateSelected([])
    } else if (newValue === true) {
      updateSelected(indexes.value)
    }
  }
})

watch(indexes, (newValue, oldValue) => {
  if (Array.isArray(selected.value)) {
    const removed = xor(newValue, oldValue)
    updateSelected(selected.value.filter((item) => !removed.includes(item)))
  }
})

const virtualizerOptions = computed(() => ({
  count: recordsWithSummary.value.length,
  getScrollElement: () => body.value,
  estimateSize: (index: number) => {
    const rowSize = unref(props.options.rowSize) ?? 40
    const borderSize = unref(props.options.borderSize) ?? 1
    return lastRow(index) ? rowSize : rowSize + borderSize
  },
  overscan: 10
}))

const rowVirtualizer = useVirtualizer(virtualizerOptions)
const virtualItems = computed(() => rowVirtualizer.value.getVirtualItems())
const staggerContext = computed(() =>
  calculateStaggerContext(
    virtualItems.value,
    body.value
  )
)

let isSyncingHead = false
let isSyncingBody = false

watch(() => unref(props.options.records), () => {
  isSyncingHead = true
  isSyncingBody = true
}, { flush: 'pre' })

watch(() => unref(props.options.records), () => {
  syncScroll(head.value, body.value)
  isSyncingHead = false
  isSyncingBody = false
}, { flush: 'post' })

const frozenColumns = smartComputed(() => {
  const columns = unref(props.options.columns)
  const keys = Object.keys(columns).filter((key) => columns[key].freeze)
  if (selected.value !== undefined && keys.length) {
    keys.unshift('__select')
  }
  return keys.filter((key) => ordersToShow.value.includes(key))
})

const frozenColWidths = smartComputed(() => {
  void blockWidth.value
  return frozenColumns.value.map((key) => getColWidth(key))
})

useResizeObserver(block, ([entry]) => {
  blockWidth.value = entry.contentRect.width
})

const resizeObserver = useResizeObserver(head, handleResize)

const font = typeof document !== 'undefined'
  ? `500 12px ${getComputedStyle(document.body).fontFamily}`
  : '500 12px Inter'

const actionsColumnWidth = computed(() => {
  const { cell } = unref(props.options.columns).actions ?? {}

  if (
    typeof document === 'undefined'
    || !cell
    || typeof cell === 'function'
    || cell.type !== 'actions'
  ) {
    return undefined
  }

  const { actions } = cell

  const widths = actions.map(({ icon, label }) => {
    // has only icon
    if (icon && !label) {
      return 1 /* border */ + 5 /* padding */ + 16 /* icon */ + 5 /* padding */ + 1 /* border */
    }

    // has only label
    if (label && !icon) {
      return 1 /* border */ + 12 /* padding */ + getTextSize(label, font).width + 12 /* padding */ + 1 /* border */
    }

    // has both icon and label
    if (icon && label) {
      return 1 /* border */ + 8 /* padding */ + 16 /* icon */ + 4 /* padding */ + getTextSize(label, font).width + 10 /* padding */ + 1 /* border */
    }

    return 0
  })

  return 8 /* padding */ + widths.reduce((a, b) => a + b, 0) + 8 /* padding */
})

watch(actionsColumnWidth, (newValue) => {
  if (newValue) {
    updateColWidth('actions', `${newValue}px`)
  }
}, { immediate: true, flush: 'post' })

function getVirtualRowStyle(item: VirtualRow): CSSProperties {
  return {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: `${item.size}px`,
    transform: `translateY(${item.start}px)`
  }
}

function getRowStyles(item: VirtualRow): CSSProperties & Record<string, string> {
  return getRowContentStyle(
    item,
    shouldFadeIn.value,
    staggerContext.value,
    animationConfig
  )
}

watch(() => unref(props.options.loading), (newValue, oldValue) => {
  if (newValue && !oldValue) {
    const currentRecords = unref(props.options.records) ?? []
    startLoadingState(currentRecords)

    const element = tableRoot.value
    if (element) {
      scrollTableIntoView(
        element,
        unref(props.options.borderless) ?? false,
        unref(props.options.borderSize) ?? 1
      )
    }
  }

  if (!newValue && oldValue) {
    endLoadingState(head.value, body.value)
  }
}, { immediate: true })

function stopObserving() {
  const orders = ordersToShow.value
  const lastOrder = orders[orders.length - 1] === 'actions'
    ? orders[orders.length - 2]
    : orders[orders.length - 1]
  colWidths[lastOrder] = 'auto'
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
  updateColWidth(nameOfColToGrow.value, `calc(${availableFill}px + ${initialWidth})`)
}

function syncHeadScroll() {
  if (!isSyncingHead) {
    isSyncingBody = true
    syncScroll(head.value, body.value)
  }
  isSyncingHead = false
}

function syncBodyScroll() {
  if (!isSyncingBody) {
    isSyncingHead = true
    syncScroll(body.value, head.value)
  }
  isSyncingBody = false
}

function syncScroll(from: HTMLElement | null, to: HTMLElement | null) {
  if (from && to) {
    to.scrollLeft = from.scrollLeft
  }
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
    return { type: 'custom' }
  }
  const col = unref(props.options.columns)[key]
  return isSummary(index) && col?.summaryCell ? col?.summaryCell : col?.cell
}

function updateSelected(items: any) {
  if (Array.isArray(selected.value)) {
    selected.value = [...items] as any
  } else {
    selected.value = items
  }
}

function addSelected(item: any) {
  updateSelected([...(selected.value as any), item])
}

function removeSelected(item: any) {
  updateSelected((selected.value as any[]).filter((i) => i !== item))
}

function getColWidth(key: string) {
  if (key === '__select') {
    return '48px + var(--table-padding-left)'
  }
  const adjustedWidth = colWidths[key]
  if (adjustedWidth && adjustedWidth !== 'auto') {
    return adjustedWidth
  }
  const el = row.value?.children?.[ordersToShow.value.indexOf(key)]
  if (!el) {
    return '0px'
  }
  return `${el.getBoundingClientRect().width}px`
}

function getStyles(key: string) {
  const length = frozenColumns.value.length
  if (length === 0) { return }
  const i = frozenColumns.value.indexOf(key)
  if (i < 0) { return }
  const widthSum = frozenColWidths.value.slice(0, i).join(' + ')
  return {
    '--table-col-position': 'sticky',
    '--table-col-z-index': length - i, // left to right decreasing
    '--table-col-left': widthSum ? `calc(${widthSum})` : '0px'
  }
}
</script>

<template>
  <div ref="tableRoot" class="STable" :class="classes">
    <div class="box">
      <STableHeader
        v-if="showHeader"
        :total="unref(options.total)"
        :reset="unref(options.reset)"
        :menu="unref(options.menu)"
        :borderless="unref(options.borderless)"
        :on-reset="options.onReset"
        :selected="Array.isArray(selected) ? selected : undefined"
      />

      <div class="table" role="grid">
        <div ref="head" class="container head" @scroll="syncHeadScroll">
          <div ref="block" class="block">
            <div ref="row" class="row">
              <STableItem
                v-for="key in ordersToShow"
                :key
                :name="key"
                :class-name="unref(options.columns)[key]?.className"
                :style="getStyles(key)"
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
                  <SInputCheckbox
                    v-if="
                      Array.isArray(selected)
                        && key === '__select'
                        && unref(options.records)?.length
                        && options.disableSelection == null
                    "
                    v-model="control"
                  />
                </STableColumn>
              </STableItem>
            </div>
          </div>
        </div>

        <div
          v-if="(!unref(options.loading) || !showSkeleton) && unref(options.records)?.length"
          ref="body"
          class="container body"
          :class="{ 'fade-in': shouldFadeIn }"
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
              v-for="item in virtualItems"
              :key="item.key"
            >
              <div
                class="row"
                :class="isSummaryOrLastClass(item.index)"
                :style="getVirtualRowStyle(item)"
              >
                <div class="row-content" :style="getRowStyles(item)">
                  <STableItem
                    v-for="key in ordersToShow"
                    :key
                    :name="key"
                    :class-name="unref(options.columns)[key]?.className"
                    :style="getStyles(key)"
                    :width="colWidths[key]"
                  >
                    <STableCell
                      :name="key"
                      :class="isSummary(item.index) && 'summary'"
                      :class-name="unref(options.columns)[key]?.className"
                      :cell="getCell(key, item.index)"
                      :value="recordsWithSummary[item.index][key]"
                      :record="recordsWithSummary[item.index]"
                      :records="unref(options.records)!"
                    >
                      <template v-if="key === '__select' && !isSummary(item.index)">
                        <SInputCheckbox
                          v-if="Array.isArray(selected)"
                          :model-value="selected.includes(indexes[item.index])"
                          :disabled="options.disableSelection?.(recordsWithSummary[item.index]) === true"
                          @update:model-value="(c) => (c ? addSelected : removeSelected)(indexes[item.index])"
                        />
                        <SInputRadio
                          v-else
                          :model-value="selected === indexes[item.index]"
                          :disabled="options.disableSelection?.(recordsWithSummary[item.index]) === true"
                          @update:model-value="(c) => updateSelected(c ? indexes[item.index] : null)"
                        />
                      </template>
                    </STableCell>
                  </STableItem>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showMissing" class="missing">
        <p class="missing-text">No results matched your search.</p>
      </div>

      <div v-if="showSkeleton" class="loading">
        <div class="loading-skeleton">
          <div
            v-for="i in 50"
            :key="`skeleton-${i}`"
            class="skeleton-row"
            :class="{ last: i === 50 }"
          >
            <STableItem
              v-for="key in ordersToShow"
              :key
              :name="key"
              :class-name="unref(options.columns)[key]?.className"
              :style="getStyles(key)"
              :width="colWidths[key]"
            >
              <div class="skeleton-cell">
                <div class="skeleton-shimmer" />
              </div>
            </STableItem>
          </div>
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
    border-top: 0;
    border-right: 0;
    border-bottom: 0;
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
  border-radius: calc(var(--table-border-radius) - 1px) calc(var(--table-border-radius) - 1px) 0 0;
  background-color: var(--bg-elv-2);
  scrollbar-width: none;
  line-height: 0;

  &::-webkit-scrollbar {
    display: none;
  }

  .STable.has-header &,
  .STable.borderless & {
    border-radius: 0;
  }
}

.container.body {
  border-radius: 0 0 calc(var(--table-border-radius) - 1px) calc(var(--table-border-radius) - 1px);
  line-height: 0;
  max-height: var(--table-max-height, 100%);

  .STable.has-footer &,
  .STable.borderless & {
    border-radius: 0;
  }
}

.body.fade-in :deep(.row-content) {
  animation: rowEnter 160ms cubic-bezier(0.3, 0, 0.5, 1);
  animation-fill-mode: both;
  animation-delay: var(--row-fade-delay, 0ms);
}

.body.fade-in :deep(.row) {
  overflow: hidden;
}

@keyframes rowEnter {
  from {
    opacity: 0;
    transform: translateY(var(--row-enter-offset, 0px));
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.block {
  display: inline-block;
  min-width: 100%;
}

:deep(.row) {
  display: flex;
  border-bottom: 1px solid var(--c-gutter);
}

:deep(.row.last),
:deep(.row.summary) {
  border-bottom: 0;
}

:deep(.row-content) {
  display: flex;
  width: 100%;
  height: 100%;
  transform: translateY(0);
}

.missing {
  border-radius: 0 0 calc(var(--table-border-radius) - 1px) calc(var(--table-border-radius) - 1px);
  padding: 48px 32px;
  text-align: center;
  background-color: var(--c-bg-elv-3);
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--c-text-3);

  .has-footer & {
    border-radius: 0;
  }
}

.loading {
  border-radius: 0 0 calc(var(--table-border-radius) - 1px) calc(var(--table-border-radius) - 1px);
  background-color: var(--c-bg-elv-3);
  overflow: hidden;

  .has-footer & {
    border-radius: 0;
  }
}

.loading-skeleton {
  width: 100%;
}

.skeleton-row {
  display: flex;
  border-bottom: 1px solid var(--c-gutter);

  &.last {
    border-bottom: 0;
  }
}

.skeleton-cell {
  padding: 12px 16px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
}

.skeleton-shimmer {
  width: 100%;
  height: 14px;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    var(--c-bg-mute-1) 25%,
    var(--c-bg-mute-2) 37%,
    var(--c-bg-mute-1) 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.5s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

.STable .col-__select {
  --table-col-width: calc(48px + var(--table-padding-left));

  :deep(.input) {
    align-items: center;
    padding: 0 16px;
    min-height: 40px;
    user-select: none;
  }

  :deep(.container) {
    padding: 0;
  }
}
</style>
