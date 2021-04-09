import { UnwrapRef, reactive } from '@vue/composition-api'
import { WithRequired } from '../types/Utils'
import { Validation, Rules, useFormValidation } from './FormValidation'

export * from './FormValidation'

export interface Form<T extends Record<string, any>> {
  data: Data<T>
  validation?: Validation
  init(): void
  update: UpdateFunction<T>
}

export interface UseFormOptions<T> {
  data: T | (() => T)
  rules?: Rules
}

export type UpdateFunction<T extends Record<string, any> = Record<string, any>> = (
  model: keyof Data<T>,
  value: any
) => void

export type FormValidation<T, U extends Form<T> = Form<T>> = WithRequired<U, 'validation'>

export type UseFormOptionsWithRules<T, U extends UseFormOptions<T> = UseFormOptions<T>> = WithRequired<U, 'rules'>

type Data<T> = UnwrapRef<T>

export function useForm<T extends Record<string, any>>(
  options: UseFormOptionsWithRules<T>
): FormValidation<T>

export function useForm<T extends Record<string, any>>(
  options: UseFormOptions<T>
): Form<T>

export function useForm<T extends Record<string, any>>(
  options: UseFormOptions<T> | UseFormOptionsWithRules<T>
): Form<T> | FormValidation<T> {
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
