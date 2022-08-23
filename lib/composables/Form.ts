import { Ref, reactive } from 'vue'
import { cloneDeep } from '../support/Utils'
import { useSnackbar } from './Snackbar'
import { Validation, useValidation } from './Validation'

export interface Form<D> {
  data: D
  validation: Ref<Validation>
  init(): void
  reset(): void
  validate(): Promise<boolean>
  validateAndNotify(): Promise<boolean>
}

export interface UseFormOptions<D> {
  data: D
  rules?: Ref<any> | any
}

export function useForm<D>(options: UseFormOptions<D>): Form<D> {
  const snackbar = useSnackbar()

  const initialData = cloneDeep(options.data)

  const data = reactive(options.data as any)

  const rules = options.rules ?? {}

  const validation = useValidation(data, rules as any)

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
    const result = await validate()

    if (!result) {
      snackbar.push({
        text: 'Form contains errors. Please correct them and try again.'
      })
    }

    return result
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
