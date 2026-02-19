<script setup lang="ts">
import { useDebounceFn, useElementSize } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useQuery } from '../../../composables/Api'
import { usePower } from '../../../composables/Power'
import { type FieldData } from '../FieldData'
import { type LensQuery, type LensQuerySort } from '../LensQuery'
import { type LensResult } from '../LensResult'
import LensCatalogControl, { type FilterPresets } from './LensCatalogControl.vue'
import LensCatalogFooter from './LensCatalogFooter.vue'
import LensCatalogStateFilter from './LensCatalogStateFilter.vue'
import LensCatalogStateSort from './LensCatalogStateSort.vue'
import LensFormFilter from './LensFormFilter.vue'
import LensFormView from './LensFormView.vue'
import LensTable from './LensTable.vue'

export interface Props {
  // API endpoint that returns lens result.
  endpoint: string

  // Search target of the entity.
  entity?: string

  // Fields to be selected initially.
  select?: string[]

  // Fields that can be selected by the users. If not provided,
  // all fields in `select` prop will be considered selectable.
  selectable?: string[]

  // Keys to be searched when users input search query.
  queryKeys?: string[]

  // Placeholder text for the query search input.
  queryPh?: string

  // Initial filters to be applied on load. This filters are only applied
  // on the initial load and users can modify them later. Thus, note making
  // this prop reactive will not make sense.
  filters?: any[]

  // Fixed filters that are always applied and cannot be modified by users.
  fixedFilters?: any[]

  // Preset of filters shown to the users as "Quick filters".
  filterPresets?: FilterPresets[]

  // Initial sort to be applied on load.
  sort?: LensQuerySort[]

  // Override settings for fields.
  overrides?: Record<string, Partial<FieldData>>

  // Whether to show advanced filters.
  canFilter?: boolean

  // Whether to show advanced sorting options.
  canSort?: boolean

  // Whether to hide the condition blocks.
  hideConditions?: boolean

  // Field name to be used as index field for selection.
  indexField?: string

  // Fields that are clickable to emit `cell-clicked` event when clicked.
  clickableFields?: string[]

  // Whether to show border around the catalog.
  border?: boolean

  // Padding to add around various blocks in the catalog. This padding only
  // applies to the X axis (left and right). The default is `16px`.
  padding?: string

  // Height of the catalog. When set, it will set max height of the table
  // thereby enabling vertical scroll within the table.
  //
  // Available values:
  // - `fill`: Fill the entire visible page.
  // - Any valid CSS height value (e.g. `480px`, `calc(100vh - 48px)`, etc.)
  height?: string

  // Height offset to be subtracted when `height` is set to `fill`. This is
  // useful when you have other fixed height elements on the page such as
  // extra control headers, nav bars, etc. on top of the lens catalog.
  heightOffset?: string

  // Whether to show empty state when there is no data. When this is enabled,
  // the catalog will hide entire catalog component and renders the given
  // `#empty-state` slot instead.
  showEmptyState?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  canFilter: true,
  canSort: true
})

const selected = defineModel<number[]>('selected')
const hideConditions = defineModel<boolean>('hideConditions', { default: false })

const emit = defineEmits<{
  'select-updated': [select: string[]]
  'selectable-updated': [selectable: string[]]
  'filters-updated': [filters: any[]]
  'sort-updated': [sort: LensQuerySort[]]
  'overrides-updated': [overrides: Record<string, Partial<FieldData>>]
  'cell-clicked': [value: any, record: any]
}>()

const filterDialog = usePower()
const viewDialog = usePower()

const conditionBlocksEl = ref<HTMLElement | null>(null)

// Whether the catalog has loaded initial results at least once. This
// determines whether to show empty state or not. Because empty state
// should only be shown when there is no data from the beginning, not
// after some data has been loaded once and then resulted in no data
// due to user filtering.
const hasInitialResults = ref(false)

let prevFetchInput: LensQuery | null = null
let prevFetchResult: LensResult | null = null

const _select = ref(props.select ?? [])
const _selectable = ref(props.selectable ?? props.select ?? [])

const query = ref<string | null>(null)

const queryFilter = computed(() => {
  if (!props.queryKeys || props.queryKeys.length === 0 || !query.value) {
    return []
  }
  return ['$or', props.queryKeys.map((key) => {
    return [key, 'like', `%${query.value}%`]
  })]
})

const _filters = ref(props.filters ?? [])

const _sort = ref<LensQuerySort[]>([])
const defaultSort = ref(props.sort ?? [])

const _overrides = ref(props.overrides ?? {})

const page = ref(1)
const perPage = ref(100)

