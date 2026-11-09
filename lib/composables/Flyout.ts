import { type Ref, ref, watch } from 'vue'

export function useFlyout(container?: Ref<any>) {
  const el = container ?? ref<any>(null)

  const isOpen = ref(false)

  function open(): void {
    isOpen.value = true
  }

  function close(): void {
    isOpen.value = false
  }

  function toggle(): void {
    isOpen.value ? close() : open()
  }

  function onEscape(event: KeyboardEvent) {
    if (event.key !== 'Escape' || event.defaultPrevented || event.isComposing) { return }
    event.preventDefault()
    event.stopPropagation()
    close()
    el.value?.querySelector('button, [role="button"]')?.focus()
  }

  function closeOnClickOutside(event: any) {
    if (!el.value?.contains(event.target) && isVisible(el.value)) {
      isOpen.value = false
    }
  }

  function isVisible(el: any) {
    return !!el && !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
  }

  watch([el, isOpen], ([container, opened], _, onCleanup) => {
    if (!container || !opened) { return }
    const doc = container.ownerDocument as Document
    doc.addEventListener('click', closeOnClickOutside)
    container.addEventListener('keydown', onEscape)
    onCleanup(() => {
      doc.removeEventListener('click', closeOnClickOutside)
      container.removeEventListener('keydown', onEscape)
    })
  }, { flush: 'post' })

  return {
    container: el,
    isOpen,
    open,
    close,
    toggle
  }
}
