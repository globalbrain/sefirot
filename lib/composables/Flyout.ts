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

  function closeOnClickOutside(event: any) {
    if (!el.value?.contains(event.target) && isVisible(el.value)) {
      isOpen.value = false
    }
  }

  function isVisible(el: any) {
    return !!el && !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
  }

  watch(isOpen, (value) => {
    if (value) {
      document.addEventListener('click', closeOnClickOutside)
      return
    }

    document.removeEventListener('click', closeOnClickOutside)
  })

  return {
    container: el,
    isOpen,
    open,
    close,
    toggle
  }
}
