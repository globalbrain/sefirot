import { ref, reactive, computed, isRef, Ref } from '@vue/composition-api'
import { Rule } from '../validation/rules'

export type Data = Record<string, any>
export type Rules = Record<string, Rule[]>

export interface FormDefinition {
  data: Data
  rules: Rules
}

export type Error = [string, string]

export interface Validation {
  isDirty: Ref<boolean>
  isValid: Ref<boolean>
  errors: Ref<readonly Error[]>
  [name: string]: Ref<boolean> | Ref<readonly Error[]> | Validation
}

function createValidation (data: Data, rules: Rules): Validation {
  const validation = createInitialValidation()
  setNestedValidations(validation, data, rules)
  setValidation(validation)
  return validation
}

function createInitialValidation (): Validation {
  return {
    isDirty: ref(false),
    isValid: ref(false),
    errors: ref([])
  }
}

function setValidation (validation: Validation): void {
  const isDirty = computed(() => {
    return Object.keys(validation).every((field) => {
      const v = validation[field]
      return isRef(v) || v.isDirty.value
    }, [])
  })

  const errors = computed(() => {
    return Object.keys(validation).reduce<Error[]>((errors, field) => {
      const v = validation[field]
      return isRef(v) ? errors : errors.concat(v.errors.value)
    }, [])
  })

  const isValid = computed(() => errors.value.length === 0)

  validation.isDirty = isDirty
  validation.errors = errors
  validation.isValid = isValid
}

function setNestedValidations (validation: Validation, data: Data, rules: Rules): void {
  for (const name in rules) {
    const validators = rules[name]

    if (!Array.isArray(validators)) {
      validation[name] = createValidation(data[name], validators)
      continue
    }

    const isDirty = ref(false)

    const errors = computed(() => {
      return validators.reduce<Error[]>((errors, validator) => {
        if (!validator.validate(data[name], data)) {
          errors.push([validator.name, validator.message])
        }

        return errors
      }, [])
    })

    const isValid = computed(() => errors.value.length === 0)

    validation[name] = { isDirty, errors, isValid }
  }
}

export default function useForm (definition: FormDefinition) {
  const data = reactive(definition.data)
  const validation = createValidation(data, definition.rules)

  return {
    data,
    validation
  }
}
