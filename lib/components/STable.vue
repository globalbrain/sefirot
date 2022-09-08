<script setup lang="ts">
import STableCell from './STableCell.vue'
import STableColumn from './STableColumn.vue'
import STableFooter from './STableFooter.vue'
import STableHeader from './STableHeader.vue'
import STableItem from './STableItem.vue'
import { reactive, ref, computed, watch, toRefs, unref } from 'vue'
import { Table } from '../composables/Table'

const props = defineProps<{
  options: Table
}>()

const {
  orders,
  columns,
  records,
  total,
  page,
  reset,
  borderless,
  onPrev,
  onNext,
  onReset,
} = toRefs(props.options)

const head = ref<HTMLElement | null>(null)
const body = ref<HTMLElement | null>(null)

let headLock = false
let bodyLock = false

const colWidths = reactive<Record<string, string>>({})

const showHeader = computed(() => {
  return total?.value !== undefined
})

const showFooter = computed(() => {
  return page?.value && total?.value
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

function updateColWidth(key: string, value: string) {
  colWidths[key] = value
}
</script>

<template>
  <div class="STable" :class="{ borderless }" ref="el">
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
            <div class="row columns">
              <STableItem v-for="key in orders" :key="key" :name="key" :width="colWidths[key]">
                <STableColumn
                  :name="key"
                  :label="columns[key].label"
                  :dropdown="columns[key].dropdown"
                  @resize="(value) => updateColWidth(key, value)"
                />
              </STableItem>
            </div>
          </div>
        </div>

        <div
          v-if="records && records.length"
          class="container body"
          ref="body"
          @mouseenter="lockBody(true)"
          @mouseleave="lockBody(false)"
          @scroll="syncBodyScroll"
        >
          <div class="block">
            <div v-for="(record, rIndex) in records" :key="rIndex" class="row">
              <STableItem v-for="key in orders" :key="key" :name="key" :width="colWidths[key]">
                <STableCell
                  :name="key"
                  :cell="columns[key].cell"
                  :value="record[key]"
                  :record="record"
                  :records="records"
                />
              </STableItem>
            </div>
          </div>
        </div>
      </div>

      <div v-if="records && !records.length" class="missing">
        <p class="missing-text">
          No results matched your search.
        </p>
      </div>

      <STableFooter
        v-if="showFooter"
        :total="total"
        :page="page"
        :per-page="unref(records)?.length"
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
  border: 1px solid var(--c-divider-light);
  border-radius: 6px;
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
  position: relative;
  width: 100%;
  min-width: 100%;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
}

.block {
  display: inline-block;
  min-width: 100%;
}

.row {
  display: flex;
  border-bottom: 1px solid var(--c-divider-light);
}

.head {
  position: var(--table-head-position, relative);
  top: var(--table-head-top, auto);
  z-index: 20;
  background-color: var(--bg-elv);
}

.missing {
  border-radius: 0 0 6px 6px;
  padding: 48px 32px;
  text-align: center;
  background-color: var(--c-bg-elv-up);
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--c-text-3);
}
</style>