const { data: result, execute: refresh, loading } = useQuery(async (http) => {
  const input = {
    entity: props.entity ?? '__no_entity__',
    select: _select.value,
    filters: createInputFilters(queryFilter.value, _filters.value),
    sort: _sort.value.length > 0 ? _sort.value : defaultSort.value ?? [],
    page: page.value,
    perPage: perPage.value
  }

  if (prevFetchInput && JSON.stringify(prevFetchInput) === JSON.stringify(input)) {
    return prevFetchResult!
  }

  const res = await http.post<LensResult>(props.endpoint, input)

  prevFetchInput = input
  prevFetchResult = res

  return res
})

const doRefresh = useDebounceFn(refresh, 50)

const _showEmptyState = computed(() => {
  return props.showEmptyState && !hasInitialResults.value && result.value?.data.length === 0
})

const hasConditions = computed(() => {
  return _filters.value.length > 0 || _sort.value.length > 0
})

const borderWidth = computed(() => {
  return props.border ? 'var(--lens-catalog-border-width, 1px)' : '0'
})

const paddings = computed(() => ({
  '--lens-catalog-control-padding': `0 ${props.padding ?? '16px'}`,
  '--lens-catalog-filters-block-padding': `12px ${props.padding ?? '16px'}`,
  '--lens-catalog-sorts-block-padding': `12px ${props.padding ?? '16px'}`,
  '--lens-catalog-footer-padding': `0 ${props.padding ?? '16px'}`,
  '--table-padding-left': `calc(${props.padding ?? '16px'} - 16px)`
}))

const conditionBlocksSize = useElementSize(conditionBlocksEl)

const headerHeight = 'var(--lens-catalog-global-height-offset)'
const controlHeight = '48px - 1px'
const conditionBlocksHeight = computed(() => conditionBlocksSize.height.value > 0 ? `${conditionBlocksSize.height.value}px - 1px` : '0px')
const columnsHeight = '40px - 1px'
const footerHeight = '56px - 1px'

const containerMinHeight = computed(() => {
  if (!props.height) {
    return undefined
  }
  if (props.height === 'fill') {
    return { minHeight: `calc(100vh - ${headerHeight} - ${props.heightOffset ?? '0px'})` }
  }
  return { height: props.height, minHeight: props.height, maxHeight: props.height }
})

const containerStyles = computed(() => {
  return {
    borderWidth: borderWidth.value,
    ...paddings.value,
    ...(containerMinHeight.value ?? {})
  }
})

const tableMaxHeight = computed(() => {
  if (!props.height) {
    return undefined
  }
  if (props.height === 'fill') {
    return `--table-max-height: calc(100vh - ${headerHeight} - ${controlHeight} - ${conditionBlocksHeight.value} - ${columnsHeight} - ${footerHeight} - ${props.heightOffset ?? '0px'})`
  }
  return `--table-max-height: calc(${props.height} - ${controlHeight} - ${conditionBlocksHeight.value} - ${columnsHeight} - ${footerHeight})`
})

// Initial setup when the result is loaded for the first time.
watch(result, (res) => {
  if (!hasInitialResults.value && res!.data.length > 0) {
    hasInitialResults.value = true
  }
  if (_select.value.length === 0) {
    _select.value = res!.query.select
  }
  if (_selectable.value.length === 0) {
    _selectable.value = res!.query.select
  }
}, { once: true })

// Create lens filters option by combining query (free search) filters,
// user selected filters, and fixed filters.
function createInputFilters(queryFilters: any[], filters: any[]) {
  return [
    ...(props.fixedFilters ?? []),
    queryFilters,
    ...filters
  ].filter((f) => f?.length > 0)
}

function onQuery(value: string | null) {
  query.value = value
  page.value = 1
  doRefresh()
}

function onFiltersUpdated(filters: any[]) {
  _filters.value = filters
  page.value = 1
  doRefresh()
  filterDialog.off()
  emit('filters-updated', _filters.value)
}

function onInlineFilterUpdated(filter: any[]) {
  const sameFilterIndex = _filters.value.findIndex((f) => f[0] === filter[0])
  sameFilterIndex === -1 ? applyNewFilter(filter) : replaceFilter(sameFilterIndex, filter)
  page.value = 1
  doRefresh()
  emit('filters-updated', _filters.value)
}

function applyNewFilter(filter: any[]) {
  if (filter[2].length > 0) {
    _filters.value.push(filter)
  }
}

function replaceFilter(index: number, filter: any[]) {
  if (filter[2].length === 0) {
    _filters.value.splice(index, 1)
    return
  }
  _filters.value[index] = filter
}

function onResetFilters() {
  _filters.value = []
  query.value = null
  page.value = 1
  doRefresh()
  emit('filters-updated', _filters.value)
}

function onSortUpdated(sort: LensQuerySort) {
  _sort.value = [sort]
  page.value = 1
  doRefresh()
  emit('sort-updated', _sort.value)
}

