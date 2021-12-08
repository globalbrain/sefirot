import { ref, watch } from 'vue'

export function useFlyout() {
  const container = ref<any>(null)

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
    if (!container.value.contains(event.target) && isVisible(container.value)) {
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
    container,
    isOpen,
    open,
    close,
    toggle
  }
}
