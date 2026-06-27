<script setup lang="ts">
import { useDebounceFn, useElementSize } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import SButton from '../../../components/SButton.vue'
import SDivider from '../../../components/SDivider.vue'
import { useMutation, useQuery } from '../../../composables/Api'
import { useLang, useTrans } from '../../../composables/Lang'
import { usePower } from '../../../composables/Power'
import { useSnackbars } from '../../../stores/Snackbars'
import { day } from '../../../support/Day'
import { type FieldData } from '../FieldData'
import { type LensQuery, type LensQuerySort } from '../LensQuery'
import { type LensResult } from '../LensResult'
import { useCatalogUrlQuerySync } from '../composables/CatalogUrlQuerySync'
import { type LensAvatarUploadHandler, provideLensAvatarUpload } from '../composables/LensAvatarUpload'
import { provideLensEdit } from '../composables/LensEdit'
import { extractServerMessage, isAuthError } from '../validation/ServerErrors'
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
  //
  // The row identifier (`indexField`, defaulting to `id`) is never
  // inline- or sheet-editable on an existing row: optimistically changing
  // a row's id before the slow write settles would re-key the row, so a
  // follow-up save/delete would address the not-yet-synced new id. It can
  // still be set on creation (via a `showOnCreate` field).
  //
  // An editable catalog must keep its index field among the rendered columns,
  // because the row's sheet opener — and therefore the only way to view or
  // delete a record — is the index-field cell. The default `id` identifier is
  // kept when `select` is empty (server defaults), so that case works as-is; a
  // *custom* `indexField`, however, must be listed in `select` explicitly (an
  // empty/default `select` drops it from the rendered columns, leaving the rows
  // with no opener).
  //
  // Turning this on also enables `creatable`, `deletable`, and `inlineEditable`
  // by default; pass `false` to any of them to opt out.
  //
  // Pass a predicate `(record) => boolean` instead of `true` to allow editing
  // only some rows (e.g. from a per-record policy): the inline affordance and
  // the sheet's per-field edit are hidden for the rows it rejects.
  editable?: boolean | ((record: Record<string, any>) => boolean)

  // Whether records can be deleted from the sheet. Defaults to enabled for an
  // editable catalog. Pass `false` to hide the delete button entirely, or a
  // predicate `(record) => boolean` to allow deleting only some rows (e.g. from
  // a per-record policy). Delete is reachable only through the sheet, so this
  // has no effect unless the catalog is `editable`.
  deletable?: boolean | ((record: Record<string, any>) => boolean)

  // Whether new records can be created (enables create mode in the sheet and
  // the exposed `openCreate()` method). Defaults to enabled when the catalog is
  // `editable`; pass `false` to disable.
  creatable?: boolean

  // Width of the record sheet (any valid CSS width). Defaults to `480px`.
  sheetWidth?: string

  // Enable inline editing directly in the table: cells for `showOnUpdate` fields
  // gain a hover edit affordance that opens an inline editor (reusing the sheet's
  // CRUD edit context). Defaults to enabled when the catalog is `editable`; pass
  // `false` to restrict editing to the record sheet.
  inlineEditable?: boolean

  // Persist an avatar image change for an `avatar` field. Avatars are stored
  // out-of-band (a multipart upload the consuming app owns) rather than through
  // the Lens create/update write, so the catalog delegates the actual upload to
  // this handler and reflects the URL it returns on the row. Without it, avatar
  // fields stay read-only (the inline/sheet image affordance is hidden). The
  // handler receives the picked file (or `null` on removal) and the record's id
  // (`null` while creating) and resolves to the new image URL (or `null`).
  avatarUpload?: LensAvatarUploadHandler
}

