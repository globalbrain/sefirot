import isEqual from 'lodash-es/isEqual'
import isPlainObject from 'lodash-es/isPlainObject'
import { type MaybeRef, computed, nextTick, unref, watch } from 'vue'
import { type LocationQuery, useRoute, useRouter } from 'vue-router'

export interface UseUrlQuerySyncOptions {
  casts?: Record<string, (value: any) => any>
  serializers?: Record<string, (value: any) => string>
  exclude?: string[]
}

/**
 * Sync between the given state and the URL query params.
 *
 * Caveats:
 * - Vulnerable to prototype pollution.
 * - Does not support objects inside arrays.
 */
export function useUrlQuerySync(
  state: MaybeRef<Record<string, any>>,
  { casts = {}, serializers = {}, exclude = [] }: UseUrlQuerySyncOptions = {}
): void {
  const route = useRoute()
  const router = useRouter()

  const routeQuery = computed(() => ({
    path: route.path,
    query: route.query
  }))

  const flattenedDefaultState = flattenObject(unref(state))

  let isSyncing = false

  watch(
    routeQuery,
    async (to, from) => {
      if (from && from.path !== to.path) {
        return
      }

      if (!isSyncing) {
        isSyncing = true
        await setState()
        isSyncing = false
      }
    },
    { deep: true, immediate: true }
  )

  watch(
    () => unref(state),
    async () => {
      if (!isSyncing) {
        isSyncing = true
        await setQuery()
        isSyncing = false
      }
    },
    { deep: true }
  )

  async function setState() {
    const newState = unflattenObject({ ...flattenedDefaultState, ...normalizeQuery(route.query) })
    deepAssign(unref(state), newState)

    await nextTick()
    await setQuery()
  }

  async function setQuery() {
    const flattenedState = flattenObject(unref(state))
    const newQuery: Record<string, any> = {}

    for (const key in flattenedState) {
      if (!exclude.includes(key) && !isEqual(flattenedState[key], flattenedDefaultState[key])) {
        newQuery[key] = flattenedState[key]
      }
    }

    const currentQuery = normalizeQuery(route.query)

    // Both sides of this comparison hold deserialized values: `newQuery`
    // carries raw state values and `normalizeQuery` runs `casts` on the
    // URL params. Serialization must therefore only happen on the final
    // write below — serializing before the comparison would make a
    // round-tripped value always look different from the state and cause
    // an endless replace loop.
    if (!isEqual(newQuery, currentQuery)) {
      await router.replace({ query: unflattenObject(serializeQuery(newQuery)) })
    }
  }

  function serializeQuery(query: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {}

    for (const key in query) {
      result[key] = serializers[key] ? serializers[key](query[key]) : query[key]
    }

    return result
  }

  function normalizeQuery(query: LocationQuery): Record<string, any> {
    const flattenedQuery = flattenObject(query)

    const keys = Object.keys(flattenedQuery).filter((key) => {
      return !exclude.includes(key) && fitsDefaultState(key)
    })

    const result: Record<string, any> = {}

    for (const key of keys) {
      // When a param is shadowed by a nested param with the same prefix
      // (e.g. `foo` and `foo.bar`), drop the shadowed one: the pair can
      // never be represented in a single state object, and keeping it here
      // would make `setQuery` rewrite the URL just to remove it, breaking
      // recovery of the remaining params on reload. Excluded params are
      // invisible to the sync, so they never shadow anything.
      if (!keys.some((k) => k.startsWith(`${key}.`))) {
        result[key] = casts[key] ? casts[key](flattenedQuery[key]) : flattenedQuery[key]
      }
    }

    return result
  }

  // The default state acts as the schema for the sync. A param that does
  // not fit its shape — a nested param under a scalar or array default
  // (`page.page` vs `{ page: 1 }`), or a scalar param over a nested
  // default (`page` vs `{ page: { page: 1 } }`) — cannot be assigned to
  // the state without corrupting the shape the app expects, so it is
  // ignored as malformed input, exactly as if the param was absent, and
  // left in the URL untouched. Params unrelated to any default key are
  // still synced into the state as is.
  function fitsDefaultState(key: string): boolean {
    if (Object.hasOwn(flattenedDefaultState, key)) {
      return true
    }

    return !Object.keys(flattenedDefaultState).some((k) => {
      return k.startsWith(`${key}.`) || key.startsWith(`${k}.`)
    })
  }
}

function flattenObject(obj: Record<string, any>, path: string[] = []): Record<string, any> {
  const result: Record<string, any> = {}

  for (const key in obj) {
    const value = obj[key]

    if (Array.isArray(value)) {
      result[path.concat(key).join('.')] = value.slice()
    } else if (value && typeof value === 'object') {
      Object.assign(result, flattenObject(value, [...path, key]))
    } else {
      result[path.concat(key).join('.')] = value
    }
  }

  return result
}

function unflattenObject(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {}

  for (const key in obj) {
    const value = obj[key]

    let target = result
    const keys = key.split('.')

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i]

      // When a scalar key conflicts with a nested key (e.g. `page` and
      // `page.page`), drop the scalar and let the nested key win. Otherwise
      // assigning a property on the scalar below would throw a `TypeError`.
      if (!isPlainObject(target[k])) {
        target[k] = {}
      }

      target = target[k]
    }

    target[keys[keys.length - 1]] = value
  }

  return result
}

function deepAssign(target: Record<string, any>, source: Record<string, any>) {
  for (const key in source) {
    const value = source[key]

    if (Array.isArray(value)) {
      if (Array.isArray(target[key])) {
        target[key].splice(0, target[key].length, ...value)
      } else {
        target[key] = value
      }
    } else if (value && typeof value === 'object') {
      // Same scalar vs. nested conflict handling as `unflattenObject`:
      // assigning nested values onto an existing scalar would throw.
      target[key] = deepAssign(isPlainObject(target[key]) ? target[key] : {}, value)
    } else {
      target[key] = value
    }
  }

  return target
}
