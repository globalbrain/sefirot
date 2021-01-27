import { reactive } from '@vue/composition-api'

export interface Data<T extends State> {
  data: T
  init: InitFunction
  update: UpdateFunction
}

export type State = Record<string, any>
export type InitFunction = () => void
export type UpdateFunction = (model: string, value: any) => void

export function useFormData<T extends State>(data: T | (() => T)): Data<T> {
  const state = reactive(getData(data))

  function init(): void {
    initData(state, getData(data) as any)
  }

  function update(model: string, value: any): void {
    updateData(state, model, value)
  }

  return {
    data: state as T,
    init,
    update
  }
}

function getData<T extends State>(data: T | (() => T)): T {
  return data instanceof Function ? data() : data
}

function initData<T extends State>(data: T, source: T): void {
  Object.assign(data, source)
}

function updateData<T extends State>(data: T, model: string, value: any): void {
  (data as any)[model] = value
}
