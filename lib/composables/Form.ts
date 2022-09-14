import cloneDeep from 'lodash-es/cloneDeep'
import { Ref, reactive } from 'vue'
import { useSnackbars } from '../stores/Snackbars'
import { Validation, ValidationArgs, useValidation } from './Validation'

export interface Form<
  D extends { [key in keyof A]: any },
  A extends ValidationArgs = ValidationArgs
> {
  data: D
  validation: Ref<Validation<A, D>>
  init(): void
  reset(): void
  validate(): Promise<boolean>
  validateAndNotify(): Promise<boolean>
}

export interface UseFormOptions<
  D extends { [key in keyof R]: any },
  R extends ValidationArgs
> {
  data: D
  rules?: Ref<R> | R
}

export function useForm<
  D extends { [key in keyof R]: any },
  R extends ValidationArgs = ValidationArgs
>(options: UseFormOptions<D, R>): Form<D, R> {
  const snackbars = useSnackbars()

  const initialData = cloneDeep(options.data)

  const data = reactive(options.data) as D

  const rules = options.rules ?? {} as R

  const validation = useValidation<D, R>(data, rules)

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
