<script setup lang="ts">
import { useDebounceFn, useElementSize } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import SDivider from '../../../components/SDivider.vue'
import { useMutation, useQuery } from '../../../composables/Api'
import { useLang } from '../../../composables/Lang'
import { usePower } from '../../../composables/Power'
import { type FieldData } from '../FieldData'
import { type LensQuery, type LensQuerySort } from '../LensQuery'
import { type LensResult } from '../LensResult'
import { useCatalogUrlQuerySync } from '../composables/CatalogUrlQuerySync'
import { provideLensEdit } from '../composables/LensEdit'
import LensCatalogControl, { type FilterPresets } from './LensCatalogControl.vue'
import LensCatalogFooter from './LensCatalogFooter.vue'
import LensCatalogStateFilter from './LensCatalogStateFilter.vue'
import LensCatalogStateSort from './LensCatalogStateSort.vue'
import LensFormFilter from './LensFormFilter.vue'
import LensFormView from './LensFormView.vue'
import LensSheet from './LensSheet.vue'
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

  // Field name to be used as the row identifier. When set, the field is
  // automatically included in the request `select` so every row carries
  // its value, and the corresponding column is hidden from the rendered
  // table — *unless* the caller explicitly listed it in `select`, in
  // which case the caller's intent wins and the column is shown
  // normally. The value remains accessible via `record[indexField]` in
  // `cell-clicked` events and through the `selected` model regardless.
  //
  // If the caller's `select` is empty or `null` (i.e. "use server
  // defaults"), the index field is **not** auto-appended — that would
  // narrow the result to just that single column on backends that treat
  // an empty `select` as "use defaults".
  indexField?: string

  // Fields that are clickable to emit `cell-clicked` event when clicked.
  clickableFields?: string[]

  // Whether to show border around the catalog.
  showBorder?: boolean

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

  // Whether to populate the selectable column list from every field the
  // backend exposes for the entity, rather than only the columns passed
  // in `selectable` / `select`. Use this when the catalog should let the
  // user add any available column to the view (e.g. a saved-view editor),
  // not just toggle the ones already selected.
  loadSelectable?: boolean

  // Whether to sync the catalog state with the URL query string so that
  // it survives page reloads and can be shared as a link. The synced
  // state is the search query (`q`), `filters`, `sort`, and `page`.
  //
  // While enabled, the catalog owns the page's entire query string:
  // query params other than the above are removed whenever the catalog
  // state is written back to the URL. For the same reason, at most one
  // catalog per page may enable this option. The option is read once on
  // setup, so toggling it afterwards has no effect.
  urlSync?: boolean

  // Enable CRUD editing for the catalog. When set, fields the backend
  // marks `showOnUpdate` become inline-editable, clicking a row's id cell
  // opens the record sheet (view + per-field edit + delete), and the
  // `openCreate()` method / sheet create mode become available. The CRUD
  // endpoints are derived from `endpoint` by replacing the trailing
  // `/search` with `/update`, `/create`, and `/delete`.
  editable?: boolean

  // Whether new records can be created (enables create mode in the sheet
  // and the exposed `openCreate()` method). Requires `editable`.
  creatable?: boolean

  // Width of the record sheet (any valid CSS width). Defaults to `480px`.
  sheetWidth?: string

  // Enable inline editing directly in the table: cells for `showOnUpdate`
  // fields gain a hover edit affordance that opens an inline editor. Requires
  // `editable` (it reuses the same CRUD edit context as the sheet).
  inlineEdit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  canFilter: true,
  canSort: true
})

const selected = defineModel<any[]>('selected')
const hideConditions = defineModel<boolean>('hideConditions', { default: false })

