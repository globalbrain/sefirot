<script setup lang="ts">
import STableCell from 'sefirot/components/STableCell.vue'
import STableColumn from 'sefirot/components/STableColumn.vue'
import STableFooter from 'sefirot/components/STableFooter.vue'
import STableHeader from 'sefirot/components/STableHeader.vue'
import STableSize from 'sefirot/components/STableSize.vue'
import { reactive, computed, toRefs } from 'vue'
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

const colWidths = reactive<Record<string, string>>({})

const showHeader = computed(() => {
  return total?.value !== undefined
})

const showFooter = computed(() => {
  return page?.value && total?.value
})

function updateColWidth(key: string, value: string) {
  colWidths[key] = value
}
</script>

<template>
  <div class="STable" :class="{ borderless }">
    <div class="box">
      <STableHeader
        v-if="showHeader"
        :total="total"
        :reset="reset"
        :borderless="borderless"
        :on-reset="onReset"
      />

      <div class="wrapper">
        <table class="table" role="grid">
          <colgroup>
            <STableSize
              v-for="key in orders"
              :key="key"
              :name="key"
              :width="colWidths[key]"
            />
          </colgroup>

          <thead class="head">
            <tr class="row columns">
              <STableColumn
                v-for="(key, index) in orders"
                :key="key"
                :class="[index === 0 && 'first-item']"
                :name="key"
                :label="columns[key].label"
                :dropdown="columns[key].dropdown"
                @resize="(value) => updateColWidth(key, value)"
              />
            </tr>
          </thead>

          <tbody class="body">
            <tr v-for="(record, rIndex) in records" :key="rIndex" class="row">
              <STableCell
                v-for="(key, cIndex) in orders"
                :key="key"
                :class="[cIndex === 0 && 'first-item']"
                :name="key"
                :cell="columns[key].cell"
                :value="record[key]"
                :record="record"
                :records="records"
              />
            </tr>
          </tbody>
        </table>
      </div>

      <STableFooter
        v-if="showFooter"
        :total="total"
        :page="page"
        :per-page="records.length"
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
  border-radius: 12px;
  width: 100%;

  .STable.borderless & {
    border-right: 0;
    border-left: 0;
    border-radius: 0;
  }
}

.wrapper {
  position: relative;
  width: 100%;
  overflow-x: scroll;
}

.table {
  position: relative;
  table-layout: fixed;
  border-top: 1px solid var(--c-divider-light);
  border-collapse: separate;
  border-spacing: 0;
  white-space: nowrap;
}

.head {
  position: var(--table-head-position, relative);
  top: var(--table-head-top, auto);
  z-index: 20;
}

.row {
  border-top: 1px solid var(--c-divider-light);
}
</style>
