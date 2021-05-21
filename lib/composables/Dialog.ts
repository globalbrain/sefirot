import { Values } from '../types/Utils'
import { useStore } from './Store'
import { useModalUid } from './Modal'

export interface Dialog {
  open(dialog?: DialogOptions): Promise<any>
  close(): Promise<any>
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

  function open(dialog?: DialogOptions) {
    return store.dispatch('dialog/open', { ...dialog, uid })
  }

  function close() {
    return store.dispatch('dialog/close', uid)
  }

  return {
    open,
    close
  }
}
