/**
 * Whether the event target is a plain text-like `<input>` — the controls where
 * pressing Enter should submit an inline editor. Excludes textareas (Enter
 * inserts a newline) and richer controls that handle Enter themselves (e.g. a
 * dropdown that opens its menu on Enter), so a keyboard user isn't forced to
 * submit instead of operating the control.
 */
export function isTextLikeInput(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null

  if (!el || el.tagName !== 'INPUT') {
    return false
  }

  const type = (el as HTMLInputElement).type

  return ['text', 'search', 'url', 'email', 'tel', 'password', 'number'].includes(type)
}

/**
 * Whether an Enter keydown should submit an inline editor. Ctrl/Cmd+Enter
 * submits from any control — it's the near-universal "submit" gesture (GitHub,
 * Gmail, Slack, …) and never clashes with a textarea's newline or a control that
 * handles bare Enter itself (e.g. a dropdown opening its menu). Bare Enter
 * submits only from a plain text-like input (see {@link isTextLikeInput}).
 *
 * Shift+Enter is left for newlines, and Alt/Option+Enter has no consistent
 * submit meaning (Excel uses it for an in-cell newline), so neither submits.
 * The Enter that commits an IME composition (e.g. CJK input) never submits.
 */
export function isEditorSubmitKeydown(event: KeyboardEvent): boolean {
  if (event.key !== 'Enter') {
    return false
  }

  // Ignore the Enter that commits an IME composition (e.g. CJK input): it
  // confirms the candidate rather than submitting.
  if (event.isComposing) {
    return false
  }

  return event.ctrlKey || event.metaKey || isTextLikeInput(event.target)
}

/**
 * Whether a keydown should cancel an inline editor: Escape, except the Escape
 * that cancels an in-progress IME composition (which reverts the candidate and
 * should leave the editor open).
 */
export function isEditorCancelKeydown(event: KeyboardEvent): boolean {
  return event.key === 'Escape' && !event.isComposing
}

/**
 * Dispatch a keydown for an inline editor (opened from a cell or sheet field):
 * cancel on Escape, submit on Enter — using the IME- and modifier-aware rules
 * in {@link isEditorCancelKeydown} / {@link isEditorSubmitKeydown}.
 *
 * `shield` is for an editor nested in a surface that itself closes on Escape
 * (e.g. a sheet): Escape is always kept from propagating to that surface — even
 * the Escape that only cancels an IME composition (where the edit stays open) —
 * so the surface can't close underneath the editor.
 *
 * NOTE for future inline/sheet-editable fields: several field types currently
 * throw on `formInputComponent()` (not yet editable). When making one editable,
 * if its input is a composite control with its own nested text input (e.g. a
 * dropdown's search filter), that nested input must keep Enter/Escape from
 * bubbling to this handler — see `SDropdownSectionFilter` — otherwise typing a
 * value and pressing Enter would submit/cancel the whole editor.
 */
export function dispatchEditorKeydown(
  event: KeyboardEvent,
  handlers: { cancel: () => void; submit: () => void; shield?: boolean }
): void {
  if (event.key === 'Escape') {
    if (handlers.shield) {
      event.stopPropagation()
    }
    if (isEditorCancelKeydown(event)) {
      event.preventDefault()
      handlers.cancel()
    }
    return
  }

  if (isEditorSubmitKeydown(event)) {
    event.preventDefault()
    handlers.submit()
  }
}

/**
 * Focus the first focusable editor control (an input, textarea, contenteditable,
 * or any `[tabindex]`) inside the container — used to focus an inline editor when
 * it opens.
 *
 * Candidates inside `skip` (default `.actions`, the editor's action row) are
 * ignored, so focus never lands on a Cancel/Save button — those are `[tabindex]`
 * elements too — when the field input has no focusable control of its own (e.g.
 * a radio/checkbox group). In that case nothing is focused. Pass `skip: ''` to
 * disable.
 */
export function focusFirstEditable(container: HTMLElement | null, skip = '.actions'): void {
  const candidates = Array.from(
    container?.querySelectorAll<HTMLElement>('input, textarea, [contenteditable], [tabindex]') ?? []
  )

  candidates.find((el) => !skip || !el.closest(skip))?.focus()
}
