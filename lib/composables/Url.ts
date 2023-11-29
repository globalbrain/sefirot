import isPlainObject from 'lodash-es/isPlainObject'
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export interface UseUrlQuerySyncOptions {
  casts?: Record<string, (value: string) => any>
  exclude?: string[]
}

export function useUrlQuerySync(
  state: Record<string, any>,
  { casts = {}, exclude }: UseUrlQuerySyncOptions
) {
  const router = useRouter()
  const route = useRoute()

  const flattenInitialState = flattenObject(JSON.parse(JSON.stringify(state)))

  setStateFromQuery()

  watch(() => state, setQueryFromState, { deep: true, immediate: true })

  function setStateFromQuery() {
    const flattenState = flattenObject(state)
    const flattenQuery = flattenObject(route.query)

    Object.keys(flattenQuery).forEach((key) => {
      if (exclude?.includes(key)) {
        return
      }

      const value = flattenQuery[key]
      if (value === undefined) {
        return
      }

      const cast = casts[key]
      flattenState[key] = cast ? cast(value) : value
    })

    Object.assign(state, unflattenObject(flattenState))
  }

  function setQueryFromState() {
    const flattenState = flattenObject(state)
    const flattenQuery = flattenObject(route.query)

    Object.keys(flattenState).forEach((key) => {
      if (exclude?.includes(key)) {
        return
      }

      const value = flattenState[key]
      const initialValue = flattenInitialState[key]

      if (value === initialValue) {
        delete flattenQuery[key]
      } else {
        flattenQuery[key] = value
      }

      if (flattenQuery[key] === undefined) {
        delete flattenQuery[key]
      }

      router.replace({ query: unflattenObject(flattenQuery) })
    })
  }
}

function flattenObject(obj: Record<string, any>, prefix = '') {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : ''
    if (isPlainObject(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], pre + k))
    } else {
      acc[pre + k] = obj[k]
    }
    return acc
  }, {} as Record<string, any>)
}

function unflattenObject(obj: Record<string, any>) {
  return Object.keys(obj).reduce((acc, k) => {
    const keys = k.split('.')
    keys.reduce((a, c, i) => {
      if (i === keys.length - 1) {
        a[c] = obj[k]
      } else {
        a[c] = a[c] || {}
      }
      return a[c]
    }, acc)
    return acc
  }, {} as Record<string, any>)
}
