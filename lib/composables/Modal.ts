import { useStore } from 'vuex'
import { Options as ModalOptions } from '../store/modal'

export interface Modal {
  open(item?: OpenOptions): Promise<any>
  close(): Promise<any>
}

export interface OpenOptions {
  id?: number
  component?: any
  data?: Record<string, any>
  options?: ModalOptions
}

let modalUid = 0

export function useModal(component: any): Modal {
  const store = useStore()
  const id = useModalId()

  function open(item: OpenOptions = {}) {
    return store.dispatch('modal/open', {
      id,
      component,
      ...item
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
  return ++modalUid
}