const emit = defineEmits<{
  'select-updated': [select: string[]]
  'selectable-updated': [selectable: string[]]
  'filters-updated': [filters: any[]]
  'query-filter-updated': [filter: any[]]
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

// `_select` carries the caller's intent. The index field is preserved
// here if it was listed explicitly so the corresponding column gets
// rendered, and is only added to the request payload separately (see
// `withIndexField`). When `_select` is empty, the auto-fetched index
// field is stripped out of the table's column list further down.
const _select = ref(props.select ?? [])
const _selectable = ref(props.selectable ?? props.select ?? [])

const query = ref<string | null>(null)

const queryFilter = computed(() => {
  if (!props.queryKeys || props.queryKeys.length === 0 || !query.value) {
    return []
  }
  return ['$or', props.queryKeys.map((key) => {
    return [key, 'contains', query.value]
  })]
})

// Surface the free-text query filter so callers can fold it into their
// own export / side-channel requests (the search box lives inside the
// catalog, so the parent has no other way to observe it).
watch(queryFilter, (filter) => {
  emit('query-filter-updated', filter)
})

const _filters = ref(props.filters ?? [])

const _sort = ref<LensQuerySort[]>([])
const defaultSort = ref(props.sort ?? [])

const _overrides = ref(props.overrides ?? {})

const page = ref(1)
const perPage = ref(100)

const lang = useLang()

const { data: result, execute: refresh, loading } = useQuery(async (http) => {
  const input = {
    entity: props.entity ?? '__no_entity__',
    select: withIndexField(_select.value),
    filters: createInputFilters(queryFilter.value, _filters.value),
    sort: _sort.value.length > 0 ? _sort.value : defaultSort.value ?? [],
    settings: { lang },
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

if (props.urlSync) {
  useCatalogUrlQuerySync(
    { query, filters: _filters, sort: _sort, page },
    doRefresh
  )
}

const _showEmptyState = computed(() => {
  return props.showEmptyState && !hasInitialResults.value && result.value?.data.length === 0
})

const hasConditions = computed(() => {
  return _filters.value.length > 0 || _sort.value.length > 0
})

const containerClasses = computed(() => {
  return {
    'show-empty-state': _showEmptyState.value,
    'has-border': props.showBorder
  }
})

const paddings = computed(() => ({
  '--lens-catalog-control-padding': `0 ${props.padding ?? '16px'}`,
  '--lens-catalog-filters-block-padding': `8px ${props.padding ?? '16px'}`,
  '--lens-catalog-sorts-block-padding': `8px ${props.padding ?? '16px'}`,
  '--lens-catalog-footer-padding': `0 ${props.padding ?? '16px'}`,
  '--table-padding-left': `calc(${props.padding ?? '16px'} - 16px)`
}))

const conditionBlocksSize = useElementSize(conditionBlocksEl)

const headerHeight = 'var(--lens-catalog-global-height-offset)'
const controlHeight = '56px - 1px'
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

// Initial setup when the result is loaded for the first time. When the
// caller didn't pass a `select`, we initialise from the response, but
// we strip out the index field — anything pulled in by `withIndexField`
// on the way out shouldn't pretend to be caller-declared on the way
// back in.
watch(result, (res) => {
  if (!hasInitialResults.value && res!.data.length > 0) {
    hasInitialResults.value = true
  }
  if (_select.value.length === 0) {
    _select.value = withoutIndexField(res!.query.select)
  }
  if (_selectable.value.length === 0) {
    _selectable.value = withoutIndexField(res!.query.select)
  }
  // When `loadSelectable` is set, widen the selectable column list to
  // every field the backend exposes for the entity (minus the index
  // field), so the column picker can offer columns that aren't part of
  // the current selection. Existing entries are preserved and order is
  // kept stable by appending only the not-yet-present keys.
  if (props.loadSelectable && res!.fields) {
    const present = new Set(_selectable.value)
    for (const key of withoutIndexField(Object.keys(res!.fields))) {
      if (!present.has(key)) {
        _selectable.value.push(key)
        present.add(key)
      }
    }
  }
}, { once: true })

// Columns to render in the table. We always defer to `_select` (caller
// or user intent) once we have it; before the first response we use the
// raw response select with the index field filtered out so an
// auto-fetched index field doesn't accidentally appear as a column.
const tableSelect = computed(() => {
  if (_select.value.length > 0) {
    return _select.value
  }
  return withoutIndexField(result.value?.query.select ?? [])
})

// The `indexField` is appended to the request `select` so the server
// returns its value on every row, but it is kept out of the internal
// `_select` / `_selectable` state so the caller-facing concept of
// "selected columns" stays clean (the index field is a row identifier,
// not a column the user picked). The corresponding column is also
// hidden from the rendered table by `LensTable`.
//
// When the caller has no concrete select list, the index field is
// *not* added either — leaving the request empty lets the server use
// its own defaults. See `indexField` prop docs above.
function withIndexField(fields: string[]): string[] {
  if (fields.length === 0) { return [] }
  // Editable catalogs must carry a row identifier so updates / shows /
  // deletes can address each row. When no `indexField` is configured the
  // identifier defaults to `id` (matching `resolveId`); fold that default
  // into a non-empty `select` that omits it so every row still carries the
  // id even when the caller's columns don't include it.
  const field = props.indexField ?? (props.editable ? 'id' : null)
  if (!field || fields.includes(field)) { return [...fields] }
  return [...fields, field]
}

function withoutIndexField(fields: string[]): string[] {
  if (!props.indexField) { return [...fields] }
  return fields.filter((f) => f !== props.indexField)
}

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

// A filter value "clears" the filter when it's nullish or an empty
// array. Scalar operators (e.g. a boolean `=`) carry a single value, so
// `false` is a real value to keep — only `null` clears.
function isEmptyFilterValue(value: any): boolean {
  return value == null || (Array.isArray(value) && value.length === 0)
}

function applyNewFilter(filter: any[]) {
  if (!isEmptyFilterValue(filter[2])) {
    _filters.value.push(filter)
  }
}

function replaceFilter(index: number, filter: any[]) {
  if (isEmptyFilterValue(filter[2])) {
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
  // Treat updates from the view form as deliberate user intent: if the
  // user picked the index field on purpose, surface its column.
  _select.value = newSelect
  _selectable.value = newSelectable
  _overrides.value = overrides
  doRefresh()
  viewDialog.off()
  emit('select-updated', _select.value)
  emit('selectable-updated', _selectable.value)
  emit('overrides-updated', _overrides.value)
}

function onUpdateSelected(value: any[]) {
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

// Re-runs the current query against the endpoint, preserving the
// catalog's in-memory state (select / filters / sort / page). Exposed
// so callers can reflect server-side changes — e.g. after a bulk action
// mutates rows — without remounting the component.
async function refreshCatalog(): Promise<void> {
  // A refresh is requested precisely when server-side data may have
  // changed while the query input did not (e.g. after a bulk action).
  // Clear the memoized input so the equality shortcut in the fetcher
  // misses and a real request is issued instead of returning the stale
  // cached result.
  prevFetchInput = null
  await doRefresh()
}

// --- CRUD editing ----------------------------------------------------------

// Derive the CRUD endpoints from the (search) endpoint, e.g.
// `/api/admin/lens/search` -> `/api/admin/lens/{update,create,delete}`.
const endpointBase = computed(() => props.endpoint.replace(/\/search$/, ''))

const sheet = usePower()
const sheetMode = ref<'view' | 'create'>('view')
const sheetRecord = ref<Record<string, any> | null>(null)

// Field definitions for the open detail sheet. The search response only
// describes the selected columns, but `/show` returns the full detail field
// set (including detail-only / updateable fields not selected as columns), so
// the sheet uses these when available and falls back to the search fields.
const sheetFields = ref<Record<string, FieldData> | null>(null)

// Monotonic token for the in-flight `/show` request. Opening a sheet bumps and
// captures it; a `save()` (or a newer open) bumps it again, so a slower `/show`
// generated before an update can't land afterwards and overwrite freshly saved
// values with stale ones.
let showRequestSeq = 0

// Resolve a record's identifier, unwrapping the id field's object shape
// (`{ value, display, path }`) when present.
function resolveId(record: Record<string, any>): any {
  const v = record?.[props.indexField ?? 'id']
  return v !== null && typeof v === 'object' ? v.value : v
}

const { execute: executeUpdate } = useMutation((http, id: any, values: Record<string, any>) =>
  http.post<LensResult & { data: Record<string, any> }>(`${endpointBase.value}/update`, {
    entity: props.entity, id, values
  })
)

const { execute: executeCreate } = useMutation((http, values: Record<string, any>) =>
  http.post<LensResult & { data: Record<string, any> }>(`${endpointBase.value}/create`, {
    entity: props.entity, values
  })
)

const { execute: executeDelete } = useMutation((http, id: any) =>
  http.post(`${endpointBase.value}/delete`, { entity: props.entity, id })
)

// Resolve a single record's full detail (every index/detail field, not just
// the columns in `select`). This lets the sheet show — and edit — fields the
// catalog doesn't render as columns (e.g. long-form descriptions).
const { execute: executeShow } = useMutation((http, id: any) =>
  http.post<LensResult & { data: Record<string, any> }>(`${endpointBase.value}/show`, {
    entity: props.entity, id
  })
)

// Collect every field key referenced by a (possibly nested `$and`/`$or`)
// filter tree, so an edit can be tested against the active query.
function collectFilterKeys(filter: any, keys: Set<string>): void {
  if (!Array.isArray(filter) || filter.length === 0) {
    return
  }
  if ((filter[0] === '$and' || filter[0] === '$or') && Array.isArray(filter[1])) {
    for (const sub of filter[1]) {
      collectFilterKeys(sub, keys)
    }
    return
  }
  if (typeof filter[0] === 'string') {
    keys.add(filter[0])
  }
}

// The field keys the active query filters or sorts by (including fixed and
// free-text query filters). An edit touching one of these can drop the row
// from the result set or move it to a different sorted position, so the
// in-place patch is no longer enough and the query must be re-run.
function activeQueryKeys(): Set<string> {
  const keys = new Set<string>()
  for (const filter of createInputFilters(queryFilter.value, _filters.value)) {
    collectFilterKeys(filter, keys)
  }
  const sort = _sort.value.length > 0 ? _sort.value : defaultSort.value ?? []
  for (const [key] of sort) {
    keys.add(key)
  }
  return keys
}

// Whether the current view is narrowed by filters, sort, or pagination. A
// newly created row cannot be assumed to belong on (or at the top of) such a
// view, so the query is re-run instead of optimistically prepending it.
const isQueryActive = computed(() =>
  createInputFilters(queryFilter.value, _filters.value).length > 0
  || _sort.value.length > 0
  || (defaultSort.value?.length ?? 0) > 0
  || page.value > 1
)

async function save(record: Record<string, any>, values: Record<string, any>): Promise<void> {
  // Invalidate an in-flight /show only when it belongs to the record being
  // saved: its response predates this update and must not overwrite the values
  // we're about to persist. Scope it to the open sheet's record so a save to a
  // different row (e.g. an inline edit elsewhere) can't cancel another open
  // sheet's load.
  if (sheetRecord.value === record) {
    showRequestSeq++
  }
  const id = resolveId(record)
  const res = await executeUpdate(id, values)
  // Patch the row in place so the table and sheet reflect the server's
  // re-serialized values without a full refetch.
  Object.assign(record, res.data)
  // If an edited field participates in the active filters or sort, the row
  // may no longer match the query, or may now sort elsewhere. Re-run the
  // search so the view stays consistent instead of showing a stale row. A
  // field's value is sent under its key, but it may be filtered/sorted by
  // either its key or its `filterKey`, so check both.
  const keys = activeQueryKeys()
  // A detail-only field edited in the sheet has its definition in `sheetFields`
  // (from /show), not the search `result.fields`; merge both so its `filterKey`
  // is found and the reconcile check doesn't miss a field the query sorts or
  // filters by.
  const fields = { ...(result.value?.fields ?? {}), ...(sheetFields.value ?? {}) }
  const reconcile = Object.keys(values).some((key) => {
    if (keys.has(key)) { return true }
    const filterKey = fields[key]?.filterKey
    return filterKey != null && keys.has(filterKey)
  })
  if (reconcile) {
    await refreshCatalog()
    // The refetch replaced result.data with fresh search rows, detaching the
    // show-enriched object the open sheet points at. Rather than swap the
    // sheet to a fresh row — which would drop detail-only fields loaded via
    // /show and break the stale-/show guard's identity check — merge the
    // refreshed values onto the existing record and put that same object back
    // into the result. Detail-only fields survive, and table + sheet keep
    // sharing one object so later edits stay in sync. If the row dropped off
    // the page it won't be found; leave the sheet on the existing object.
    if (sheetRecord.value === record && result.value) {
      const index = result.value.data.findIndex((r) => resolveId(r) === id)
      if (index !== -1) {
        Object.assign(record, result.value.data[index])
        result.value.data[index] = record
      }
    }
  }
}

async function create(values: Record<string, any>): Promise<Record<string, any>> {
  const res = await executeCreate(values)
  // Optimistically prepend only on a plain, unfiltered, unsorted first page
  // that still has room. With active filters / sort / pagination — or a page
  // already at its `perPage` limit, where the extra row would overflow the
  // page and belongs on a later one — re-run the search so the view matches
  // the server's ordering and pagination instead.
  const pagination = result.value?.pagination
  const pageIsFull = !!pagination && (result.value?.data.length ?? 0) >= pagination.perPage
  if (isQueryActive.value || pageIsFull) {
    await refreshCatalog()
  } else {
    if (result.value?.data) {
      result.value.data.unshift(res.data)
    }
    if (result.value?.pagination) {
      result.value.pagination.total++
    }
  }
  return res.data
}

async function remove(record: Record<string, any>): Promise<void> {
  const id = resolveId(record)
  await executeDelete(id)
  // When matching records exist on later pages, deleting a row from a full
  // page would leave it under-filled; re-run the search so the next record
  // backfills this page instead of diverging from the server's pagination.
  const pagination = result.value?.pagination
  if (pagination && pagination.total > pagination.page * pagination.perPage) {
    await refreshCatalog()
    return
  }
  if (result.value?.data) {
    const index = result.value.data.findIndex((r) => resolveId(r) === id)
    if (index !== -1) {
      result.value.data.splice(index, 1)
      // Only adjust the total when a row was actually removed from the current
      // result. A sheet record already excluded by the active query (e.g. a
      // prior edit filtered it out) is not counted on this page, so
      // decrementing would push the total too low.
      if (result.value.pagination) {
        result.value.pagination.total--
      }
    }
  }
  // Deleting the last row of a page beyond the first leaves the catalog on a
  // now-empty (possibly nonexistent) page; step back one page and refetch so
  // the view stays on a valid, populated page.
  if ((result.value?.data.length ?? 0) === 0 && page.value > 1) {
    page.value--
    await refreshCatalog()
  }
}

async function openSheet(record: Record<string, any>): Promise<void> {
  sheetRecord.value = record
  sheetMode.value = 'view'
  // Reset to the search fields until `/show` returns; a stale set from a
  // previously opened record must not leak into this one.
  sheetFields.value = null
  const seq = ++showRequestSeq
  sheet.on()
  // Pull the full record so detail-only fields (not selected as columns)
  // are populated and editable in the sheet. Patch the row in place so the
  // values persist on the shared record object, and adopt the field set the
  // detail endpoint describes so those fields actually render / become
  // editable. Failures are non-fatal: the sheet falls back to the fields
  // already present on the row.
  try {
    const res = await executeShow(resolveId(record))
    // Drop the response if it has been superseded: by a newer /show (the user
    // switched or reopened a record — `seq` advanced), by a `save()` to this
    // record (which also advances `seq`, so a pre-update show can't revert the
    // saved values), or by switching to the create form (`sheetRecord` reset).
    if (seq !== showRequestSeq || sheetRecord.value !== record) {
      return
    }
    Object.assign(record, res.data)
    if (res.fields) {
      sheetFields.value = res.fields
    }
  } catch {
    // Ignore — keep showing the columns the catalog already fetched.
  }
}

function openCreate(): void {
  // `creatable` is the prop that enables creation. Honor it here even though
  // this method is exposed (and provided to children) — without the guard an
  // `editable`-but-not-`creatable` catalog could still open the create sheet
  // and submit to `/create`, so the prop must enforce the UI contract.
  if (!props.creatable) {
    return
  }
  sheetRecord.value = null
  sheetMode.value = 'create'
  // Create mode uses the search field set (it has the `showOnCreate` flags);
  // drop any detail field set adopted by a prior `openSheet`.
  sheetFields.value = null
  sheet.on()
}

provideLensEdit({
  editable: !!props.editable,
  creatable: !!props.creatable,
  entity: props.entity ?? '',
  indexField: props.indexField ?? 'id',
  resolveId,
  save,
  create,
  remove,
  openSheet,
  openCreate
})

defineExpose({
  refresh: refreshCatalog,

  /**
   * Open the record sheet in create mode. Exposed so a page's "New …"
   * button can trigger creation through the unified sheet.
   */
  openCreate,

  /**
   * Retrieve the current records in the catalog. This method is required when
   * the parent component needs to access the records directly, for example, to
   * handle mapping for selected records. Like `updateRecords`, this is also a
   * hacky method and should be avoided if possible.
   */
  records(): Record<string, any>[] {
    return result.value?.data ?? []
  },

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
  <div class="LensCatalog" :class="containerClasses" :style="containerStyles">
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
        <template v-if="$slots['controls-main-left']" #main-left>
          <slot name="controls-main-left" />
        </template>
        <template v-if="$slots['controls-main-right']" #main-right>
          <slot name="controls-main-right" />
        </template>
        <template v-if="$slots['controls-sub-left']" #sub-left>
          <slot name="controls-sub-left" />
        </template>
        <template v-if="$slots['controls-sub-right']" #sub-right>
          <slot name="controls-sub-right" />
        </template>
        <template v-if="$slots['selected-actions']" #selected-actions>
          <slot name="selected-actions" />
        </template>
      </LensCatalogControl>
      <div v-else class="control-skeleton" />
      <div v-if="!hideConditions && result && (_filters.length > 0 || _sort.length > 0)" ref="conditionBlocksEl" class="condition-blocks">
        <template v-if="_filters.length > 0">
          <SDivider />
          <LensCatalogStateFilter
            :filters="_filters"
            :fields="result.fields"
            @reset="onResetFilters"
          />
        </template>
        <template v-if="_sort.length > 0">
          <SDivider />
          <LensCatalogStateSort
            :fields="result.fields"
            :sorts="_sort"
            @reset="onResetSorts"
          />
        </template>
      </div>
      <SDivider />
      <div class="list" :style="tableMaxHeight">
        <LensTable
          :result
          :loading
          :overrides="_overrides"
          :select="tableSelect"
          :index-field
          :selected
          :clickable-fields
          :inline-edit
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
      </div>
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

    <LensSheet
      v-if="editable && result?.fields"
      :open="sheet.state.value"
      :mode="sheetMode"
      :entity="entity ?? ''"
      :record="sheetRecord"
      :fields="sheetFields ?? result.fields"
      :index-field="indexField ?? 'id'"
      :width="sheetWidth"
      @close="sheet.off"
    >
      <template v-if="$slots['sheet-before']" #before="s">
        <slot name="sheet-before" v-bind="s" />
      </template>
      <template v-if="$slots['sheet-after']" #after="s">
        <slot name="sheet-after" v-bind="s" />
      </template>
    </LensSheet>
  </div>
</template>

<style scoped>
.LensCatalog {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: var(--c-bg-1);
}

.LensCatalog.show-empty-state {
  border-style: dashed;
}

.LensCatalog.has-border {
  .container {
    border: 1px solid var(--c-border);
    border-radius: 12px;
  }

  :deep(.LensCatalogControl) {
    border-radius: 11px 11px 0 0;
  }

  :deep(.LensCatalogFooter) {
    border-radius: 0 0 11px 11px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100%;
}

.list {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.control-skeleton {
  height: 56px;
  background-color: var(--c-bg-1);
}
</style>
