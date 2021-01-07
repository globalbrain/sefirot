import { ref, computed, toRefs, Ref } from '@vue/composition-api'
import { Rule } from './rules'

export interface Validation {
  _isValidation: boolean
  $data: Ref<any>
  $initData: any
  $isDirty: Ref<boolean>
  $isValid: Ref<boolean>
  $errors: Ref<readonly Error[]>
  $touch: () => void
  $reset: () => void
  $init: () => void
  $validate: () => boolean
  [name: string]: MaybeValidation
}

export type Data = Record<string, any>
export type Rules = Record<string, Rule[] | Record<string, any>>
export type InitData = any
export type Error = [string, string]
export type MaybeValidation = any | boolean | Ref<boolean> | Ref<readonly Error[]> | Function | Validation

export function createValidation(data: Data, rules: Rules, rootData?: Data): Validation {
  const validation = createInitialValidation()
  setNestedValidations(validation, data, rootData ?? data, rules)
  setValidation(validation)
  return validation
}

function createInitialValidation(): Validation {
  return {
    _isValidation: true,
    $data: ref(null),
    $initData: null,
    $isDirty: ref(false),
    $isValid: ref(false),
    $errors: ref([]),
    $touch: () => {},
    $reset: () => {},
    $init: () => {},
    $validate: () => false
  }
}

function createNestedValidation(name: string, data: Data, rootData: Data, validators: Rule[]): Validation {
  const initData = data[name]
  const dataRef = toRefs(data)[name]

  const isDirty = ref(false)

  const errors = computed(() => {
    return validators.reduce<Error[]>((errors, validator) => {
      const d = data[name]

      if (validator.optional && (d === undefined || d === null || d === '')) {
        return errors
      }

      if (!validator.validate(d, rootData)) {
        errors.push([validator.name, validator.message])
      }

      return errors
    }, [])
  })

  const isValid = computed(() => errors.value.length === 0)

  const touch = () => { isDirty.value = true }
  const reset = () => { isDirty.value = false }

  const init = () => {
    reset()
    dataRef.value = initData
  }

  const validate = () => {
    touch()
    return isValid.value
  }

  return {
    _isValidation: true,
    $data: dataRef,
    $initData: initData,
    $isDirty: isDirty,
    $errors: errors,
    $isValid: isValid,
    $touch: touch,
    $reset: reset,
    $init: init,
    $validate: validate
  }
}

function setValidation(validation: Validation): void {
  const isDirty = computed(() => {
    return Object.keys(validation).every((field) => {
      const v = validation[field]
      return isValidation(v) ? v.$isDirty.value : true
    }, [])
  })

  const errors = computed(() => {
    return Object.keys(validation).reduce<Error[]>((errors, field) => {
      const v = validation[field]
      return isValidation(v) ? errors.concat(v.$errors.value) : errors
    }, [])
  })

  const isValid = computed(() => errors.value.length === 0)

  const touch = () => { callAll(validation, 'touch') }
  const reset = () => { callAll(validation, 'reset') }
  const init = () => { callAll(validation, 'init') }

  const validate = () => {
    touch()
    return isValid.value
  }

  validation.$isDirty = isDirty
  validation.$errors = errors
  validation.$isValid = isValid
  validation.$touch = touch
  validation.$reset = reset
  validation.$init = init
  validation.$validate = validate
}

function setNestedValidations(validation: Validation, data: Data, rootData: Data, rules: Rules): void {
  for (const name in rules) {
    const validators = rules[name]

    validation[name] = Array.isArray(validators)
      ? createNestedValidation(name, data, rootData, validators)
      : createValidation(data[name], validators, rootData)
  }
}

function callAll(validation: Validation, method: 'touch' | 'reset' | 'init'): void {
  for (const field in validation) {
    const v = validation[field]
    isValidation(v) && v[`$${method}`]()
  }
}

function isValidation(value: MaybeValidation): value is Validation {
  return value !== null && typeof value === 'object' && !Array.isArray(value) && value._isValidation
}
