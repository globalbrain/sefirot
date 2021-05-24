import { Item } from '../store/modal'
import { useStore } from './Store'

export interface Modal {
  open(item: Omit<Item, 'uid'>): Promise<any>
  close(): Promise<any>
}

let modalUid = 0

export function useModal(): Modal {
  const store = useStore()
  const uid = useModalUid()

  function open(item: Omit<Item, 'uid'>) {
    return store.dispatch('modal/open', { ...item, uid })
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
