<script setup lang="ts" generic="T, Multiple extends boolean = false">
import SInputSelectSearch, { type Option } from '../../../components/SInputSelectSearch.vue'
import { useMutation } from '../../../composables/Api'
import { useLang } from '../../../composables/Lang'
import { type LensQuerySettings, type LensQuerySort } from '../LensQuery'
import { isAuthError } from '../validation/ServerErrors'

export type { Color, Size } from '../../../components/SInputBase.vue'
export type { Option }

// A lens-backed search-select that works entirely in the consumer's own model
// type. It searches the server as the user types (via SInputSelectSearch): each
// result row is turned into a model by `toModel`, and each model is rendered as
// its dropdown/chip option by `toOption`. The v-model is those models — a `T[]`
// when `multiple`, otherwise `T | null`.
//
// Remaining selection UI props (nullable, disabled, placeholder, size, label,
// validation, position, closeOnSelect, debounce, …) fall through as attributes.
export interface Props<T = any, Multiple extends boolean = false> {
  // The lens search endpoint (e.g. `/api/admin/lens/search`).
  endpoint: string

  // The entity to search.
  entity: string

  // Columns to fetch for each row, passed to `toModel`.
  select: string[]

  // Columns matched against the typed query — OR-ed together with `contains`. An
  // empty query fetches the initial (unfiltered) page. Named to match
  // LensCatalog's `queryKeys`.
  queryKeys: string[]

  // Sort applied to the results (e.g. `[['name', 'asc']]`). Re-read on each fetch,
  // so a locale-dependent sort stays current.
  sort?: LensQuerySort[]

  // Page size of each search. The server enforces its own perPage ceiling.
  perPage?: number

  // Per-request settings (e.g. language). Usually unneeded — the server
  // negotiates language from the request headers.
  settings?: LensQuerySettings

  // Whether multiple models can be selected. Typed `boolean & Multiple` (equal to
  // `Multiple`) so Vue keeps runtime Boolean casting for a bare `multiple` while
  // `Multiple` still drives the arity-conditional model type. See SInputSelectSearch.
  multiple?: boolean & Multiple

  // Build a model from a raw result row.
  toModel: (row: Record<string, any>) => T

  // Render a model as its dropdown/chip option (`value` is the identity).
  toOption: (item: T) => Option
}

const props = defineProps<Props<T, Multiple>>()

// The selected model(s): a `T[]` when `multiple`, otherwise `T | null`.
const model = defineModel<Multiple extends true ? T[] : T | null>({ required: true })

// Don't let lens-config attributes leak onto the child; only the explicitly
// forwarded selection props (via `$attrs`) should.
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

// Read every config field through `props` at call time so a reactive change (e.g.
// a locale-dependent sort or label) takes effect on the next search.
async function fetch(query: string): Promise<T[]> {
  const res = await execute(query)
  return res.data.map(props.toModel)
}
</script>

<template>
  <SInputSelectSearch
    v-model="model"
    :fetch
    :to-option
    :multiple
    :rethrow="isAuthError"
    v-bind="$attrs"
  >
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputSelectSearch>
</template>
