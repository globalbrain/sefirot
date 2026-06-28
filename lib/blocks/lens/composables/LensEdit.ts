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
   * Persist an avatar image for a record out-of-band — via the catalog's
   * `avatar-upload` handler — and reflect the resulting URL on the row. The
   * value the Lens create/update write doesn't carry (it's a `File` on edit, a
   * URL on read), so it's uploaded separately and only the URL is patched onto
   * the shared record object. Accounted for like a write: the query controls
   * lock while it's in flight and a reconcile resyncs once it settles, so a
   * concurrent refetch can't land stale rows over it. Patches the `record`
   * passed at call time. Resolves to the new URL (or null when removed / no
   * handler is wired); rejects if the handler throws.
   */
  uploadAvatar: (record: Record<string, any>, field: string, file: File | null) => Promise<string | null>

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

  /**
   * Re-run the current query against the server, preserving the catalog's
   * in-memory state. Used to reflect an out-of-band change (e.g. an avatar
   * uploaded through the consumer's handler, which the Lens write doesn't
   * carry) once it has settled. No-ops while a write or create is in flight.
   */
  refresh: () => Promise<void>
}

const LensEditKey: InjectionKey<LensEditContext> = Symbol('LensEdit')

export function provideLensEdit(ctx: LensEditContext): void {
  provide(LensEditKey, ctx)
}

export function useLensEdit(): LensEditContext | null {
  return inject(LensEditKey, null)
}
