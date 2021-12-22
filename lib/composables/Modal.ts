import { useStore } from 'vuex'

export interface Modal {
  open(data?: Record<string, any>): Promise<any>
  close(): Promise<any>
}

let modalId = 0

export function useModal(component: any): Modal {
  const store = useStore()
  const id = useModalId()

  function open(data: Record<string, any> = {}): Promise<any> {
    return store.dispatch('modal/open', {
      id,
      component,
      data
    })
  }

  function close() {
    return store.dispatch('modal/close', id)
  }

  return {
    open,
    close
  }
}

export function useModalId(): number {
  return ++modalId
}
