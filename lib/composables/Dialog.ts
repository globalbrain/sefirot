import { Values } from '../types/Utils'
import { useStore } from './Store'
import { useModalUid } from './Modal'

export interface UseDialog {
  open(dialog: Dialog): () => void
  close(): void
}

export interface Dialog {
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

export function useDialog(): UseDialog {
  const store = useStore()
  const uid = useModalUid()

  function open(dialog: Dialog) {
    store.dispatch('dialog/open', { ...dialog, uid })

    return close
  }

  function close() {
    store.dispatch('dialog/close', uid)
  }

  return { open, close }
}
