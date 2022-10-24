import {
  ErrorObject,
  GlobalConfig,
  Validation,
  ValidationArgs,
  useVuelidate
} from '@vuelidate/core'
import { Ref, ToRefs } from 'vue'

export type { Validation, ValidationArgs, GlobalConfig }

export interface Validatable {
  readonly $dirty: boolean
  readonly $errors: ErrorObject[]
  readonly $invalid: boolean
  readonly $touch: () => void
}

export function useValidation<
  T extends { [key in keyof R]: any },
  R extends ValidationArgs = ValidationArgs
>(
  state: T | Ref<T> | ToRefs<T>,
  rules: Ref<R> | R,
  config?: GlobalConfig
): Ref<Validation<R, T>> {
  return useVuelidate(rules, state, config)
}
