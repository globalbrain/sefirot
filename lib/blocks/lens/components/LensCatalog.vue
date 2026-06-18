<script setup lang="ts">
import { useDebounceFn, useElementSize } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import SButton from '../../../components/SButton.vue'
import SDivider from '../../../components/SDivider.vue'
import { useMutation, useQuery } from '../../../composables/Api'
import { useLang, useTrans } from '../../../composables/Lang'
import { usePower } from '../../../composables/Power'
import { useSnackbars } from '../../../stores/Snackbars'
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

const { t } = useTrans({
  en: {
    write_error: 'Your latest changes might not be saved. Please reload the page, and contact support if the problem persists.',
    busy_warning: 'A save is still in progress — changes you make now may not be saved.',
    refresh_text: 'Newer results are available.',
    refresh_action: 'Refresh'
  },
  ja: {
    write_error: '最新の変更が保存されていない可能性があります。ページを再読み込みし、問題が解決しない場合はサポートにお問い合わせください。',
    busy_warning: '保存処理中です。ここでの変更は保存されない可能性があります。',
    refresh_text: '新しい結果があります。',
    refresh_action: '更新'
  }
})

const snackbars = useSnackbars()

const filterDialog = usePower()
const viewDialog = usePower()

const conditionBlocksEl = ref<HTMLElement | null>(null)

// Whether the catalog has loaded initial results at least once. This
// determines whether to show empty state or not. Because empty state
// should only be shown when there is no data from the beginning, not
// after some data has been loaded once and then resulted in no data
// due to user filtering.
const hasInitialResults = ref(false)

// A fresher server result fetched after the optimistic writes settled, awaiting
// the user's explicit opt-in via the refresh button — never auto-applied (that
// would momentarily revert the optimistic edits to stale data). Declared here
// (ahead of the query handlers that clear it) so they can reference it.
const latestState = ref<LensResult | null>(null)

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

// Build the search request from the catalog's current state. Shared by the
// main search and the background reconcile fetch so both query identically.
function buildSearchInput(): LensQuery {
  return {
    entity: props.entity ?? '__no_entity__',
    select: withIndexField(_select.value),
    filters: createInputFilters(queryFilter.value, _filters.value),
    sort: _sort.value.length > 0 ? _sort.value : defaultSort.value ?? [],
    settings: { lang },
    page: page.value,
    perPage: perPage.value
  }
}

