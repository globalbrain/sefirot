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
