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

  /** The entity key being edited (e.g. `topic`, `user`). */
  entity: string

  /** The record-identity field key (e.g. `id`). */
  indexField: string

  /** Resolve a record's identifier, unwrapping the id field's object shape. */
  resolveId: (record: Record<string, any>) => any

  /**
   * Persist a partial update for an existing record and patch it in place.
   * Resolves once the row reflects the server's re-serialized values.
   */
  save: (record: Record<string, any>, values: Record<string, any>) => Promise<void>

  /** Create a new record and prepend it to the catalog. */
  create: (values: Record<string, any>) => Promise<Record<string, any>>

  /** Delete a record and remove it from the catalog. */
  remove: (record: Record<string, any>) => Promise<void>

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
