import cloneDeep from 'lodash-es/cloneDeep'
import { Ref, reactive } from 'vue'
import { useSnackbars } from '../stores/Snackbars'
import { Validation, useValidation } from './Validation'

export interface Form<T extends Record<string, any>> {
  data: T
  validation: Ref<Validation<any, T>>
  init(): void
  reset(): void
  validate(): Promise<boolean>
  validateAndNotify(): Promise<boolean>
}

export interface UseFormOptions<T extends Record<string, any>> {
  data: T
  rules?: Record<string, any> | ((state: T) => Record<string, any>)
}

export function useForm<
  T extends Record<string, any>
>(options: UseFormOptions<T>): Form<T> {
  const snackbars = useSnackbars()

  const initialData = cloneDeep(options.data)

  const data = reactive(options.data)

  const rules = options.rules
    ? typeof options.rules === 'function' ? options.rules(data) : options.rules
    : {}

  const validation = useValidation(data, rules)

  function init(): void {
    Object.assign(data, initialData)
    reset()
  }

  function reset(): void {
    validation.value.$reset()
  }

  function validate(): Promise<boolean> {
    return validation.value.$validate()
  }

  async function validateAndNotify(): Promise<boolean> {
    const valid = await validate()

    if (!valid) {
      snackbars.push({
        mode: 'danger',
        text: 'Form contains errors. Please correct them and try again.'
      })
    }

    return valid
  }

  return {
    data,
    init,
    reset,
    validation,
    validate,
    validateAndNotify
  }
}
