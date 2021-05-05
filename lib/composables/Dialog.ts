import { Values } from '../types/Utils'
import { useStore } from './Store'
import { useModalUid } from './Modal'

export interface Dialog {
  open(dialog: DialogOptions): () => void
  close(): void
}

export interface DialogOptions {
  type?: DialogType
  title?: string
  text?: string
  actions?: Action[]
}

export interface Action {
  type?: 'primary' | 'mute'
  label: string
  callback(): void
}

export type DialogType = Values<typeof DialogTypes>

export const DialogTypes = {
  Confirm: 'confirm',
  Loading: 'loading'
} as const

export function useDialog(): Dialog {
  const store = useStore()
  const uid = useModalUid()

  function open(dialog: DialogOptions) {
    store.dispatch('dialog/open', { ...dialog, uid })

    return close
  }

  function close() {
    store.dispatch('dialog/close', uid)
  }

  return {
    open,
    close
  }
}
