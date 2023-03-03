import type { Ref } from 'vue'
import { computed } from 'vue'
import { useSnackbars } from '../stores/Snackbars'
import type { UseDataInput } from './Data'
import { useData } from './Data'
import type { Validation } from './Validation'
import { useValidation } from './Validation'

export interface Form<T extends Record<string, any>> {
  data: T
  validation: Ref<Validation<any, T>>
  init(): void
  reset(): void
  validate(): Promise<boolean>
  validateAndNotify(): Promise<boolean>
}

export interface UseFormOptions<T extends Record<string, any>> {
  data: UseDataInput<T>
  rules?: Record<string, any> | ((state: T) => Record<string, any>)
}

export function useForm<
  T extends Record<string, any>
>(options: UseFormOptions<T>): Form<T> {
  const snackbars = useSnackbars()

  const data = useData(options.data)

  const rules = computed(() => {
    return options.rules
      ? typeof options.rules === 'function' ? options.rules(data.state) : options.rules
      : {}
  })

  const validation = useValidation(data.state, rules)

  function init(): void {
    data.init()
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
    data: data.state,
    init,
    reset,
    validation,
    validate,
    validateAndNotify
  }
}
