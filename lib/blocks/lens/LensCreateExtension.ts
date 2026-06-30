/**
 * A create-form extension contributed by a sheet slot (`#before` / `#after`).
 *
 * The catalog's create form builds its payload from the entity's own Lens
 * fields. A page may need to create related data that isn't a Lens field (e.g. a
 * collaborator's social links, written server-side alongside the record). Such a
 * slot registers an extension via the `registerCreateExtension` slot prop: on
 * submit the sheet runs every registered extension to validate the slot's own
 * inputs and merge its extra keys into the create payload.
 */
export interface LensCreateContribution {
  /**
   * Whether the slot's own inputs passed validation. When any registered
   * extension reports `false`, the create is aborted (the sheet stays open so
   * each slot can show its own errors).
   */
  valid: boolean

  /**
   * Extra key/value pairs merged into the create payload (e.g.
   * `{ social_links: [...] }`). Ignored when `valid` is `false`.
   */
  values: Record<string, any>
}

/**
 * A function the sheet calls on create-submit. It validates the slot's inputs
 * and returns its contribution; it may be async (validation usually is). It
 * should report `valid: false` rather than throw — a throw propagates to the
 * sheet's submit handler as an unexpected error.
 */
export type LensCreateExtension = () =>
  | LensCreateContribution
  | Promise<LensCreateContribution>

/**
 * Register a {@link LensCreateExtension} with the sheet's create form. Returns a
 * disposer that unregisters it — call it on unmount (the create slot content
 * unmounts with the sheet, so a component-lifecycle cleanup suffices).
 */
export type RegisterLensCreateExtension = (
  extension: LensCreateExtension
) => () => void
