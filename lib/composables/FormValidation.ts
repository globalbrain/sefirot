import { Ref, ComputedRef, ref, computed } from '@vue/composition-api'
import { required } from '../validation/validators'
import { Rule } from '../validation/rules'
import { State } from './FormData'

export interface Validation {
  $isValidation: boolean
  $isDirty: Ref<boolean> | ComputedRef<boolean>
  $isValid: ComputedRef<boolean>
  $errors: ComputedRef<Error[]>
  $touch (): void
  $reset (): void
  $validate (): boolean
  [key: string]: any
}

export type Rules = NestedRules | Validators

export interface NestedRules {
  [key: string]: Rules | any
}

export interface Validators {
  [key: string]: Rule[]
}

export type Error = [string, string]

export function useFormValidation<T extends State>(data: T, rules: Rules, rootData?: T): Validation {
  const validation = {} as Validation

  setValidations(validation, data, rules, rootData ?? data)

  setupValidation(validation)

  return validation
}

function setValidations<T extends State>(validation: Validation, data: T, rules: Rules, rootData: T): void {
  for (const name in rules) {
    const rule = rules[name]

    if (isValidation(rule)) {
      validation[name] = rule
      continue
    }

    if (Array.isArray(rule)) {
      validation[name] = createValidation(name, data, rule, rootData)
      continue
    }

    validation[name] = useFormValidation(data[name], rule, rootData)
  }
}

function createValidation<T extends State>(name: string, data: T, rules: Rule[], rootData: T): Validation {
  const isDirty = ref(false)
  const isValid = computed(() => errors.value.length === 0)
  const errors = computed(() => getErrors(name, data, rules, rootData))

  function touch(): void {
    isDirty.value = true
  }

  function reset(): void {
    isDirty.value = false
  }

  function validate(): boolean {
    touch()
    return isValid.value
  }

  return {
    $isValidation: true,
    $isDirty: isDirty,
    $isValid: isValid,
    $errors: errors,
    $touch: touch,
    $reset: reset,
    $validate: validate
  }
}

function setupValidation(validation: Validation): void {
  const isDirty = computed(() => {
    return Object.keys(validation).every((field) => {
      const v = validation[field]

      return isValidation(v) ? v.$isDirty.value : true
    })
  })

  const isValid = computed(() => errors.value.length === 0)

  const errors = computed(() => {
    return Object.keys(validation).reduce<Error[]>((errors, field) => {
      const v = validation[field]
      return isValidation(v) ? errors.concat(v.$errors.value) : errors
    }, [])
  })

  function touch(): void {
    callAll(validation, 'touch')
  }

  function reset(): void {
    callAll(validation, 'reset')
  }

  const validate = () => {
    touch()
    return isValid.value
  }

  validation.$isValidation = true
  validation.$isDirty = isDirty
  validation.$errors = errors
  validation.$isValid = isValid
  validation.$touch = touch
  validation.$reset = reset
  validation.$validate = validate
}

function getErrors<T extends State>(name: string, data: T, rules: Rule[], rootData: T): Error[] {
  return rules.reduce<Error[]>((errors, rule) => {
    const value = data[name]

    if (rule.optional && !required(value)) {
      return errors
    }

    if (!rule.validate(value, rootData)) {
      errors.push([rule.name, rule.message])
    }

    return errors
  }, [])
}

function callAll(validation: Validation, method: 'touch' | 'reset'): void {
  for (const field in validation) {
    const v = validation[field]
    isValidation(v) && v[`$${method}`]()
  }
}

function isValidation(obj: any): obj is Validation {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj) && !!obj.$isValidation
}
