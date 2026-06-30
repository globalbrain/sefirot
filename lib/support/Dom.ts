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
