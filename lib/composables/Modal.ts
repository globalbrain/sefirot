import { Item } from '../store/modal'
import { useStore } from './Store'

interface Modal {
  open(item: Item): () => void
  close(): void
}

let modalUid = 0

export function useModal(): Modal {
  const store = useStore()
  const uid = useModalUid()

  function open(item: Omit<Item, 'uid'>) {
    store.dispatch('modal/open', { ...item, uid })

    return close
  }

  function close() {
    store.dispatch('modal/close', uid)
  }

  return { open, close }
}

export function useModalUid(): number {
  return ++modalUid
}
