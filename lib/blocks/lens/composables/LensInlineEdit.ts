import { type InjectionKey, type Ref, inject, provide, ref } from 'vue'

/**
 * Tracks which inline editor is currently open within the providing scope, so
 * that opening one editor closes any other. The table provides an instance for
 * its cells (keyed `${recordId}:${fieldKey}`) and the record sheet provides
 * its own for its fields (keyed by field key) — the scopes are independent.
 */
export interface LensInlineEditContext {
  /** The key of the editor currently open, or null. */
  activeKey: Ref<string | null>

  /** Open the editor for the given key (closing any other). */
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
