<script setup lang="ts">
import SInputSelectSearch, { type Option } from '../../../components/SInputSelectSearch.vue'
import { useMutation } from '../../../composables/Api'
import { useLang } from '../../../composables/Lang'
import { type LensQuerySettings, type LensQuerySort } from '../LensQuery'
import { isAuthError } from '../validation/ServerErrors'

export type { Color, Size } from '../../../components/SInputBase.vue'
export type { Option }

// A lens-backed search-select. Combines the search (a lens query), the fetch (no
// repo needed), and the row → option mapping (no ops needed) into one component:
// the consumer configures the entity and how a row becomes an option, and the
// component searches the server as the user types via SInputSelectSearch.
//
// Selection UI props (multiple, nullable, disabled, placeholder, size, label,
// validation, position, closeOnSelect, debounce, …) fall through to
// SInputSelectSearch as attributes.
export interface Props {
  // The lens search endpoint (e.g. `/api/admin/lens/search`).
  endpoint: string

  // The entity to search.
  entity: string

  // Columns to fetch for each row, projected into an option by `toOption`.
  select: string[]

  // Columns matched against the typed query — OR-ed together with `contains`.
  // An empty query fetches the initial (unfiltered) page. Named to match
  // LensCatalog's `queryKeys`.
  queryKeys: string[]

  // Sort applied to the results (e.g. `[['name', 'asc']]`). Re-read on each fetch,
  // so a locale-dependent sort stays current.
  sort?: LensQuerySort[]

  // Page size of each search. The server enforces its own perPage ceiling.
  perPage?: number

  // Per-request settings (e.g. language). Usually unneeded — the server negotiates
  // language from the request headers.
  settings?: LensQuerySettings

  // Map a raw result row to an option. The selected option(s) are the model, so
  // include everything the consumer needs back (e.g. a related record), plus the
  // `value` / `label` (and `image` for an avatar option) the select renders.
  toOption: (row: Record<string, any>) => Option
}

const props = defineProps<Props>()

// Pass the selection through to SInputSelectSearch. Typed loosely so a consumer
// can bind a ref of its own richer option type (see SInputSelectSearch).
const model = defineModel<any>({ required: true })

// Don't let lens-config attributes that happen to share a name leak onto the
// child; only the explicitly-forwarded selection props (via `$attrs`) should.
defineOptions({ inheritAttrs: false })

// Default the request language to the active app language (like LensCatalog), so
// server-localized fields come back in the right locale even when HttpConfig /
// request headers differ; explicit `settings` (incl. `lang`) overrides it.
const lang = useLang()

const { execute } = useMutation((http, query: string) =>
  http.post<{ data: Record<string, any>[] }>(props.endpoint, {
    entity: props.entity,
    select: props.select,
    filters: query
      ? [['$or', props.queryKeys.map((key) => [key, 'contains', query])]]
      : [],
    sort: props.sort ?? [],
    page: 1,
    perPage: props.perPage ?? 25,
    settings: { lang, ...props.settings }
  })
)

// Read every config field through `props` at call time so a reactive change
// (e.g. a locale-dependent sort or label) takes effect on the next search.
async function fetch(query: string): Promise<Option[]> {
  const res = await execute(query)
  return res.data.map(props.toOption)
}
</script>

<template>
  <SInputSelectSearch v-model="model" :fetch :rethrow="isAuthError" v-bind="$attrs">
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputSelectSearch>
</template>
