import { UnwrapRef, reactive } from '@vue/composition-api'
import { Validation, Rules, useFormValidation } from './FormValidation'

export * from './FormValidation'

export interface Form<T extends Record<string, any>> {
  data: Data<T>
  validation?: Validation
  init(): void
  update: UpdateFunction<T>
}

export type Data<T extends Record<string, any>> = UnwrapRef<T>

export type UpdateFunction<
  T extends Record<string, any>
> = (model: keyof Data<T>, value: any) => void

export interface UseFormOptions<T extends Record<string, any>> {
  data: T | (() => T)
  rules?: Rules
}

export function useForm<T extends Record<string, any>>(options: UseFormOptions<T>): Form<T> {
  const initialData = getData(options.data)
  const rules = options.rules

  const data = reactive(initialData)
  const validation = rules ? useFormValidation(data, rules) : undefined

  function init(): void {
    Object.assign(data, initialData)
    validation?.$reset()
  }

  function update(model: keyof Data<T>, value: any): void {
    data[model] = value
  }

  return {
    data,
    validation,
    init,
    update
  }
}

function getData<T extends Record<string, any>>(data: T | (() => T)): T {
  return data instanceof Function ? data() : data
}
