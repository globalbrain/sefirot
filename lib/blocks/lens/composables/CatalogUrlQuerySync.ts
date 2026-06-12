import cloneDeep from 'lodash-es/cloneDeep'
import { type Ref, onScopeDispose, reactive, watch } from 'vue'
import { useUrlQuerySync } from '../../../composables/Url'
import { FilterOperatorLabelDict } from '../FilterOperator'
import { type LensQuerySort } from '../LensQuery'

export interface CatalogUrlQuerySyncState {
  query: Ref<string | null>
  filters: Ref<any[]>
  sort: Ref<LensQuerySort[]>
  page: Ref<number>
}

const filterOperators = new Set(Object.keys(FilterOperatorLabelDict))

// The sync owns a fixed set of query param keys (`q`, `filters`, `sort`,
// and `page`), so two active instances on the same page would overwrite
// each other's params. Track active instances to warn about this misuse.
let activeCount = 0

/**
 * Sync the catalog state with the URL query string via `useUrlQuerySync`.
 * `filters` and `sort` are carried as JSON since their nested array
 * structure (with non-string values) cannot survive a flat query string.
 *
 * `onChange` is called whenever the synced state changes after the
 * initial setup. State changes coming from the catalog UI already
 * trigger a fetch in their own handlers, so the callback is expected to
 * be debounced; its real purpose is to fetch on URL-driven changes
 * (browser back/forward, hand-edited URL) which have no other
 * refresh path.
 */
export function useCatalogUrlQuerySync(
  state: CatalogUrlQuerySyncState,
  onChange: () => void
): void {
  if (import.meta.env.DEV) {
    activeCount++
    if (activeCount > 1) {
      console.warn(
        '[sefirot] Multiple `LensCatalog` components with `url-sync` enabled'
        + ' are active at the same time. They will overwrite each other\'s'
        + ' query params (`q`, `filters`, `sort`, and `page`). Enable'
        + ' `url-sync` on at most one catalog per page.'
      )
    }
    onScopeDispose(() => { activeCount-- })
  }

  // URL params are user-editable, so anything malformed falls back to
  // the state's initial value, exactly as if the param was absent.
  const defaultFilters = state.filters.value
  const defaultSort = state.sort.value
  const defaultPage = state.page.value

  const urlState = reactive({
    q: state.query,
    filters: state.filters,
    sort: state.sort,
    page: state.page
  })

  useUrlQuerySync(urlState, {
    casts: {
      q: (v) => castQ(v),
      filters: (v) => castFilters(v) ?? cloneDeep(defaultFilters),
      sort: (v) => castSort(v) ?? cloneDeep(defaultSort),
      page: (v) => castPage(v) ?? defaultPage
    },
    serializers: {
      filters: (v) => JSON.stringify(v),
      sort: (v) => JSON.stringify(v)
    }
  })

  // Registered after `useUrlQuerySync` on purpose: the initial URL ->
  // state application happens synchronously inside it, before this
  // watcher exists, so the initial fetch (on mounted) is not duplicated.
  watch(urlState, onChange, { deep: true })
}

function castQ(value: any): string | null {
  return typeof value === 'string' && value !== '' ? value : null
}

function castFilters(value: any): any[] | null {
  if (typeof value !== 'string') {
    return null
  }
  try {
    const parsed = JSON.parse(value)
    return isFilters(parsed) ? parsed : null
  } catch {
    return null
  }
}

// Filters are a list of entries where an entry is either a condition
// tuple `[field, operator, value]` or a group `['$and' | '$or', entries]`.
// Refer to `groupToLensFilters` in `LensFormFilter.vue`.
function isFilters(value: unknown): value is any[] {
  return Array.isArray(value) && value.every(isFilterEntry)
}

function isFilterEntry(value: unknown): boolean {
  if (!Array.isArray(value)) {
    return false
  }
  if (value[0] === '$and' || value[0] === '$or') {
    return value.length === 2 && isFilters(value[1])
  }
  return value.length === 3
    && typeof value[0] === 'string'
    && typeof value[1] === 'string'
    && filterOperators.has(value[1])
}

function castSort(value: any): LensQuerySort[] | null {
  if (typeof value !== 'string') {
    return null
  }
  try {
    const parsed = JSON.parse(value)
    return isSort(parsed) ? parsed : null
  } catch {
    return null
  }
}

function isSort(value: unknown): value is LensQuerySort[] {
  return Array.isArray(value) && value.every((entry) => {
    return Array.isArray(entry)
      && entry.length === 2
      && typeof entry[0] === 'string'
      && (entry[1] === 'asc' || entry[1] === 'desc')
  })
}

function castPage(value: any): number | null {
  const page = Number(value)
  return Number.isInteger(page) && page >= 1 ? page : null
}