const props = withDefaults(defineProps<Props>(), {
  canFilter: true,
  canSort: true,
  // Default these on so an editable catalog gets create / delete / inline edit
  // without opting in to each. A boolean prop can't tell "omitted" from `false`
  // (Vue casts an absent boolean to `false`), so they default on here and the
  // resolvers below gate them on `editable`; pass the prop `false` to opt out.
  creatable: true,
  deletable: true,
  inlineEditable: true
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
    save_failed: (label: string) => `We couldn’t save “${label}”.`,
    save_failed_anon: 'We couldn’t save your change.',
    delete_failed: (label: string) => `We couldn’t delete “${label}”.`,
    delete_failed_anon: 'We couldn’t delete this record.',
    write_error_reload: 'Please reload and try again.',
    write_error_recover: 'Please reload to see the latest data.',
    busy_warning: 'Still saving — please wait a moment before changing the view.',
    refresh_text: 'Newer results are available.',
    refresh_failed_text: 'Some changes couldn’t be saved. Refresh to restore the latest values.',
    refresh_action: 'Refresh',
    search_error: 'We couldn’t load the records.',
    search_retry: 'Try again'
  },
  ja: {
    save_failed: (label: string) => `「${label}」を保存できませんでした。`,
    save_failed_anon: '変更を保存できませんでした。',
    delete_failed: (label: string) => `「${label}」を削除できませんでした。`,
    delete_failed_anon: 'レコードを削除できませんでした。',
    write_error_reload: 'ページを再読み込みして、もう一度お試しください。',
    write_error_recover: 'ページを再読み込みして最新の状態をご確認ください。',
    busy_warning: '保存中です。表示を変更する前に少しお待ちください。',
    refresh_text: '新しい結果があります。',
    refresh_failed_text: '保存できなかった変更があります。更新して最新の値に戻してください。',
    refresh_action: '更新',
    search_error: 'レコードを読み込めませんでした。',
    search_retry: '再試行'
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
// would momentarily revert the optimistic edits to stale data). `fromError` marks
// a stash produced by a *failed* write (the optimistic value diverged from the
// canonical one), so the banner can explain it's a recovery rather than just
// newer data. Declared here (ahead of the query handlers that clear it) so they
// can reference it.
const latestState = ref<{ result: LensResult; fromError: boolean } | null>(null)

// Count of optimistic background writes currently in flight. Declared here
// (ahead of the debounced refetch that consults it) so a queued refetch can bail
// when a write started during its debounce window. See the CRUD section below
// for the full optimistic-write strategy this is part of.
const pendingWrites = ref(0)

// Whether a (blocking) create POST is in flight. Not part of `busy` — the create
// sheet covers the controls — but it arms the unload guard, and the debounced
// refetch consults it (declared here for that reason), since a search issued
// before the new row exists must not assign its rows over the just-created record.
const creating = ref(false)

let prevFetchInput: LensQuery | null = null
let prevFetchResult: LensResult | null = null

// Monotonic token bumped whenever an optimistic write starts. The main search
// reads it so a normal search/refetch already past the network boundary when a
// write begins won't assign its pre-write rows over the optimistic patch — the
// busy lock guards the handlers, but not a request already in flight.
let searchToken = 0
// Mirror of the currently-shown result (kept in sync just below), so the search
// fetcher can return it — preserving the optimistic state — when superseded.
let currentResult: LensResult | undefined

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

// The entity name sent on every request. Falls back to the `__no_entity__`
// sentinel when the prop is omitted, so the search and the CRUD/detail calls
// target the same entity — otherwise the search would use the fallback while an
// omitted-entity CRUD payload would serialize `undefined` away and hit no entity.
const entityName = computed(() => props.entity ?? '__no_entity__')

// Build the search request from the catalog's current state. Shared by the
// main search and the background reconcile fetch so both query identically.
function buildSearchInput(): LensQuery {
  return {
    entity: entityName.value,
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

  const token = searchToken
  const res = await http.post<LensResult>(props.endpoint, input)

  // A write started while this search was in flight; its rows are pre-write, so
  // keep the optimistic state on screen rather than clobbering it. The post-batch
  // reconcile surfaces the canonical state behind the refresh banner instead.
  if (token !== searchToken) {
    return currentResult ?? res
  }

  prevFetchInput = input
  prevFetchResult = res

  return res
}, { immediate: false })

// Keep `currentResult` pointing at the shown result. The reference changes only
// on a wholesale replace; optimistic in-place edits keep the same object, so this
// mirror always reflects them.
watch(result, (r) => { currentResult = r ?? undefined }, { immediate: true })

// Whether the most recent table search (initial load or a user-driven re-search)
// failed. A failed fetch otherwise leaves the previous rows on screen with the
// controls re-enabled — indistinguishable from the new query legitimately
// returning them — so the list shows an inline error + retry instead.
const searchError = ref(false)

// Monotonic token so only the latest search may raise the error flag: with the
// slow backend two searches can overlap, and an older one failing *after* a newer
// one succeeded must not flash an error over the good rows now on screen.
let searchRunSeq = 0

// Run the main table search, tracking whether it failed. Drives the initial load
// (the query's `immediate` is off so this owns it) and every `doRefresh`.
async function runSearch(): Promise<void> {
  const seq = ++searchRunSeq
  // Snapshot `searchToken` too: a write / create / forced refresh / index-field
  // change bumps it to supersede an in-flight search (so even on success the
  // fetcher discards that search's rows and returns the current result instead).
  // Such a superseded run must neither raise the error (its rejection is for a
  // request we already decided to drop) nor clear it (its "success" is the stale
  // current result, not the requested rows) — the follow-up (the write's
  // reconcile, the forced result) settles the state instead.
  const token = searchToken
  try {
    await refresh()
    // Clear only on the latest, non-superseded run's success — an older run
    // resolving late must not wipe a newer run's error, and a write-invalidated
    // run resolving with the current result must not dismiss the error over rows
    // that aren't the requested ones. Not cleared up front either: keeping the
    // error visible until a retry actually succeeds avoids flashing the previous
    // query's (interactable) rows back on screen mid-retry.
    if (seq === searchRunSeq && token === searchToken) {
      searchError.value = false
      // These fresh rows for the current query supersede any pending recovery
      // banner (a reconcile stash), so its button can't later overwrite them with
      // an older snapshot. Query-change refetches already drop it; the retry path
      // (doRefresh, which keeps the banner for a failed retry) doesn't, so a
      // successful retry must clear it here.
      latestState.value = null
    }
  } catch (e) {
    // Auth / session-expiry (401 / 419) must reach the app's re-auth flow, not be
    // parked on the inline retry state — matches the download / filter paths and
    // the ServerErrors contract. Rethrow so the rejection propagates to the global
    // handler as it did before this wrapper caught it.
    if (isAuthError(e)) {
      throw e
    }
    if (seq === searchRunSeq && token === searchToken) {
      searchError.value = true
    }
  }
}

onMounted(runSearch)

// When a search fails, the error state replaces the table but the control bar —
// including its selected-actions (bulk) slot — stays mounted. Clear any selection
// on entering the error so the user can't act on now-hidden rows from the previous
// result while the UI says the current query failed.
watch(searchError, (err) => {
  if (err && selected.value?.length) {
    selected.value = []
  }
})

const doRefresh = useDebounceFn(() => {
  // A write or a blocking create may have started during the debounce window: the
  // busy lock guards the query handlers at click time, but not this deferred
  // fetch. Bail if so — reading now would return pre-write / pre-create rows and
  // overwrite the optimistic edit or the just-created record. The post-batch
  // reconcile / create path surfaces the canonical state once things settle.
  // (Deliberate refreshes go through `forceRefresh`, which calls `refresh`
  // directly to bypass this guard.)
  if (pendingWrites.value > 0 || creating.value) { return }
  return runSearch()
}, 50)

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
  // Exclude `searchError`: when a re-search fails the result still holds the
  // previous (possibly zero-row) data, which would otherwise keep the empty-state
  // slot showing — and it sits in this branch's `v-else`, so the inline error +
  // retry would never render. Yield to the error state instead.
  return props.showEmptyState
    && !searchError.value
    && !hasInitialResults.value
    && result.value?.data.length === 0
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

// The effective row identifier when resolving / editing a row: the configured
// `indexField`, or `id` by default. Distinct from the raw `props.indexField`,
// whose `undefined` means "no index field configured" — `withIndexField` /
// `withoutIndexField` rely on that to leave a non-editable catalog's columns
// alone, so they deliberately keep using the prop directly rather than this.
const idField = computed(() => props.indexField ?? 'id')

// Whether the currently loaded rows actually carry the effective row identifier.
// Editing / opening a row needs it (`resolveId`), but rows fetched while
// `editable` was still false — or before an `indexField` change settled — won't
// have it until the triggered refetch lands. Editing is gated on this (see the
// `editable` getter) so a quick save in that window can't post `id: undefined`.
// An empty result has nothing to edit, so it doesn't block.
const rowsCarryIndexField = computed(() => {
  const rows = result.value?.data
  if (!rows || rows.length === 0) { return true }
  return idField.value in rows[0]
})

// The row-identifier the table uses as its selection key. An explicit
// `indexField`, or `id` for editable catalogs (which always carry it). Without
// this, an editable catalog that relies on the default would leave the table on
// positional selection keys, so an optimistic create/delete that shifts rows
// would leave `selected` pointing at the wrong records. Mirrors `edit.indexField`.
//
// Gated on `rowsCarryIndexField`: when `editable` flips true (or `indexField`
// changes) the on-screen rows don't carry the new key until the triggered refetch
// lands. Switching STable onto it during that window keys every row's selection to
// `undefined` — wiping the current selection and making any row-select emit
// `[undefined]` (so parent bulk actions act on no/wrong records). Stay on the
// previous positional key until the loaded rows carry it, matching the
// `edit.editable` gate so selection and editing flip together.
const tableIndexField = computed(() => {
  const field = props.indexField ?? (props.editable ? 'id' : undefined)
  return field && rowsCarryIndexField.value ? field : undefined
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
  // Supersede any in-flight search now, not only once the debounced run starts:
  // a retry/search still loading for the previous query state would otherwise
  // remain "latest" through the debounce window and, on resolving, clear the error
  // or assign its rows after the query has already moved on. The next run captures
  // the bumped token, so it isn't self-suppressed.
  searchToken++
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
// affordance are locked and an unload guard is armed. (`pendingWrites` itself is
// declared near the top so the debounced refetch can consult it.)
const reconciling = ref(false)
const busy = computed(() => pendingWrites.value > 0 || reconciling.value)

// Whether any write in the current in-flight batch failed; passed to the
// post-batch reconcile so the refresh banner can label itself as a recovery for
// the failed write's diverged row rather than just "newer data".
let batchErrored = false

// In-flight write chains keyed by record+field, so repeated writes to the same
// cell are serialized (sent in edit order — the last edit wins — even though
// the UI already shows the latest value optimistically). Writes to different
// cells run concurrently; the backend persists only the changed columns.
const writeChains = new Map<string, Promise<unknown>>()

// In-flight avatar-upload chains keyed by record+field, so two uploads to the
// same avatar (e.g. from the inline cell then the reopened sheet) are serialized
// — the later-issued one's request is sent after the earlier resolves and it
// patches last, so the newest image wins instead of a slower earlier upload.
const avatarChains = new Map<string, Promise<unknown>>()

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
  const v = record?.[idField.value]
  return v !== null && typeof v === 'object' ? v.value : v
}

// Resolve a human-facing label for a record — the index field's display value
// (the id object's `{ value, display, path }` shape) falling back to the bare
// identifier — to name the affected row in a write-failure snackbar. Null when
// no usable label exists, so the snackbar can fall back to anonymous copy.
function resolveLabel(record: Record<string, any>): string | null {
  const v = record?.[idField.value]
  const label = v !== null && typeof v === 'object' ? (v.display ?? v.value) : v
  return label != null && label !== '' ? String(label) : null
}

const { execute: executeUpdate } = useMutation((http, id: any, values: Record<string, any>) =>
  http.post(`${endpointBase.value}/update`, {
    entity: entityName.value, id, values, settings: { lang }
  })
)

const { execute: executeCreate } = useMutation((http, values: Record<string, any>) =>
  http.post<LensResult & { data: Record<string, any> }>(`${endpointBase.value}/create`, {
    entity: entityName.value, values, settings: { lang }
  })
)

const { execute: executeDelete } = useMutation((http, id: any) =>
  http.post(`${endpointBase.value}/delete`, { entity: entityName.value, id })
)

// Resolve a single record's full detail (every index/detail field, not just
// the columns in `select`). This lets the sheet show — and edit — fields the
// catalog doesn't render as columns (e.g. long-form descriptions).
const { execute: executeShow } = useMutation((http, id: any) =>
  http.post<LensResult & { data: Record<string, any> }>(`${endpointBase.value}/show`, {
    entity: entityName.value, id, settings: { lang }
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

// `updated_at` is a server-managed timestamp that bumps on every write, so a
// reconciled row's value always differs from the optimistic one even when nothing
// else changed. It's excluded from the diff below (and patched to ~now on save) so
// an edit never surfaces the refresh banner just for its own timestamp — the user
// shouldn't be asked to reload the whole view over a change that obviously follows
// from their edit. Always a datetime column, never user-editable.
const UPDATED_AT_KEY = 'updated_at'

// Value-level comparison (rows in order + total) deciding whether a reconcile
// surfaced anything newer than the optimistic state on screen. `fresh` is the
// canonical search-shaped result; `shown` is what's displayed, which may carry
// extra detail-only keys an opened sheet merged in via `/show`. Compare only the
// keys `fresh` actually has, so that detail-key asymmetry doesn't raise a
// spurious refresh banner — only genuine changes to the table's own fields count.
function isSameResult(fresh: LensResult | null, shown: LensResult | null): boolean {
  if (!fresh || !shown) { return fresh === shown }
  if (fresh.pagination.total !== shown.pagination.total) { return false }
  if (fresh.data.length !== shown.data.length) { return false }
  for (let i = 0; i < fresh.data.length; i++) {
    const freshRow = fresh.data[i]
    const shownRow = shown.data[i]
    for (const key of Object.keys(freshRow)) {
      // The always-bumped timestamp would make every edited row look "changed";
      // skip it so it alone can't surface the refresh banner (see UPDATED_AT_KEY).
      if (key === UPDATED_AT_KEY) { continue }
      if (JSON.stringify(freshRow[key]) !== JSON.stringify(shownRow?.[key])) {
        return false
      }
    }
  }
  return true
}

// After the last in-flight write settles, fetch the canonical state for the
// current query and, only if it differs from what's shown, stash it behind the
// refresh button. The server is fresh by now (the write completed). `afterError`
// is set when a write in the batch *failed*: its optimistic edit wasn't rolled
// back, so the canonical state diverges and the stash becomes the user's one-click
// path to restore it — the banner labels it accordingly.
async function reconcile(afterError = false): Promise<void> {
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
    latestState.value = result.value && !isSameResult(fresh, result.value)
      ? { result: fresh, fromError: afterError }
      : null
  } catch {
    // Ignore — keep the optimistic state, offer no refresh. After a failed write
    // this means no recovery banner, so the failure snackbar's reload guidance is
    // the fallback.
  } finally {
    if (token === reconcileToken) {
      reconciling.value = false
    }
  }
}

function applyLatest(): void {
  if (!latestState.value) { return }
  result.value = latestState.value.result
  latestState.value = null
  // These are fresh authoritative rows for the current query, so drop any
  // search-error state — e.g. a search failed, then a sheet save's reconcile
  // surfaced this banner; applying it must reveal the rows, not stay on the retry.
  searchError.value = false
  // Supersede any in-flight retry started from that error state, so it can't
  // assign over these rows or re-raise the error after they've been applied.
  searchToken++
  prevFetchInput = null
  rebindOpenSheet()
}

// When `result` is replaced wholesale (the refresh banner, or a forced refresh),
// an open record sheet's `sheetRecord` still points at the old (now-orphaned) row
// object, so later sheet edits would mutate the orphan and stop reflecting in the
// table. Rebind to the matching fresh row — carrying over any detail-only fields
// already loaded via `/show` (the search result omits them) so the sheet keeps
// showing them — or close the sheet if the row is no longer present.
function rebindOpenSheet(): void {
  if (!result.value) { return }
  if (!sheet.state.value || sheetMode.value !== 'view' || !sheetRecord.value) { return }
  const id = resolveId(sheetRecord.value)
  const match = result.value.data.find((r) => resolveId(r) === id)
  if (!match) {
    sheet.off()
    return
  }
  for (const key of Object.keys(sheetRecord.value)) {
    if (!(key in match)) {
      match[key] = sheetRecord.value[key]
    }
  }
  sheetRecord.value = match
}

// Core force-refetch: drop the memoized input + any stash, invalidate an in-flight
// reconcile (its request may predate the change being surfaced), refetch the
// current query, then rebind an open sheet to the fresh rows. Calls `refresh`
// directly (not the debounced `doRefresh`) so it bypasses the pending-write /
// creating bail — callers (the exposed refresh, the create path) gate it
// themselves, and create deliberately refreshes while `creating` is still true.
async function forceRefresh(): Promise<void> {
  reconcileToken++
  reconciling.value = false
  // Supersede any normal search already in flight (e.g. issued by a query change
  // before an external bulk mutation) so its older rows can't assign over this
  // fresh result when it resolves — same token mechanism as the write/create
  // races. This refetch captures the bumped token, so it isn't self-suppressed.
  searchToken++
  const token = searchToken
  prevFetchInput = null
  latestState.value = null
  await refresh()
  // A deliberate reload landed fresh rows — clear any prior search-error state so
  // the list shows them instead of a stale error. But only if this reload wasn't
  // itself invalidated mid-flight (a write bumping `searchToken` makes the fetcher
  // return the current result, not freshly-assigned rows) — otherwise we'd dismiss
  // the error over the previous query's rows. (On failure this rethrows and the
  // flag is left untouched; the create path handles its own fallback.)
  if (token === searchToken) {
    searchError.value = false
  }
  rebindOpenSheet()
}

// Re-runs the current query against the endpoint, preserving the catalog's
// in-memory state (select / filters / sort / page). Exposed so callers can
// reflect server-side changes — e.g. after a bulk action mutates rows — without
// remounting the component.
async function refreshCatalog(): Promise<void> {
  // Defer while a write — or a (blocking) create — is in flight: a read now could
  // return stale pre-write / pre-create data and clobber the optimistic or
  // just-created rows (and a stashed stale result could outlive a failed write
  // whose post-batch reconcile is skipped). The post-batch reconcile / create
  // path surfaces the canonical state once things settle. When only a reconcile
  // is in flight (reads are fresh again), forceRefresh supersedes it.
  if (pendingWrites.value > 0 || creating.value) {
    return
  }
  await forceRefresh()
}

// When the effective row identifier appears or changes while editing is enabled,
// the loaded rows won't carry it until a refetch runs — so refetch here. Two
// cases: `editable` resolving true after mount (async permissions), so
// `withIndexField` only now appends the default `id`; or a parent resolving /
// changing `indexField` from async config. Without this the rows lack the new
// identifier, `rowsCarryIndexField` keeps editing gated off, and selection keys
// go `undefined` until an unrelated query change. A no-op when the identifier was
// already present (same request input → cached result reused).
//
// Close an open record sheet first: it was identified under the old field and
// can't be reliably re-matched to the new one (its row lacks the new key, so
// `resolveId` would be `undefined`), which would let a delete/save act on the
// wrong — or no — id during and after the refetch.
watch(
  () => (props.editable ? idField.value : null),
  (field, prev) => {
    if (!field || field === prev) { return }
    if (sheet.state.value && sheetMode.value === 'view') { sheet.off() }
    // Supersede any search still in flight under the previous identifier state: it
    // was issued before the new id/index field, so its rows won't carry the new
    // key. If it resolved after this refetch it would assign those id-less rows
    // back into `result`, flipping `rowsCarryIndexField` (and editing) off again
    // with no watcher to recover. Bumping the token makes the fetcher drop it.
    searchToken++
    refetch()
  }
)

// Track an optimistic background write: count it as pending, surface a snackbar
// on failure, and once the whole batch settles reconcile (so a failed write's
// diverged row can be restored via the refresh banner).
function hasPendingWrite(recordId: any): boolean {
  return pendingByRecord.has(recordId)
}

// Compose the failure snackbar: name the affected row when we have a label, then
// the server's reason (a policy / business-rule / validation message) when
// present, and always a recovery hint. The optimistic value isn't rolled back, so
// the user needs a way back to canonical state — the refresh banner offers a
// one-click path when it appears, but it can't always (a failed recovery reconcile
// shows none, and `isSameResult` can't see detail-only sheet fields absent from
// the search), so the reload hint stays as the guaranteed fallback. With a reason
// present, "reload to see the latest data" (the change didn't take; reload to
// resync); without one (network / 5xx / opaque), "reload and try again".
function writeErrorText(op: 'save' | 'delete', label: string | null, reason: string | null): string {
  const subject = op === 'delete'
    ? (label != null ? t.delete_failed(label) : t.delete_failed_anon)
    : (label != null ? t.save_failed(label) : t.save_failed_anon)
  return reason
    ? `${subject} ${reason} ${t.write_error_recover}`
    : `${subject} ${t.write_error_reload}`
}

// Track an optimistic background write for `recordId`, serialized per `key` so
// writes to the same cell reach the server in edit order. `op` / `label` name the
// affected row in the failure snackbar.
function trackWrite(
  recordId: any,
  key: string,
  op: 'save' | 'delete',
  label: string | null,
  run: () => Promise<unknown>
): void {
  // A new write changes the displayed state. Clear any stashed reconcile result
  // and invalidate an in-flight reconcile (advance the token so its result is
  // dropped; clear its busy flag — `pendingWrites` keeps us busy), so neither
  // can later repopulate the refresh banner with pre-edit data. The post-batch
  // reconcile re-derives it.
  latestState.value = null
  reconcileToken++
  // Invalidate any main search already in flight so it can't assign its pre-write
  // rows over the optimistic patch we're about to apply when it resolves.
  searchToken++
  reconciling.value = false
  pendingWrites.value++
  pendingByRecord.set(recordId, (pendingByRecord.get(recordId) ?? 0) + 1)

  // Chain after any in-flight write for the same cell so the requests reach the
  // server in order (a prior failure must not block the next write).
  const prev = writeChains.get(key) ?? Promise.resolve()
  const current = prev.catch(() => {}).then(run)
  writeChains.set(key, current)

  current
    .catch((e) => {
      batchErrored = true
      // Name the affected row and prefer a server-provided reason (a policy /
      // business-rule deny, a validation message) so a rejected write explains
      // itself and the user can tell which edit failed when several are in flight.
      // The optimistic edit isn't rolled back here; the post-batch reconcile
      // surfaces the refresh banner to restore it.
      snackbars.push({
        mode: 'danger',
        text: writeErrorText(op, label, extractServerMessage(e))
      })
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
        // Reconcile on error too: a failed write left its optimistic edit on the
        // row, so the canonical state now diverges and the refresh banner becomes
        // the user's one-click path to restore it (labelled as a recovery). If the
        // reconcile itself fails, no banner shows and the snackbar's reload
        // guidance is the fallback.
        reconcile(errored)
      }
    })
}

// Update — optimistic. Reflect the change in memory immediately (the catalog
// row and the open sheet share this object), then persist in the background.
function save(record: Record<string, any>, values: Record<string, any>): void {
  const id = resolveId(record)
  // Never let an update re-key the row. The built-in cell / sheet editors already
  // refuse to edit the index field, but the sheet-slot `save` helper funnels
  // through here directly and a custom editor could include it. Changing a row's
  // identifier optimistically (before the slow write settles) would re-key the
  // row, so a follow-up save / delete would resolve to the new, not-yet-synced id
  // and miss the in-flight record. Strip it so the invariant holds for every
  // caller. (The identifier is still settable on create, which uses `create()`.)
  const indexField = idField.value
  if (indexField in values) {
    values = { ...values }
    delete values[indexField]
  }
  if (Object.keys(values).length === 0) { return }
  Object.assign(record, values)
  // Optimistically advance the row's `updated_at` to ~now so the displayed
  // timestamp reflects the edit immediately. The server sets the authoritative
  // value; a little skew is fine and never surfaces the refresh banner, since the
  // reconcile diff ignores this column. Display-only — deliberately not added to
  // the persisted `values` (the server owns its own timestamping).
  if (UPDATED_AT_KEY in record) {
    record[UPDATED_AT_KEY] = day().toISOString()
  }
  // Serialize per record+field so two quick edits to the same cell apply in
  // order; edits to disjoint fields run concurrently.
  const fields = Object.keys(values)
  const key = `${id}:${[...fields].sort().join(',')}`
  // Same-cell repeats chain on this key inside trackWrite. But a multi-field save
  // (e.g. a slot persisting {name,status}) and a later single-field save ({name})
  // have different keys yet share a column, so without help they'd race — with
  // the slow API the older one could land last and clobber the newer value. Gate
  // behind any in-flight write for this record whose fields overlap; disjoint
  // writes still run concurrently.
  const prefix = `${id}:`
  const fieldSet = new Set(fields)
  const overlapping = [...writeChains.entries()]
    .filter(([k]) => k !== key && k.startsWith(prefix)
      && k.slice(prefix.length).split(',').some((f) => fieldSet.has(f)))
    .map(([, chain]) => chain)
  const gate = Promise.allSettled(overlapping)
  trackWrite(id, key, 'save', resolveLabel(record), () => gate.then(() => executeUpdate(id, values)))
}

// Reflect an out-of-band change on the in-memory record. Pure in-memory
// mutation: the caller (`uploadAvatar`) owns the write accounting (invalidation,
// reconcile). The catalog row and any open sheet share the object, so the change
// shows immediately. The row identifier is stripped so it can never re-key.
function patch(record: Record<string, any>, values: Record<string, any>): void {
  const indexField = idField.value
  if (indexField in values) {
    values = { ...values }
    delete values[indexField]
  }
  if (Object.keys(values).length === 0) { return }
  Object.assign(record, values)
}

// Persist an avatar image out-of-band (via the consumer's `avatar-upload`
// handler) and reflect the returned URL on the row, with the same accounting as
// an optimistic write so it stays consistent with concurrent reads/writes:
//   - an up-front invalidation preamble (mirroring `trackWrite`) supersedes any
//     stashed / in-flight reconcile or search, so a request that predates the
//     upload can't reassign pre-upload rows mid-flight and a stale refresh banner
//     can't revert the patched URL;
//   - `pendingWrites` locks the query controls while it's in flight, and
//     `pendingByRecord` arms `openSheet`'s `/show` stale-read guard;
//   - uploads to the same record+field are serialized (last issued wins);
//   - the URL lands on the live displayed row (resolved by id), not only the
//     passed `record` (which can be an orphan after a create refetched);
//   - a reconcile resyncs once the batch settles.
// Resolves to the new URL (rejects if the handler throws), or null when no
// handler is wired.
async function uploadAvatar(record: Record<string, any>, field: string, file: File | null): Promise<string | null> {
  if (!props.avatarUpload) { return null }
  const handler = props.avatarUpload
  const id = resolveId(record)

  latestState.value = null
  reconcileToken++
  searchToken++
  reconciling.value = false
  pendingWrites.value++
  pendingByRecord.set(id, (pendingByRecord.get(id) ?? 0) + 1)

  // Serialize uploads to the same record+field: chain after any in-flight one so
  // its request is sent (and patched) only once the earlier resolves.
  const key = `${id}:${field}`
  const prev = avatarChains.get(key) ?? Promise.resolve()
  const run = prev.catch(() => {}).then(() => handler({ id, record, field, file }))
  avatarChains.set(key, run)

  try {
    const url = await run
    const values = { [field]: url }
    // Patch the passed record (e.g. the sheet's detail record) and, when it's a
    // different object, the live displayed row resolved by id (e.g. a create that
    // refetched replaced `created` with a fresh row object).
    patch(record, values)
    const row = result.value?.data.find((r) => resolveId(r) === id)
    if (row && row !== record) {
      patch(row, values)
    }
    return url
  } finally {
    if (avatarChains.get(key) === run) {
      avatarChains.delete(key)
    }
    const remaining = (pendingByRecord.get(id) ?? 1) - 1
    remaining > 0 ? pendingByRecord.set(id, remaining) : pendingByRecord.delete(id)
    pendingWrites.value--
    if (pendingWrites.value === 0) {
      // Drive the post-batch reconcile like trackWrite does — this upload shares
      // the `pendingWrites` batch, so when it settles last it must forward (and
      // reset) `batchErrored` so a concurrent failed write's diverged row still
      // gets the recovery banner, and the flag doesn't leak into the next batch.
      const errored = batchErrored
      batchErrored = false
      reconcile(errored)
    }
  }
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
    // The POST succeeded — the record exists. Invalidate any main search already
    // in flight (issued before this create) so its pre-create rows can't assign
    // over the just-created record when it resolves — mirrors trackWrite. Bump
    // only AFTER success: a rejected create doesn't refetch, so suppressing the
    // search here too would strand the catalog on the old query — leaving it valid
    // lets it land its (correct, new-query) rows instead. New searches can't start
    // during the create (doRefresh bails on `creating`); create's own forceRefresh
    // bypasses that by calling refresh directly.
    searchToken++
    // Don't clear `searchError` here: only a successful current-query refresh
    // should (forceRefresh does so on success). The fallbacks below show the
    // previous query's rows plus the new record — not the requested query — so
    // dismissing the error there would present stale rows as if they matched.
    //
    // From here a refresh failure must not reject (the caller would treat the
    // create as failed and re-submit a duplicate); fall back to showing the new
    // record optimistically.
    if (pendingWrites.value > 0) {
      // Other optimistic writes are still syncing; a refetch now would read the
      // backend before they're visible and clobber those rows. Prepend the new
      // record optimistically — the pending writes' reconcile refreshes the
      // full list (via the refresh banner) once they settle.
      prependCreated(res.data)
    } else {
      // Force a fresh refetch directly (not the exposed refreshCatalog, which
      // would no-op while `creating` is still true). forceRefresh also invalidates
      // any reconcile that a batch settling mid-POST kicked off, so a pre-create
      // snapshot can't land behind the refresh banner.
      try {
        await forceRefresh()
      } catch {
        prependCreated(res.data)
      }
    }
    if (!hasInitialResults.value && (result.value?.data.length ?? 0) > 0) {
      hasInitialResults.value = true
    }
    return res.data
  } catch (e) {
    // The create was rejected (e.g. a server `unique` rule). A query/filter/page
    // change made just before submitting may have scheduled a refresh that the
    // `creating` bail dropped without issuing a request, leaving the rows on the
    // previous query. Re-schedule it now: doRefresh fires after `creating` clears,
    // re-bails if writes are pending, and is a memo no-op when the query is
    // unchanged (the common case), so it only does work when a query change was
    // actually stranded.
    void doRefresh()
    throw e
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
  // Serialize the delete behind any in-flight updates for the same record. With
  // the slow write API, a concurrently-issued delete could otherwise reach the
  // backend before a pending update — the update would then fail against an
  // already-deleted row (spurious save-failed snackbar) or resurrect/clobber
  // it. Gate on the record's current write chains (settled, success or not —
  // the row is being deleted regardless) before issuing the delete.
  const pendingForRecord = [...writeChains.entries()]
    .filter(([key]) => key.startsWith(`${id}:`))
    .map(([, chain]) => chain)
  // `Promise.allSettled([])` resolves immediately, so this is a no-op gate when
  // the record has no in-flight writes.
  const gate = Promise.allSettled(pendingForRecord)
  trackWrite(id, `${id}:__delete__`, 'delete', resolveLabel(record), () => gate.then(() => executeDelete(id)))
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
    // Merge into the *current* sheet record, not the one captured at call time: a
    // direct refresh may have rebound `sheetRecord` to a fresh row object while
    // `/show` was in flight, and the detail must land on the row the sheet is
    // actually showing (else it renders without the detail-only fields). The seq
    // guard ensures this is still the same logical record (a newer open bumps it).
    const target = sheetRecord.value
    if (seq === showRequestSeq && target) {
      if (pendingAtIssue || hasPendingWrite(id)) {
        // The record had/has an in-flight write, so `/show` may have read the
        // backend before it synced. Don't overwrite the optimistic values
        // already on the row; only fill in detail-only fields not yet present.
        for (const k of Object.keys(res.data)) {
          if (!(k in target)) {
            target[k] = res.data[k]
          }
        }
      } else {
        Object.assign(target, res.data)
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
  // Creation is enabled by `creatable`, which defaults to on for an editable
  // catalog. Honor it here even though this method is exposed (and provided to
  // children).
  if (!props.editable || !props.creatable) {
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

// Catalog-level editing gate: `editable` is set (boolean `true` or a predicate)
// and the rows carry the index field needed to resolve a record's id.
function editEnabled(): boolean {
  return !!props.editable && rowsCarryIndexField.value
}

// Per-record refinement: a predicate `editable`/`deletable` decides each row, a
// boolean applies to all.
function canEdit(record: Record<string, any>): boolean {
  return editEnabled() && (typeof props.editable === 'function' ? props.editable(record) : true)
}

// Delete is a stronger action than edit and rides the same editable sheet, so a
// row must be editable before it can be deleted — building on `canEdit` makes a
// per-record `editable` predicate gate delete too (a row it rejects is never
// deletable). `deletable` then refines further: on unless explicitly `false`, or
// its own per-record predicate.
function canDelete(record: Record<string, any>): boolean {
  return canEdit(record) && (typeof props.deletable === 'function' ? props.deletable(record) : props.deletable)
}

provideLensEdit({
  // Getters so the injected context tracks prop changes after mount (e.g.
  // permissions resolving async, or a flag toggling `editable` off): LensTable
  // gates inline editing and the id-cell sheet on `edit.editable`.
  //
  // Also gated on `rowsCarryIndexField`: when `editable` flips true after mount we
  // trigger a refetch to pull in the identifier, but it lands asynchronously —
  // keep editing off until the rows actually carry it, so a save in that window
  // can't `resolveId()` to `undefined`.
  get editable() { return editEnabled() },
  get creatable() { return !!props.editable && props.creatable },
  // Use the same `__no_entity__` fallback as the search / CRUD requests so slot
  // side-channel saves (which read this) target the same entity, not an empty one.
  get entity() { return entityName.value },
  // Getter too: `LensTable` / `LensSheetField` read `edit.indexField` to pick the
  // sheet opener and to block identifier edits, so it must track a prop that
  // resolves (or changes) after mount — otherwise the new identifier column stays
  // non-clickable while the old field is still treated as the id.
  get indexField() { return idField.value },
  canEdit,
  canDelete,
  resolveId,
  save,
  uploadAvatar,
  create,
  remove,
  openSheet,
  openCreate,
  refresh: refreshCatalog
})

// Avatars are persisted out-of-band (the consumer's upload handler), not through
// the Lens write. Expose the handler to the avatar cell / sheet field / create
// form via a thin accessor so a prop that resolves after mount is read live.
provideLensAvatarUpload({
  get handler() { return props.avatarUpload ?? null }
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
        <span class="refresh-banner-text">{{ latestState.fromError ? t.refresh_failed_text : t.refresh_text }}</span>
        <SButton size="mini" mode="info" :label="t.refresh_action" @click="applyLatest" />
      </div>
      <div class="list" :style="tableMaxHeight">
        <div v-if="searchError" class="list-error">
          <p class="list-error-text">{{ t.search_error }}</p>
          <!-- Retry the same query via the busy-guarded `doRefresh` (not `refetch`,
               which would clear a `latestState` recovery banner before the retry
               resolves — a failed retry would then lose that known-good stash). -->
          <SButton
            size="small"
            mode="info"
            :label="t.search_retry"
            :loading
            :disabled="busy"
            @click="doRefresh"
          />
        </div>
        <template v-else>
          <LensTable
            :result
            :loading
            :overrides="_overrides"
            :select="tableSelect"
            :index-field="tableIndexField"
            :selected
            :clickable-fields
            :inline-editable
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
        </template>
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
      :entity="entityName"
      :record="sheetRecord"
      :loading="sheetLoading"
      :error="sheetError"
      :fields="result.fields"
      :index-field="idField"
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

.list-error {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 48px 16px;
  text-align: center;
}

.list-error-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--c-text-2);
}

.control-skeleton {
  height: 56px;
  background-color: var(--c-bg-1);
}
</style>
