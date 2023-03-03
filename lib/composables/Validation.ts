import type {
  GlobalConfig,
  Validation,
  ValidationArgs
} from '@vuelidate/core'
import {
  useVuelidate
} from '@vuelidate/core'
import type { Ref, ToRefs } from 'vue'

export type { Validation, ValidationArgs, GlobalConfig }

export interface Validatable {
  readonly $dirty: boolean
  readonly $invalid: boolean
  readonly $errors: ValidatableError[]
  readonly $touch: () => void
}

export interface ValidatableError {
  readonly $message: string | Ref<string>
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
