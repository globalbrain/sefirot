import { useStore } from 'vuex'
import { useModalId } from './Modal'

export interface Dialog {
  open(dialog?: Options): Promise<any>
  close(): Promise<any>
}

export interface Options {
  type?: 'confirm' | 'loading'
  title?: string
  text?: string
  actions?: Action[]
}

export interface Action {
  type?: 'primary' | 'mute'
  label: string
  callback(): void
}

export function useDialog(): Dialog {
  const store = useStore()
  const id = useModalId()

  function open(options?: Options) {
    return store.dispatch('dialog/open', { ...options, id })
  }

  function close() {
    return store.dispatch('dialog/close', id)
  }

  return {
    open,
    close
  }
}
