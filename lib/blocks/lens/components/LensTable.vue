<script setup lang="ts">
import { computedAsync } from '@vueuse/core'
import { cloneDeep } from 'lodash-es'
import { computed, markRaw } from 'vue'
import STable from '../../../components/STable.vue'
import { type DropdownSection } from '../../../composables/Dropdown'
import { type TableCell, type TableColumns, useTable } from '../../../composables/Table'
import { type FieldData } from '../FieldData'
import { type LensQuerySort } from '../LensQuery'
import { type LensResult } from '../LensResult'
import { useFieldFactory } from '../composables/FieldFactory'
import { useLensEdit } from '../composables/LensEdit'
import { provideLensInlineEdit } from '../composables/LensInlineEdit'
import { type Field } from '../fields/Field'
import LensTableEditableCell from './LensTableEditableCell.vue'

const props = defineProps<{
  result?: LensResult
  overrides?: Record<string, Partial<FieldData>>
  loading: boolean
  // The list of field keys to actually render as columns, in order.
  // Falls back to `result.query.select` if not provided. The catalog
  // uses this to control whether an auto-fetched `indexField` shows up
  // as a column.
  select?: string[]
  selected?: any[]
  indexField?: string
  // When set (and editing is enabled), cells for `showOnUpdate` fields
  // render a hover edit affordance that opens an inline editor.
  inlineEdit?: boolean
}>()

const emit = defineEmits<{
  'update:selected': [value: any[]]
  'filter-updated': [filter: any[]]
  'sort-updated': [sort: LensQuerySort]
  'cell-clicked': [value: any, record: any]
}>()

const fieldFactory = useFieldFactory()
const edit = useLensEdit()

// Track which cell's inline editor is open so opening one closes any other.
provideLensInlineEdit()

const editableCellComponent = markRaw(LensTableEditableCell)

const records = computed(() => props.result?.data ?? [])

// Resolve the list of columns to render. We intersect the caller's
// requested `select` with what the latest response actually fetched so
// that toggling a column on through "Manage table view" doesn't surface
// a new column synchronously against still-stale records. Without this,
// fields like `SelectField` blow up trying to render `undefined` for
// the brand-new column before the refresh response lands.
const columnKeys = computed(() => {
  const requested = props.select ?? props.result?.query.select ?? []
  const fetched = props.result?.query.select
  const fetchedSet = fetched ? new Set(fetched) : null
  const visible = fetchedSet
    ? requested.filter((k) => fetchedSet.has(k))
    : requested
  // Give each `__empty__` spacer a unique render key. The select can
  // contain several `__empty__` entries (blank spacer columns, also used
  // to inject empty columns into Excel exports); without unique keys they
  // would collide on the same `columns` map entry and only render once.
  let emptyIndex = 0
  return visible.map((k) => (k === '__empty__' ? `__empty__::${emptyIndex++}` : k))
})

const orders = computed(() => [
  ...columnKeys.value,
  '__last_empty__'
])

