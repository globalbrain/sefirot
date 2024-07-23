import {
  type Validation,
  type ValidationArgs,
  type GlobalConfig as VuelidateConfig,
  useVuelidate
} from '@vuelidate/core'
import { type MaybeRefOrGetter, type Ref, computed, toValue } from 'vue'
import { type Snackbar, useSnackbars } from '../stores/Snackbars'
import { useTrans } from './Lang'

export interface V<
  Data extends { [key in keyof Rules]: any },
  Rules extends ValidationArgs = ValidationArgs
> {
  validation: Ref<Validation<Rules, Data>>
  validate(): Promise<boolean>
  validateAndNotify(message?: Snackbar): Promise<boolean>
  notify(message?: Snackbar): void
  reset(): void
}

export interface Validatable {
  readonly $dirty: boolean
  readonly $invalid: boolean
  readonly $errors: ValidatableError[]
  readonly $touch: () => void
}

export interface ValidatableError {
  readonly $message: string | Ref<string>
}

export interface VNotification {
  notify(message?: Snackbar): void
}

export function useValidation<
  Data extends { [key in keyof Rules]: any },
  Rules extends ValidationArgs = ValidationArgs
>(
  data?: MaybeRefOrGetter<Data>,
  rules?: MaybeRefOrGetter<Rules>,
  config?: VuelidateConfig
): V<Data, Rules> {
  const { notify } = useVNotification()

  const d = computed(() => toValue(data) ?? {})
  const r = computed(() => toValue(rules) ?? {})

  const validation = useVuelidate(r, d, config) as any

  function reset(): void {
    validation.value.$reset()
  }

  function validate(): Promise<boolean> {
    return validation.value.$validate()
  }

  async function validateAndNotify(message?: Snackbar): Promise<boolean> {
    const valid = await validate()

    if (!valid) {
      notify(message)
    }

    return valid
  }

  return {
    validation,
    validate,
    validateAndNotify,
    notify,
    reset
  }
}

export function useVNotification(): VNotification {
  const { t } = useTrans({
    en: { notify: 'Form contains errors. Please correct them and try again.' },
    ja: { notify: 'フォームにエラーがあります。内容を確認し、再度お試しください。' }
  })

  const snackbars = useSnackbars()

  function notify(message?: Snackbar): void {
    snackbars.push(message ?? {
      mode: 'danger',
      text: t.notify
    })
  }

  return {
    notify
  }
}
