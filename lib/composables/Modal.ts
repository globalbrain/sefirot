import { Item } from '../store/modal'
import { useStore } from './Store'

interface UseModal {
  open(item: Item): () => void
  close(): void
}

export function useModal(): UseModal {
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

let modalUid = 0

export function useModalUid(): number {
  return ++modalUid
}