const columns = computedAsync(async () => {
  const r = props.result

  if (!r) {
    return {}
  }

  // Snapshot the column keys at the start of the run. `columnKeys` is a
  // computed off reactive props; if it changes mid-await (e.g. the user
  // toggles a column off in "Manage table view"), subsequent reads
  // through the live ref would jump to the new, shorter array and
  // produce `undefined` for indices past the new length — crashing
  // `Object.assign(_fieldData, ...)` below.
  const keys = [...columnKeys.value]

  // Prepare base columns that has `__last_empty__` to fill the end space.
  const columns: TableColumns<any, any, any> = {
    __last_empty__: {
      cell: { type: 'empty' }
    }
  }

  // Build the list of columns based on the resolved column key list.
  for (const key of keys) {
    // Render `__empty__` spacer keys (uniquified to `__empty__::N`) as
    // blank columns, matching the empty columns the backend injects into
    // Excel exports. These carry no field definition.
    if (key.startsWith('__empty__')) {
      columns[key] = { width: '128px', cell: { type: 'empty' } }
      continue
    }

    const _fieldData = cloneDeep(r.fields[key])

    if (!_fieldData) {
      continue
    }

    const overriddenFieldData = Object.assign(
      _fieldData,
      props.overrides?.[key] ?? {}
    )

    const field = fieldFactory.make(overriddenFieldData)

    const column = field.tableColumn()

    // When editing is enabled, clicking the row-identifier id cell opens the
    // record sheet (view + per-field edit + delete) instead of following a
    // link. Restrict this to the configured index field so other id-type
    // columns (e.g. a `company_id` reference link) keep their own navigation.
    if (
      edit?.editable
      && overriddenFieldData.type === 'id'
      && key === edit.indexField
    ) {
      const original = column.cell
      column.cell = (v: any, r: any): TableCell<any, any> => {
        const cell = typeof original === 'function' ? original(v, r) : original
        return {
          ...(cell as TableCell<any, any>),
          link: null,
          color: 'info',
          onClick: () => edit.openSheet(r)
        } as TableCell<any, any>
      }
    } else if (
      props.inlineEdit
      && edit?.editable
      && overriddenFieldData.showOnUpdate === true
      && field.isSubmittable()
      && field.supportsOptimisticUpdate()
      && hasFormInput(field)
    ) {
      // Editable fields render a custom cell with a hover edit affordance
      // that opens an inline editor (reusing the field's form input + the
      // edit context's save). Sort/filter menus on the column are kept.
      // Fields without a real input (or display-only ones) stay read-only.
      column.cell = {
        type: 'component',
        component: editableCellComponent,
        props: { field, fieldKey: key }
      }
    }

    columns[key] = column

    const dropdown: DropdownSection[] = []

    const sortMenu = field.tableSortMenu(onSortUpdated)
    const filterMenu = await field.tableFilterMenu(r.query.filters, onFilterUpdated)

    if (sortMenu) {
      dropdown.push(sortMenu)
    }

    if (filterMenu) {
      dropdown.push(filterMenu)
    }

    if (dropdown.length > 0) {
      columns[key].dropdown = dropdown
    }
  }

  return columns
}, {})

const table = useTable({
  records,
  orders,
  columns,
  indexField: props.indexField,
  borderless: true
})

function onSelect(value?: any[]) {
  emit('update:selected', value ?? [])
}

function onFilterUpdated(filter: any[]) {
  emit('filter-updated', filter)
}

function onSortUpdated(sort: LensQuerySort) {
  emit('sort-updated', sort)
}

// Some field types do not implement a form input (they `throw new
// Error('Not implemented.')`). Only upgrade a cell to the inline editor when
// the field actually has an input component, otherwise leave it read-only so a
// backend that marks such a field `showOnUpdate` renders a plain cell instead
// of a pencil that crashes on click.
function hasFormInput(field: Field<FieldData>): boolean {
  try {
    return !!field.formInputComponent()
  } catch {
    return false
  }
}
</script>

<template>
  <div
    class="LensTable"
    :class="{ 'is-loading': loading, 'is-empty': (result?.data.length ?? 0) === 0 }"
  >
    <STable
      v-if="Object.keys(columns).length > 0"
      class="table"
      :options="table"
      :selected
      @update:selected="onSelect"
    />
  </div>
</template>

<style scoped>
.LensTable {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  background-color: var(--c-bg-1);

  /**
   * Set all numbers to use tabular numbers. This is a current hack to apply
   * mono-spaced numbers to fields like Opportunity ID ("OPP-0017263").
   * In ideal scenario, we should be able to set this option per field base,
   * but it is quite tricky to scope the desired field in CSS at the moment.
   */
  font-feature-settings: "tnum";
}

.LensTable.is-loading,
.LensTable.is-empty {
  .table {
    border-bottom: 1px solid transparent;
  }
}

.LensTable :deep(.col-__select) {
  --table-col-position: sticky;
  --table-col-z-index: 50;
}

.LensTable :deep(.col-__last_empty__) { --table-col-width: 560px; }

.table {
  border-bottom: 1px solid var(--c-gutter);
}
</style>
