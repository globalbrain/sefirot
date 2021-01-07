import { ref } from '@vue/composition-api'

export function useMenu () {
  const container = ref<any>(null)

  const isOpen = ref(false)

  function open (): void {
    isOpen.value = true
    document.addEventListener('click', closeOnClickOutside)
  }

  function close (): void {
    isOpen.value = false
    document.removeEventListener('click', closeOnClickOutside)
  }

  function toggle (): void {
    isOpen.value ? close() : open()
  }

  function closeOnClickOutside (event: any) {
    if (!container.value.contains(event.target) && isVisible(container.value)) {
      isOpen.value = false
    }
  }

  function isVisible (el: any) {
    return !!el && !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
  }

  return {
    container,
    isOpen,
    open,
    close,
    toggle
  }
}
