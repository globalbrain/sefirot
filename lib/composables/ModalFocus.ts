import { type Ref, watch } from 'vue'

// Per-document state allows nested dialogs without leaking between SSR requests.
const stacks = new WeakMap<Document, HTMLElement[]>()

function focusableElements(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(
    'a[href], area[href], button, input, select, textarea, iframe, summary, audio[controls], video[controls], [tabindex], [contenteditable="true"]'
  )).filter((el) => {
    if (el.tabIndex < 0 || el.matches(':disabled, [aria-disabled="true"]') || el.closest('[hidden], [inert]')) {
      return false
    }
    for (let node: HTMLElement | null = el; node; node = node.parentElement) {
      const style = getComputedStyle(node)
      if (style.display === 'none' || style.visibility === 'hidden') { return false }
    }
    return true
  }).sort((a, b) => (a.tabIndex || Infinity) - (b.tabIndex || Infinity))
}

export function useModalFocus(
  element: Ref<HTMLElement | null>,
  options: { initialFocus(): string | undefined; closable(): boolean; close(): void }
): void {
  watch(element, (root, _, onCleanup) => {
    if (!root) { return }
    const doc = root.ownerDocument
    const stack = stacks.get(doc) ?? []
    stacks.set(doc, stack)
    const previous = doc.activeElement instanceof HTMLElement ? doc.activeElement : null
    stack.push(root)

    function isTop() { return stack.at(-1) === root }
    function focusFirst() {
      const selector = options.initialFocus()
      const target = selector ? root!.querySelector<HTMLElement>(selector) : null
      const autofocus = root!.querySelector<HTMLElement>('[autofocus]')
      const first = target ?? autofocus
      first?.focus({ preventScroll: true })
      if (!root!.contains(doc.activeElement)) {
        ;(focusableElements(root!)[0] ?? root).focus({ preventScroll: true })
      }
    }

    function onFocus(event: FocusEvent) {
      if (isTop() && !root!.contains(event.target as Node)) { focusFirst() }
    }

    function onKeydown(event: KeyboardEvent) {
      if (!isTop() || event.defaultPrevented || event.isComposing) { return }
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopImmediatePropagation()
        if (options.closable()) { options.close() }
      } else if (event.key === 'Tab') {
        const elements = focusableElements(root!)
        const index = elements.indexOf(doc.activeElement as HTMLElement)
        if (!elements.length) {
          event.preventDefault()
          root!.focus()
        } else if (event.shiftKey ? index <= 0 : index === -1 || index === elements.length - 1) {
          event.preventDefault()
          elements[event.shiftKey ? elements.length - 1 : 0].focus()
        }
      }
    }

    doc.addEventListener('focusin', onFocus)
    // Bubble so a dropdown inside the dialog can consume Escape first.
    doc.addEventListener('keydown', onKeydown)
    focusFirst()

    onCleanup(() => {
      const wasTop = isTop()
      stack.splice(stack.indexOf(root), 1)
      doc.removeEventListener('focusin', onFocus)
      doc.removeEventListener('keydown', onKeydown)
      if (wasTop) {
        const parent = stack.at(-1)
        const target = previous?.isConnected && (!parent || parent.contains(previous)) ? previous : parent
        target?.focus({ preventScroll: true })
      }
    })
  }, { flush: 'post' })
}
