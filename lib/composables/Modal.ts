import { Item, Options as ModalOptions } from '../store/modal'
import { useStore } from './Store'

export interface Modal {
  open(item?: OpenOptions): Promise<any>
  close(): Promise<any>
}

export interface OpenOptions {
  component?: any
  uid?: number
  data?: Record<string, any>
  options?: ModalOptions
}

let modalUid = 0

export function useModal(component?: any): Modal {
  const store = useStore()
  const uid = useModalUid()

  function open(item: OpenOptions = {}) {
    return store.dispatch('modal/open', {
      ...item,
      component,
      uid
    })
  }

  function close() {
    return store.dispatch('modal/close', uid)
  }

  return {
    open,
    close
  }
}

export function useModalUid(): number {
  return ++modalUid
}
