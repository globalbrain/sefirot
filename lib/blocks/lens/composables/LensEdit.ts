import { type InjectionKey, inject, provide } from 'vue'

/**
 * The edit context shared from `LensCatalog` down to the inline editable
 * cells and the record sheet via provide/inject. It carries the entity
 * identity plus the CRUD operations (which talk to the backend and patch
 * the catalog's in-memory records optimistically) and the sheet controls.
 */
export interface LensEditContext {
  /** Whether the catalog has editing enabled at all. */
  editable: boolean

  /** Whether new records may be created. */
  creatable: boolean

  /** Whether the given record may be edited, inline or in the sheet. */
  canEdit: (record: Record<string, any>) => boolean

  /** Whether the given record may be deleted from the sheet. */
  canDelete: (record: Record<string, any>) => boolean

  /** The entity key being edited (e.g. `topic`, `user`). */
  entity: string

  /** The record-identity field key (e.g. `id`). */
  indexField: string

  /** Resolve a record's identifier, unwrapping the id field's object shape. */
  resolveId: (record: Record<string, any>) => any

  /**
   * Apply a partial update to an existing record. Optimistic: patches the
   * record in memory immediately and persists in the background, so it returns
   * synchronously without waiting for the (potentially slow) write.
   */
  save: (record: Record<string, any>, values: Record<string, any>) => void

  /**
   * Create a new record. Blocking: resolves once the record is persisted and
   * the catalog has been refreshed with the canonical state.
   */
  create: (values: Record<string, any>) => Promise<Record<string, any>>

  /**
   * Delete a record. Optimistic: removes it from the catalog immediately and
   * persists in the background, so it returns synchronously.
   */
  remove: (record: Record<string, any>) => void

  /** Open the record sheet for an existing record (view + per-field edit). */
  openSheet: (record: Record<string, any>) => void

  /** Open the record sheet in create mode. */
  openCreate: () => void
}

const LensEditKey: InjectionKey<LensEditContext> = Symbol('LensEdit')

export function provideLensEdit(ctx: LensEditContext): void {
  provide(LensEditKey, ctx)
}

export function useLensEdit(): LensEditContext | null {
  return inject(LensEditKey, null)
}