const { data: result, execute: refresh, loading } = useQuery(async (http) => {
  const input = buildSearchInput()

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
  // Route URL-driven changes (back/forward, shared links) through `refetch` so
  // they clear any stashed reconcile result, just like the in-app controls — a
  // refresh button must never apply data fetched for a previous query.
  //
  // Known limitation: unlike the in-app controls, this path is not gated by the
  // busy lock, so a URL change landing mid-write could refetch stale data and
  // drop an optimistic edit. Unreachable today (no page enables `urlSync` with
  // `editable`); revisit if one ever does.
  useCatalogUrlQuerySync(
    { query, filters: _filters, sort: _sort, page },
    refetch
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
const conditionBlocksHeight = computed(() =>
  conditionBlocksSize.height.value > 0 ? `${conditionBlocksSize.height.value}px - 1px` : '0px'
)
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
    return '--table-max-height: '
      + `calc(100vh - ${headerHeight} - ${controlHeight} - ${conditionBlocksHeight.value}`
      + ` - ${columnsHeight} - ${footerHeight} - ${props.heightOffset ?? '0px'})`
  }
  return '--table-max-height: '
    + `calc(${props.height} - ${controlHeight} - ${conditionBlocksHeight.value}`
    + ` - ${columnsHeight} - ${footerHeight})`
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
// Editable catalogs must carry a row identifier so updates / deletes can
// address each row; when no `indexField` is configured the identifier
// defaults to `id`. When the caller has no concrete select list, nothing
// is added either — leaving the request empty lets the server use its own
// defaults. See `indexField` prop docs above.
function withIndexField(fields: string[]): string[] {
  if (fields.length === 0) { return [] }
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

// Re-run the search for the new query state, dropping any stashed
// reconcile result (the refreshed state supersedes it).
function refetch(): void {
  latestState.value = null
  doRefresh()
}

function onQuery(value: string | null) {
  if (guardBusy()) { return }
  query.value = value
  page.value = 1
  refetch()
}

function onFiltersUpdated(filters: any[]) {
  if (guardBusy()) { return }
  _filters.value = filters
  page.value = 1
  refetch()
  filterDialog.off()
  emit('filters-updated', _filters.value)
}

function onInlineFilterUpdated(filter: any[]) {
  if (guardBusy()) { return }
  const sameFilterIndex = _filters.value.findIndex((f) => f[0] === filter[0])
  sameFilterIndex === -1 ? applyNewFilter(filter) : replaceFilter(sameFilterIndex, filter)
  page.value = 1
  refetch()
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
  if (guardBusy()) { return }
  _filters.value = []
  query.value = null
  page.value = 1
  refetch()
  emit('filters-updated', _filters.value)
}

function onSortUpdated(sort: LensQuerySort) {
  if (guardBusy()) { return }
  _sort.value = [sort]
  page.value = 1
  refetch()
  emit('sort-updated', _sort.value)
}

function onResetSorts() {
  if (guardBusy()) { return }
  _sort.value = []
  page.value = 1
  refetch()
  emit('sort-updated', _sort.value)
}

function onViewUpdated(
  newSelect: string[],
  newSelectable: string[],
  overrides: Record<string, Partial<FieldData>>
) {
  if (guardBusy()) { return }
  // Treat updates from the view form as deliberate user intent: if the
  // user picked the index field on purpose, surface its column.
  _select.value = newSelect
  _selectable.value = newSelectable
  _overrides.value = overrides
  refetch()
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
  if (guardBusy()) { return }
  page.value--
  refetch()
}

function onNext() {
  if (guardBusy()) { return }
  page.value++
  refetch()
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
  latestState.value = null
  await doRefresh()
}

// --- CRUD editing ----------------------------------------------------------

// Derive the CRUD endpoints from the (search) endpoint, e.g.
// `/api/admin/lens/search` -> `/api/admin/lens/{update,create,delete}`.
const endpointBase = computed(() => props.endpoint.replace(/\/search$/, ''))

const sheet = usePower()
const sheetMode = ref<'view' | 'create'>('view')
const sheetRecord = ref<Record<string, any> | null>(null)

// Whether the open detail sheet is still loading its full record via `/show`.
// The sheet opens immediately (so a click gives instant feedback) and shows a
// spinner until the record is loaded, rather than rendering partial fields.
const sheetLoading = ref(false)

// Whether the detail load (`/show`) failed. The sheet then shows an error
// asking the user to reload, rather than rendering a partial record.
const sheetError = ref(false)

// The slow target API can take a long time to sync a write, and a read during
// that window returns stale (pre-write) data. So updates and deletes are
// applied to the in-memory result immediately and persisted in the background;
// the server is never re-read to reconcile until the write settles. While any
// write is in flight the catalog is "busy": query controls and the refresh
// affordance are locked and an unload guard is armed.
const pendingWrites = ref(0)
const reconciling = ref(false)
const busy = computed(() => pendingWrites.value > 0 || reconciling.value)

// Whether a (blocking) create POST is in flight. Not part of `busy` — the
// create sheet covers the controls — but it arms the unload guard, since the
// create write is just as slow and shouldn't be lost to a tab close/reload.
const creating = ref(false)

// Whether any write in the current in-flight batch failed; when so the reconcile
// is skipped (the snackbar already told the user to reload).
let batchErrored = false

// In-flight write chains keyed by record+field, so repeated writes to the same
// cell are serialized (sent in edit order — the last edit wins — even though
// the UI already shows the latest value optimistically). Writes to different
// cells run concurrently; the backend persists only the changed columns.
const writeChains = new Map<string, Promise<unknown>>()

// Count of in-flight writes per record id, so `/show` for a record that's
// mid-write can avoid overwriting its optimistic values with stale data.
const pendingByRecord = new Map<any, number>()

// Monotonic token for the in-flight `openSheet` `/show` request, so a newer
// open (another row, or the create form) supersedes an older one and the stale
// detail fetch doesn't open over it when it resolves.
let showRequestSeq = 0

// Monotonic token for the in-flight reconcile fetch, so a newer batch's
// reconcile supersedes an older one still in flight.
let reconcileToken = 0

// Resolve a record's identifier, unwrapping the id field's object shape
// (`{ value, display, path }`) when present.
function resolveId(record: Record<string, any>): any {
  const v = record?.[props.indexField ?? 'id']
  return v !== null && typeof v === 'object' ? v.value : v
}

const { execute: executeUpdate } = useMutation((http, id: any, values: Record<string, any>) =>
  http.post(`${endpointBase.value}/update`, {
    entity: props.entity, id, values, settings: { lang }
  })
)

const { execute: executeCreate } = useMutation((http, values: Record<string, any>) =>
  http.post<LensResult & { data: Record<string, any> }>(`${endpointBase.value}/create`, {
    entity: props.entity, values, settings: { lang }
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
    entity: props.entity, id, settings: { lang }
  })
)

// Re-run the search without touching the displayed state. Used by the
// background reconcile so its result can be stashed behind the refresh button
// rather than replacing the optimistic view.
const { execute: executeReconcile } = useMutation((http, input: LensQuery) =>
  http.post<LensResult>(props.endpoint, input)
)

function guardBusy(): boolean {
  if (busy.value) {
    snackbars.push({ mode: 'warning', text: t.busy_warning })
    return true
  }
  return false
}

// Value-level comparison (rows in order + total) — decides whether a reconcile
// actually surfaced anything newer than the optimistic state on screen.
function isSameResult(a: LensResult | null, b: LensResult | null): boolean {
  if (!a || !b) { return a === b }
  return a.pagination.total === b.pagination.total
    && JSON.stringify(a.data) === JSON.stringify(b.data)
}

// After the last in-flight write settles, fetch the canonical state for the
// current query and, only if it differs from what's shown, stash it behind the
// refresh button. The server is fresh by now (the write completed).
async function reconcile(): Promise<void> {
  const token = ++reconcileToken
  reconciling.value = true
  try {
    const fresh = await executeReconcile(buildSearchInput())
    // Drop the result if a newer write batch already kicked off its own
    // reconcile while this one was in flight.
    if (token !== reconcileToken) {
      return
    }
    // Authoritative: stash the canonical result when it differs from what's
    // shown, otherwise clear any (possibly stale) stash — an earlier overlapping
    // reconcile may have left a pre-edit result behind.
    latestState.value = result.value && !isSameResult(fresh, result.value) ? fresh : null
  } catch {
    // Ignore — keep the optimistic state, offer no refresh.
  } finally {
    if (token === reconcileToken) {
      reconciling.value = false
    }
  }
}

function applyLatest(): void {
  if (!latestState.value) { return }
  result.value = latestState.value
  latestState.value = null
  prevFetchInput = null
}

// Track an optimistic background write: count it as pending, surface a snackbar
// on failure, and once the whole batch settles (with no failures) reconcile.
function hasPendingWrite(recordId: any): boolean {
  return pendingByRecord.has(recordId)
}

// Track an optimistic background write for `recordId`, serialized per `key` so
// writes to the same cell reach the server in edit order.
function trackWrite(recordId: any, key: string, run: () => Promise<unknown>): void {
  // A new write changes the displayed state. Clear any stashed reconcile result
  // and invalidate an in-flight reconcile (advance the token so its result is
  // dropped; clear its busy flag — `pendingWrites` keeps us busy), so neither
  // can later repopulate the refresh banner with pre-edit data. The post-batch
  // reconcile re-derives it.
  latestState.value = null
  reconcileToken++
  reconciling.value = false
  pendingWrites.value++
  pendingByRecord.set(recordId, (pendingByRecord.get(recordId) ?? 0) + 1)

  // Chain after any in-flight write for the same cell so the requests reach the
  // server in order (a prior failure must not block the next write).
  const prev = writeChains.get(key) ?? Promise.resolve()
  const current = prev.catch(() => {}).then(run)
  writeChains.set(key, current)

  current
    .catch(() => {
      batchErrored = true
      snackbars.push({ mode: 'danger', text: t.write_error })
    })
    .finally(() => {
      // Only drop the chain entry if a newer write hasn't replaced it.
      if (writeChains.get(key) === current) {
        writeChains.delete(key)
      }
      const remaining = (pendingByRecord.get(recordId) ?? 1) - 1
      if (remaining > 0) {
        pendingByRecord.set(recordId, remaining)
      } else {
        pendingByRecord.delete(recordId)
      }
      pendingWrites.value--
      if (pendingWrites.value === 0) {
        const errored = batchErrored
        batchErrored = false
        if (!errored) {
          reconcile()
        }
      }
    })
}

// Update — optimistic. Reflect the change in memory immediately (the catalog
// row and the open sheet share this object), then persist in the background.
function save(record: Record<string, any>, values: Record<string, any>): void {
  const id = resolveId(record)
  Object.assign(record, values)
  // Serialize per record+field so two quick edits to the same cell apply in
  // order; edits to different fields run concurrently. Assumes callers save a
  // single field (or disjoint field sets) — overlapping multi-field saves would
  // share a column without ordering and need a coarser (per-record) key.
  const key = `${id}:${Object.keys(values).sort().join(',')}`
  trackWrite(id, key, () => executeUpdate(id, values))
}

// Create — blocking. The slow POST runs to completion, then the catalog is
// refreshed with the now-synced canonical state (preserving the active query).
// The create sheet shows a button spinner meanwhile.
function prependCreated(data: Record<string, any>): void {
  if (result.value?.data) {
    result.value.data.unshift(data)
  }
  if (result.value?.pagination) {
    result.value.pagination.total++
  }
}

async function create(values: Record<string, any>): Promise<Record<string, any>> {
  creating.value = true
  try {
    const res = await executeCreate(values)
    // The POST succeeded — the record exists. From here a refresh failure must
    // not reject (the caller would treat the create as failed and re-submit a
    // duplicate); fall back to showing the new record optimistically.
    if (pendingWrites.value > 0) {
      // Other optimistic writes are still syncing; a refetch now would read the
      // backend before they're visible and clobber those rows. Prepend the new
      // record optimistically — the pending writes' reconcile refreshes the
      // full list (via the refresh banner) once they settle.
      prependCreated(res.data)
    } else {
      // A write batch may have settled during the (slow) POST and kicked off a
      // reconcile; invalidate it (token bump + busy-flag reset, mirroring
      // trackWrite) so its possibly-pre-create snapshot can't land behind the
      // refresh banner after this fresh refetch.
      reconcileToken++
      reconciling.value = false
      try {
        await refreshCatalog()
      } catch {
        prependCreated(res.data)
      }
    }
    if (!hasInitialResults.value && (result.value?.data.length ?? 0) > 0) {
      hasInitialResults.value = true
    }
    return res.data
  } finally {
    creating.value = false
  }
}

// Delete — optimistic. Remove from the UI immediately, persist in the
// background.
function remove(record: Record<string, any>): void {
  const id = resolveId(record)
  if (result.value?.data) {
    const index = result.value.data.findIndex((r) => resolveId(r) === id)
    if (index !== -1) {
      result.value.data.splice(index, 1)
      // Only adjust the total when a row was actually removed from the current
      // page, so a not-found delete can't drift the count below the rows shown.
      if (result.value.pagination) {
        result.value.pagination.total--
      }
    }
  }
  trackWrite(id, `${id}:__delete__`, () => executeDelete(id))
}

async function openSheet(record: Record<string, any>): Promise<void> {
  // Open immediately with a spinner (instant feedback so the user doesn't click
  // the id cell again), then load the full record (detail-only fields not
  // selected as columns) and render it. A newer open (another row, or the
  // create form) supersedes this one via the token.
  const id = resolveId(record)
  sheetRecord.value = record
  sheetMode.value = 'view'
  sheetLoading.value = true
  sheetError.value = false
  sheet.on()
  const seq = ++showRequestSeq
  // Snapshot whether the record had a write in flight when `/show` is issued:
  // the read can return pre-sync data, so even if the write finishes before
  // `/show` resolves we must not overwrite the optimistic value.
  const pendingAtIssue = hasPendingWrite(id)
  try {
    const res = await executeShow(id)
    if (seq === showRequestSeq) {
      if (pendingAtIssue || hasPendingWrite(id)) {
        // The record had/has an in-flight write, so `/show` may have read the
        // backend before it synced. Don't overwrite the optimistic values
        // already on the row; only fill in detail-only fields not yet present.
        for (const k of Object.keys(res.data)) {
          if (!(k in record)) {
            record[k] = res.data[k]
          }
        }
      } else {
        Object.assign(record, res.data)
      }
    }
  } catch {
    // Detail load failed: surface an error in the sheet rather than render a
    // partial record (the user is asked to reload).
    if (seq === showRequestSeq) {
      sheetError.value = true
    }
  } finally {
    if (seq === showRequestSeq) {
      sheetLoading.value = false
    }
  }
}

function openCreate(): void {
  // `creatable` is the prop that enables creation. Honor it here even though
  // this method is exposed (and provided to children).
  if (!props.creatable) {
    return
  }
  // Supersede any in-flight openSheet `/show` so it can't open over the create
  // form when it resolves.
  showRequestSeq++
  sheetRecord.value = null
  sheetMode.value = 'create'
  sheetLoading.value = false
  sheetError.value = false
  sheet.on()
}

provideLensEdit({
  // Getters so the injected context tracks prop changes after mount (e.g.
  // permissions resolving async, or a flag toggling `editable` off): LensTable
  // gates inline editing and the id-cell sheet on `edit.editable`.
  get editable() { return !!props.editable },
  get creatable() { return !!props.creatable },
  entity: props.entity ?? '',
  indexField: props.indexField ?? 'id',
  resolveId,
  save,
  create,
  remove,
  openSheet,
  openCreate
})

// Warn the user (native prompt) if they try to leave while a write is still
// syncing, since that change might not have been persisted yet.
function onBeforeUnload(event: BeforeUnloadEvent): void {
  if (pendingWrites.value > 0 || creating.value) {
    event.preventDefault()
    event.returnValue = ''
  }
}

onMounted(() => window.addEventListener('beforeunload', onBeforeUnload))
onBeforeUnmount(() => window.removeEventListener('beforeunload', onBeforeUnload))

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
        :class="{ 'is-busy': busy }"
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
      <div
        v-if="!hideConditions && result && (_filters.length > 0 || _sort.length > 0)"
        ref="conditionBlocksEl"
        class="condition-blocks"
        :class="{ 'is-busy': busy }"
      >
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
      <div v-if="latestState && !busy" class="refresh-banner">
        <span class="refresh-banner-text">{{ t.refresh_text }}</span>
        <SButton size="mini" mode="info" :label="t.refresh_action" @click="applyLatest" />
      </div>
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
          :class="{ 'is-busy': busy }"
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
      :loading="sheetLoading"
      :error="sheetError"
      :fields="result.fields"
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

/* While a background write is syncing, lock the query controls so the user
   can't change filters/sort/page (a refetch then would be stale and would
   drop the optimistic edits). Editing the rows stays available. */
.is-busy {
  pointer-events: none;
  opacity: 0.6;
}

.refresh-banner {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 8px 16px;
  border-bottom: 1px solid var(--c-gutter);
  background-color: var(--c-bg-2);
}

.refresh-banner-text {
  font-size: 13px;
  color: var(--c-text-2);
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
