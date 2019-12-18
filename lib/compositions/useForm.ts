import { ref, reactive, computed, isRef, Ref } from '@vue/composition-api'
import Rule from '../validation/rules/Rule'

export type Data = Record<string, any>
export type Rules = Record<string, Rule[]>

export interface FormDefinition {
  data: Data
  rules: Rules
}

export interface Validation {
  isValid: Ref<boolean>
  [name: string]: Ref<boolean> | Validation
}

function createValidation (data: Data, rules: Rules): Validation {
  const validation = createInitialValidation()

  generateValidations(validation, data, rules)
  setRootIsValidProperty(validation)

  return validation
}

function createInitialValidation (): Validation {
  return {
    isValid: ref(false)
  }
}

function generateValidations (validation: Validation, data: Data, rules: Rules): void {
  for (const name in rules) {
    const validators = rules[name]

    if (!Array.isArray(validators)) {
      validation[name] = createValidation(data[name], validators)
      continue
    }

    validation[name] = {
      isValid: computed(() => {
        return validators.every(validator => validator.validate(data[name]))
      })
    }
  }
}

function setRootIsValidProperty (validation: Validation): void {
  validation.isValid = computed(() => {
    return Object.keys(validation).every((field) => {
      const v = validation[field]
      return isRef(v) || v.isValid.value
    })
  })
}

export default function useForm (definition: FormDefinition) {
  const data = reactive(definition.data)
  const validation = createValidation(data, definition.rules)

  return {
    data,
    validation
  }
}
