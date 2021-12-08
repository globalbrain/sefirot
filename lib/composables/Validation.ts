import { Ref, ToRefs } from 'vue'
import useVuelidate, {
  Validation,
  ValidationArgs,
  GlobalConfig,
  ExtractState,
  ErrorObject
} from '@vuelidate/core'

export type { Validation, ValidationArgs, GlobalConfig, ExtractState }

export interface Validatable {
  readonly $dirty: boolean
  readonly $errors: ErrorObject[]
  readonly $invalid: boolean
  readonly $touch: () => void
}

export function useValidation<
  T extends ExtractState<A>,
  A extends ValidationArgs
>(
  state: T | Ref<T> | ToRefs<T>,
  rules: Ref<A> | A,
  config?: GlobalConfig
): Ref<Validation<A>> {
  return useVuelidate(rules, state, config)
}