function onResetSorts() {
  _sort.value = []
  page.value = 1
  doRefresh()
  emit('sort-updated', _sort.value)
}

function onViewUpdated(newSelect: string[], newSelectable: string[], overrides: Record<string, Partial<FieldData>>) {
  _select.value = newSelect
  _selectable.value = newSelectable
  _overrides.value = overrides
  doRefresh()
  viewDialog.off()
  emit('select-updated', _select.value)
  emit('selectable-updated', _selectable.value)
  emit('overrides-updated', _overrides.value)
}

function onUpdateSelected(value: number[]) {
  selected.value = value
}

function onResetSelection() {
  selected.value = []
}

function onPrev() {
  page.value--
  doRefresh()
}

function onNext() {
  page.value++
  doRefresh()
}

defineExpose({
  /**
   * Mutates the fetched records directly. This exposed method can be used to
   * do in-place updates of records from the parent component. However, it's
   * very hacky and should be avoided if possible. We are doing it like this
   * because we couldn't come up with better alternative at the moment.
   */
  updateRecords(fn: (records: Record<string, any>[]) => void): void {
    if (result.value?.data) {
      fn(result.value.data)
    }
  }
})
</script>

<template>
  <SCard class="LensCatalog" :class="{ 'show-empty-state': _showEmptyState }" :style="containerStyles">
    <template v-if="_showEmptyState">
      <slot name="empty-state" />
    </template>

    <div v-else class="container">
      <LensCatalogControl
        v-if="result"
        :query
        :query-ph
        :filter-presets
        :selected
        :show-query="!!(queryKeys && queryKeys.length > 0)"
        :show-filters="canFilter"
        :show-sort="canSort"
        :is-condition-active="!hideConditions"
        :is-condition-disabled="!hasConditions"
        @search="onQuery"
        @filter="filterDialog.on()"
        @filter-preset-selected="onFiltersUpdated"
        @view="viewDialog.on()"
        @reset-selection="onResetSelection"
        @toggle-conditions="hideConditions = !hideConditions"
      >
        <template v-if="$slots['controls-sub-left']" #sub-left>
          <slot name="controls-sub-left" />
        </template>
        <template v-if="$slots['controls-sub-right']" #sub-right>
          <slot name="controls-sub-right" />
        </template>
      </LensCatalogControl>
      <div v-else class="control-skeleton" />
      <div v-if="!hideConditions && result && (_filters.length > 0 || _sort.length > 0)" ref="conditionBlocksEl" class="condition-blocks">
        <LensCatalogStateFilter
          v-if="_filters.length > 0"
          :filters="_filters"
          :fields="result.fields"
          @reset="onResetFilters"
        />
        <LensCatalogStateSort
          v-if="_sort.length > 0"
          :fields="result.fields"
          :sorts="_sort"
          @reset="onResetSorts"
        />
      </div>
      <SCardBlock class="list" :style="tableMaxHeight">
        <LensTable
          :result
          :loading
          :overrides="_overrides"
          :index-field
          :selected
          :clickable-fields
          @filter-updated="onInlineFilterUpdated"
          @sort-updated="onSortUpdated"
          @update:selected="onUpdateSelected"
          @cell-clicked="(v, r) => emit('cell-clicked', v, r)"
        />
        <LensCatalogFooter
          v-if="result && result?.pagination.total > 0"
          :result
          :loading
          @prev="onPrev"
          @next="onNext"
        />
      </SCardBlock>
    </div>

    <SModal :open="filterDialog.state.value" @close="filterDialog.off">
      <LensFormFilter
        v-if="result?.fields"
        :fields="result.fields"
        :filters="_filters"
        :filterable="_selectable"
        @cancel="filterDialog.off"
        @apply="onFiltersUpdated"
      />
    </SModal>

    <SModal :open="viewDialog.state.value" @close="viewDialog.off">
      <LensFormView
        v-if="result?.fields"
        :select="_select"
        :selectable="_selectable"
        :fields="result.fields"
        :overrides="_overrides"
        @cancel="viewDialog.off"
        @apply="onViewUpdated"
      />
    </SModal>
  </SCard>
</template>

<style scoped lang="postcss">
.LensCatalog {
  --c-bg-elv-2: var(--c-bg-1);
  --c-bg-elv-3: var(--c-bg-1);
  --c-bg-elv-4: var(--c-bg-2);

  flex-grow: 1;
}

.LensCatalog.show-empty-state {
  border-style: dashed;
  background-color: var(--c-bg-1);
}

.container {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-height: 100%;
}

.list {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-radius: 0 0 5px 5px;
}

.control-skeleton {
  height: 48px;
  background-color: var(--c-bg-1);
}

.condition-blocks {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background-color: var(--c-gutter);
}
</style>
