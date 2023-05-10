import { watchOnce } from '@vueuse/core'
import cloneDeep from 'lodash-es/cloneDeep'
import { type WatchSource } from 'vue'
import { reactive } from 'vue'
import { isNullish, isObject } from '../support/Utils'

export interface Data<T extends Record<string, any>> {
  state: T
  init(): void
}

export type DataWithDef = Record<string, any>

export interface Def<T = any> {
  __isDef: true
  value: any
  source: WatchSource<T>
  cb: (value: Exclude<T, undefined>) => void
}

export type UseDataInput<
  T extends Record<string, any>
> = T | ((utils: UseDataInputUtils) => DataWithDef)

export interface UseDataInputUtils {
  def<T>(
    value: any,
    source: WatchSource<T>,
    cb: (value: Exclude<T, null | undefined>) => void
  ): Def<T>
}

export function useData<T extends Record<string, any>>(
  data: UseDataInput<T>
): Data<T> {
  const { state, defs } = createState(data)

  const initialState = cloneDeep(state)
  const reactiveState = reactive(state)

  handleDefs(defs, reactiveState)

  function init(): void {
    Object.assign(reactiveState, initialState)
  }

  return {
    state: reactiveState,
    init
  }
}

function createState<T extends Record<string, any>>(
  data: UseDataInput<T>
): { state: T; defs: [string, Def][] } {
  if (typeof data !== 'function') {
    return { state: data, defs: [] }
  }

  const dataWithDef = data({ def })

  const state = {} as T
  const defs = [] as [string, Def][]

  for (const key in dataWithDef) {
    const maybeDef = dataWithDef[key]

    if (!isDef(maybeDef)) {
      (state as any)[key] = maybeDef
      continue
    }

    (state as any)[key] = maybeDef.value

    defs.push([key, maybeDef])
  }

  return {
    state,
    defs
  }
}

function handleDefs<T extends Record<string, any>>(
  defs: [string, Def][],
  state: T
): void {
  defs.forEach(([key, def]) => {
    watchOnce(def.source, (value: any) => {
      if (!isNullish(value)) {
        (state as any)[key] = def.cb(value)
      }
    })
  })
}

function def<T>(
  value: any,
  source: WatchSource<T>,
  cb: (value: Exclude<T, null | undefined>) => void
): Def {
  return {
    __isDef: true,
    value,
    source,
    cb
  }
}

function isDef(value: any): boolean {
  return isObject(value) ? !!value.__isDef : false
}
