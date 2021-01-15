import { reactive } from '@vue/composition-api'

export interface Data<T extends State> {
  data: T
  update: UpdateFunction
}

export type State = Record<string, any>
export type UpdateFunction = (model: string, value: any) => void

export function useFormData<T extends State>(data: T): Data<T> {
  const state = reactive(data)

  function update(model: string, value: any): void {
    updateData(state, model, value)
  }

  return {
    data: state as T,
    update
  }
}

function updateData<T extends State>(data: T, model: string, value: any): void {
  (data as any)[model] = value
}
