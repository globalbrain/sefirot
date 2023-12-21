/**
 * @deprecated Use `composables/D` and `composables/V` modules instead.
 */

import { type Ref, computed, reactive, toRefs } from 'vue'
import { type Snackbar, useSnackbars } from '../stores/Snackbars'
import { type UseDataInput, useData } from './Data'
import { type Validation, useValidation } from './Validation'

export interface Form<T extends Record<string, any>> {
  data: T
  validation: Ref<Validation<any, T>>
  init(): void
  reset(): void
  validate(): Promise<boolean>
  validateAndNotify(message?: Snackbar): Promise<boolean>
}

export type ComputedData<T extends Record<string, () => any>> = {
  [K in keyof T]: ReturnType<T[K]>
}

export type AllData<
  D extends Record<string, any>,
  C extends Record<string, () => any>
> = D & ComputedData<C>

export interface UseFormOptions<
  D extends Record<string, any>,
  C extends Record<string, () => any>
> {
  data: UseDataInput<D>
  computed?: (data: D) => C
  rules?: Record<string, any> | ((data: AllData<D, C>) => Record<string, any>)
}

export function useForm<
  D extends Record<string, any> = Record<string, any>,
  C extends Record<string, () => any> = Record<string, () => any>
>(options: UseFormOptions<D, C>): Form<AllData<D, C>> {
  const snackbars = useSnackbars()

  const data = useData(options.data)
  const dataStateRef = toRefs(data.state)

  const computedData = options.computed
    ? createComputedData(options.computed(data.state))
    : {}

  const allData = reactive({
    ...dataStateRef,
    ...computedData
  }) as AllData<D, C>

  const rules = computed(() => {
    return options.rules
      ? typeof options.rules === 'function' ? options.rules(allData) : options.rules
      : {}
  })

  const validation = useValidation(allData, rules)

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

  async function validateAndNotify(message?: Snackbar): Promise<boolean> {
    const valid = await validate()

    if (!valid) {
      snackbars.push(message ?? {
        mode: 'danger',
        text: 'Form contains errors. Please correct them and try again.'
      })
    }

    return valid
  }

  return {
    data: allData,
    init,
    reset,
    validation,
    validate,
    validateAndNotify
  }
}

function createComputedData<
  C extends Record<string, () => any>
>(input: C): ComputedData<C> {
  const computedData = {} as any

  for (const [key, fn] of Object.entries(input)) {
    computedData[key] = computed(() => fn())
  }

  return computedData
}
