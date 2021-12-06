import { Ref, ToRefs, reactive, computed } from 'vue'
import { cloneDeep } from '../support/Utils'
import { useSnackbar } from './Snackbar'
import { Validation, ExtractState, ValidationArgs, useValidation } from './Validation'

export interface Form<D, V extends ValidationArgs> {
  data: D
  validation: Ref<Validation<V>>
  init(): void
  reset(): void
  validate(): Promise<boolean>
  validateAndNotify(): Promise<boolean>
}

export interface UseFormOptions<
  D extends ExtractState<V>,
  V extends ValidationArgs
> {
  data: D
  rules?: Ref<V> | V
}

export function useForm<D extends ExtractState<V>, V extends ValidationArgs>(
  options: UseFormOptions<D, V>
): Form<D, V> {
  const snackbar = useSnackbar()

  const initialData = cloneDeep(options.data)

  const data = reactive(options.data) as D

  const rules = options.rules ?? {} as V

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
