import isEqual from 'lodash-es/isEqual'
import { type MaybeRef, nextTick, unref, watch } from 'vue'
import { type LocationQuery, useRoute, useRouter } from 'vue-router'

export interface UseUrlQuerySyncOptions {
  casts?: Record<string, (value: any) => any>
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
  { casts = {}, exclude = [] }: UseUrlQuerySyncOptions = {}
): void {
  const route = useRoute()
  const router = useRouter()

  const flattenedDefaultState = flattenObject(unref(state))

  let isSyncing = false

  watch(
    () => route.query,
    async () => {
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
      if (!exclude.includes(key) && flattenedDefaultState[key] !== flattenedState[key]) {
        newQuery[key] = flattenedState[key]
      }
    }

    const currentQuery = normalizeQuery(route.query)

    if (!isEqual(newQuery, currentQuery)) {
      await router.replace({ query: unflattenObject(newQuery) })
    }
  }

  function normalizeQuery(query: LocationQuery): Record<string, any> {
    const flattenedQuery = flattenObject(query)
    const result: Record<string, any> = {}

    for (const key in flattenedQuery) {
      if (!exclude.includes(key)) {
        result[key] = casts[key] ? casts[key](flattenedQuery[key]) : flattenedQuery[key]
      }
    }

    return result
  }
}

function flattenObject(obj: Record<string, any>, path: string[] = []): Record<string, any> {
  const result: Record<string, any> = {}

  for (const key in obj) {
    const value = obj[key]

    if (value && typeof value === 'object' && !Array.isArray(value)) {
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
      target = target[k] = target[k] || {}
    }

    target[keys[keys.length - 1]] = value
  }

  return result
}

function deepAssign(target: Record<string, any>, source: Record<string, any>) {
  for (const key in source) {
    const value = source[key]

    if (Array.isArray(value)) {
      target[key].splice(0, target[key].length, ...value)
    } else if (value && typeof value === 'object') {
      target[key] = deepAssign(target[key] || {}, value)
    } else {
      target[key] = value
    }
  }

  return target
}
