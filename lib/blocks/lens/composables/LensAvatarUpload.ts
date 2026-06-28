import { type InjectionKey, inject, provide } from 'vue'

/**
 * Payload handed to the avatar upload handler when the user picks (or clears)
 * an avatar image inline, in the record sheet, or on the create form.
 */
export interface LensAvatarUploadPayload {
  /** The record's resolved id. `null` while creating (no record exists yet). */
  id: any

  /** The full record being edited, or `null` while creating. */
  record: Record<string, any> | null

  /** The avatar field's key (e.g. `avatar`). */
  field: string

  /** The picked image file, or `null` when the image is being removed. */
  file: File | null
}

/**
 * Persist an avatar image change for a Lens record and resolve to the new
 * image URL (or `null` when the image was removed).
 *
 * Avatars are stored out-of-band — a multipart upload the consuming app owns —
 * rather than through the Lens create/update write, because the value the form
 * holds is a raw `File` while the row renders a URL. So the catalog delegates
 * the actual persistence to this consumer-provided handler and only reflects
 * the resulting URL on the row. The handler should throw on failure; the caller
 * surfaces it and keeps the previous image.
 */
export type LensAvatarUploadHandler = (payload: LensAvatarUploadPayload) => Promise<string | null>

/**
 * The injected avatar-upload context. A thin accessor (rather than the bare
 * handler) so the handler can be read reactively — a catalog may resolve or
 * change its `avatar-upload` prop after mount.
 */
export interface LensAvatarUploadContext {
  readonly handler: LensAvatarUploadHandler | null
}

const LensAvatarUploadKey: InjectionKey<LensAvatarUploadContext> = Symbol('LensAvatarUpload')

export function provideLensAvatarUpload(ctx: LensAvatarUploadContext): void {
  provide(LensAvatarUploadKey, ctx)
}

export function useLensAvatarUpload(): LensAvatarUploadContext | null {
  return inject(LensAvatarUploadKey, null)
}
