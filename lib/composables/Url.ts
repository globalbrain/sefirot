import isEqual from 'lodash-es/isEqual'
import isPlainObject from 'lodash-es/isPlainObject'
import { type MaybeRef, isRef, toValue, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export interface UseUrlQuerySyncOptions {
  casts?: Record<string, (value: any) => any>
  exclude?: string[]
}

export function useUrlQuerySync(
  state: MaybeRef<Record<string, any>>,
  { casts = {}, exclude }: UseUrlQuerySyncOptions = {}
): void {
  const router = useRouter()
  const route = useRoute()

  const flattenInitialState = flattenObject(
    JSON.parse(JSON.stringify(toValue(state)))
  )

  setStateFromQuery()

  watch(() => toValue(state), setQueryFromState, {
    deep: true,
    immediate: true
  })

  function setStateFromQuery() {
    const flattenState = flattenObject(toValue(state))
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

    deepAssign(
      isRef<Record<string, any>>(state) ? state.value : state,
      unflattenObject(flattenState)
    )
  }

  async function setQueryFromState() {
    const flattenState = flattenObject(toValue(state))
    const flattenQuery = flattenObject(route.query)

    Object.keys(flattenState).forEach((key) => {
      if (exclude?.includes(key)) {
        return
      }

      const value = flattenState[key]
      const initialValue = flattenInitialState[key]

      if (isEqual(value, initialValue)) {
        delete flattenQuery[key]
      } else {
        flattenQuery[key] = value
      }

      if (flattenQuery[key] === undefined) {
        delete flattenQuery[key]
      }
    })

    await router.replace({ query: unflattenObject(flattenQuery) })
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

function deepAssign(target: Record<string, any>, source: Record<string, any>) {
  const dest = target
  const src = source

  if (isPlainObject(src)) {
    Object.keys(src).forEach((key) => deepAssignBase(dest, src, key))
  } else if (Array.isArray(src)) {
    dest.length = src.length
    src.forEach((_, key) => deepAssignBase(dest, src, key))
  } else {
    throw new TypeError('[deepAssign] src must be an object or array')
  }
}

function deepAssignBase(
  dest: Record<string, any>,
  src: Record<string, any>,
  key: string | number
) {
  if (typeof src[key] === 'object' && src[key] !== null) {
    deepAssign(dest[key], src[key])
  } else {
    dest[key] = src[key]
  }
}
