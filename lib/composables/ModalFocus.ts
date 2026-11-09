import { createFocusTrap } from 'focus-trap'
import { type Ref, watch } from 'vue'

/** Focus management is separate from modal layout and enabled per dialog. */
export function useModalFocus(
  element: Ref<HTMLElement | null>,
  options: {
    initialFocus(): string | undefined
    containers(): (HTMLElement | null | undefined)[]
    closable(): boolean
    close(): void
  }
): void {
  watch(element, (root, _, onCleanup) => {
    if (!root) { return }
    const doc = root.ownerDocument
    const containers = () => [root, ...options.containers().filter((el): el is HTMLElement => !!el && el.isConnected && !root.contains(el))]
    const trap = createFocusTrap(containers(), {
      document: doc,
      isolateSubtrees: 'inert',
      initialFocus: () => {
        const selector = options.initialFocus()
        return selector ? root.querySelector<HTMLElement>(selector) ?? undefined : undefined
      },
      fallbackFocus: root,
      delayInitialFocus: false,
      delayReturnFocus: false,
      // SModal emits close; its controlled `open` prop decides when to deactivate.
      escapeDeactivates: false,
      setReturnFocus: (previous) => previous.isConnected ? previous : false
    })

    function onKeydown(event: KeyboardEvent) {
      if (!trap.active || trap.paused || event.defaultPrevented || event.isComposing || event.key !== 'Escape') { return }
      event.preventDefault()
      event.stopImmediatePropagation()
      if (options.closable()) { options.close() }
    }

    trap.activate()
    // Bubble so an inner dropdown can consume Escape before the dialog.
    doc.addEventListener('keydown', onKeydown)
    const stop = watch(() => options.containers().slice(), () => {
      trap.updateContainerElements(containers())
    }, { flush: 'post' })

    onCleanup(() => {
      stop()
      doc.removeEventListener('keydown', onKeydown)
      trap.deactivate()
    })
  }, { flush: 'post' })
}
