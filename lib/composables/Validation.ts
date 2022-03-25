import { Ref, ToRefs } from 'vue'
import {
  Validation,
  ValidationArgs,
  GlobalConfig,
  ErrorObject,
  useVuelidate
} from '@vuelidate/core'

export type { Validation, ValidationArgs, GlobalConfig }

export interface Validatable {
  readonly $dirty: boolean
  readonly $errors: ErrorObject[]
  readonly $invalid: boolean
  readonly $touch: () => void
}

export function useValidation<
  T extends Object,
  A extends ValidationArgs<T> = ValidationArgs<T>,
>(
  state: T | Ref<T> | ToRefs<T>,
  rules: Ref<A> | A,
  config?: GlobalConfig
): Ref<Validation<A, T>> {
  return useVuelidate(rules, state, config)
}
