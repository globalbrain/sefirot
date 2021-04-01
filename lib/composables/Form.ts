import { reactive, UnwrapRef } from '@vue/composition-api'
import { Validation, useFormValidation, Rules } from './FormValidation'

export interface Form<T> {
  data: Data<T>
  validation?: Validation
  init(): void
  update<K extends keyof T>(model: K, value: any): void
}

export type Data<T extends Record<string, any>> = UnwrapRef<T>

export interface UseFormOptions<T extends Record<string, any>> {
  data: T | (() => T)
  rules?: Rules
}

export type UpdateFunction = (model: string, value: any) => void

export function useData<T extends Record<string, any>>(data: T): UnwrapRef<T> {
  return reactive(data)
}

function getData<T extends Record<string, any>>(data: T | (() => T)): T {
  return data instanceof Function ? data() : data
}

export function useForm<T extends Record<string, any>>(options: UseFormOptions<T>): Form<T> {
  const data = reactive(getData(options.data))
  const validation = options.rules ? useFormValidation(data, options.rules) : undefined // TODO ask better way.

  function init(): void {
    initData(data, getData(options.data) as any)
    validation?.$reset()
  }

  function update<K extends keyof T>(model: K, value: any): void {
    (options.data as any)[model] = value
  }

  function initData<T extends Record<string, any>>(data: T, source: T): void {
    Object.assign(data, source)
  }

  return {
    data,
    validation,
    init,
    update
  }
}

export * from './FormValidation'

export { useFormValidation as useValidation } from './FormValidation'
