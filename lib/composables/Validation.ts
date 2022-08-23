import {
  Validation,
  ValidationArgs,
  GlobalConfig,
  ErrorObject,
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

export interface ValidationNotification {
  notify(): Promise<boolean>
}

export function useValidation<
  T extends { [key in keyof A]: any },
  A extends ValidationArgs = ValidationArgs,
>(
  state: T | Ref<T> | ToRefs<T>,
  rules: Ref<A> | A,
  config?: GlobalConfig
): Ref<Validation<A, T>> {
  return useVuelidate(rules, state, config)
}
