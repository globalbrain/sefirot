import { type MaybeRef, nextTick, unref, watch } from 'vue'
import { type LocationQuery, useRoute, useRouter } from 'vue-router'

export interface UseUrlQuerySyncOptions {
  casts?: Record<string, (value: any) => any>
  exclude?: string[]
}

export function useUrlQuerySync(
  state: MaybeRef<Record<string, any>>,
  options: UseUrlQuerySyncOptions = {}
): void {
  const route = useRoute()
  const router = useRouter()

  const flattenedDefaultState = flattenObject(unref(state))

  let isSyncing = false

  watch(
    () => route.query,
    async (query) => {
      if (isSyncing) {
        return
      }

      isSyncing = true
      await setStateFromQuery(query, options)
      isSyncing = false
    },
    { deep: true, immediate: true }
  )

  watch(
    () => unref(state),
    async (state) => {
      if (isSyncing) {
        return
      }

      isSyncing = true
      await setQueryFromState(state, options)
      isSyncing = false
    },
    { deep: true }
  )

  async function setStateFromQuery(
    query: LocationQuery,
    { casts = {}, exclude = [] }: UseUrlQuerySyncOptions = {}
  ) {
    const flattenedQuery = flattenObject(query)

    const result: Record<string, any> = {}

    for (const key in flattenedQuery) {
      if (exclude.includes(key)) {
        continue
      }

      const value = flattenedQuery[key]
      const cast = casts[key]

      if (cast) {
        result[key] = cast(value)
      } else {
        result[key] = value
      }
    }

    const newState = { ...flattenedDefaultState, ...result }

    deepAssign(unref(state), unflattenObject(newState))

    await nextTick()

    const newQuery: Record<string, any> = {}

    for (const key in newState) {
      if (flattenedDefaultState[key] !== newState[key]) {
        newQuery[key] = newState[key]
      }
    }

    const currentQuery = flattenObject(route.query)

    let isSame = true
    for (const key in currentQuery) {
      if (newQuery[key] !== currentQuery[key]) {
        isSame = false
        break
      }
    }

    if (isSame) {
      return
    }

    await router.replace({ query: unflattenObject(newQuery) })
  }

  async function setQueryFromState(
    state: Record<string, any>,
    { casts = {}, exclude = [] }: UseUrlQuerySyncOptions = {}
  ) {
    const flattenedState = flattenObject(state)

    const newQuery: Record<string, any> = {}

    for (const key in flattenedState) {
      if (exclude.includes(key)) {
        continue
      }

      const value = flattenedState[key]
      const cast = casts[key]

      if (cast) {
        newQuery[key] = cast(value)
      } else {
        newQuery[key] = value
      }

      if (flattenedDefaultState[key] === value) {
        delete newQuery[key]
      }
    }

    const currentQuery = flattenObject(route.query)

    let isSame = true
    for (const key in newQuery) {
      if (newQuery[key] !== currentQuery[key]) {
        isSame = false
        break
      }
    }

    if (isSame) {
      return
    }

    await router.replace({ query: unflattenObject(newQuery) })
  }
}

function flattenObject(
  obj: Record<string, any>,
  path: string[] = []
): Record<string, any> {
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

/* Caveats:
  - Vulnerable to prototype pollution
  - Does not support objects inside arrays
*/
