import { reactive, markRaw } from '@vue/composition-api'
import { createValidation, Data, Rules } from '../validation/Validation'

export interface FormDefinition {
  data: Data
  rules: Rules
}

export default function useForm(definition: FormDefinition) {
  const data = reactive(definition.data)
  const validation = markRaw(createValidation(data, definition.rules))

  return {
    data,
    validation
  }
}
