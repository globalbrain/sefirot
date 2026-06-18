import { type InjectionKey, type Ref, inject, provide, ref } from 'vue'

/**
 * Tracks which table cell currently has its inline editor open, so that
 * opening one editor closes any other. The key is `${recordId}:${fieldKey}`.
 */
export interface LensInlineEditContext {
  /** The key of the cell currently being edited, or null. */
  activeKey: Ref<string | null>

  /** Open the editor for the given cell key (closing any other). */
  start: (key: string) => void

  /** Close the active editor. */
  stop: () => void
}

const LensInlineEditKey: InjectionKey<LensInlineEditContext> = Symbol('LensInlineEdit')

export function provideLensInlineEdit(): LensInlineEditContext {
  const activeKey = ref<string | null>(null)

  const ctx: LensInlineEditContext = {
    activeKey,
    start: (key) => { activeKey.value = key },
    stop: () => { activeKey.value = null }
  }

  provide(LensInlineEditKey, ctx)

  return ctx
}

export function useLensInlineEdit(): LensInlineEditContext | null {
  return inject(LensInlineEditKey, null)
}
