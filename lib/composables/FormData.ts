import { reactive } from '@vue/composition-api'

export type Data = Record<string, any>

export function useFormData <T extends Data> (data: T) {
  const wrapped = reactive(data)

  return {
    data: wrapped
  }
}
