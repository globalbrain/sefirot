import { createPopper } from '@popperjs/core'
import { type MaybeRefOrGetter, type Ref, toValue, watch } from 'vue'

/** Position an open dropdown from its measured size, including inside transformed containers. */
export function useDropdownPosition(
  anchor: Ref<HTMLElement | null | undefined>,
  floating: Ref<HTMLElement | null | undefined>,
  open: Ref<boolean>,
  options: {
    position?: MaybeRefOrGetter<'top' | 'bottom' | undefined>
    align?: MaybeRefOrGetter<'left' | 'right'>
  } = {}
): void {
  watch(
    [anchor, floating, open, () => toValue(options.position), () => toValue(options.align)],
    ([reference, element, opened, position, align], _, onCleanup) => {
      if (!reference || !element || !opened) { return }
      const win = element.ownerDocument.defaultView!
      const viewport = win.visualViewport
      const gutter = 12
      const properties = ['max-width', 'max-height', '--dropdown-max-width', '--dropdown-max-height']
      const previous = properties.map((name) => [name, element.style.getPropertyValue(name), element.style.getPropertyPriority(name)])

      function constrainSize() {
        const width = Math.max(0, (viewport?.width ?? win.innerWidth) - gutter * 2)
        const height = Math.max(0, (viewport?.height ?? win.innerHeight) - gutter * 2)
        element!.style.maxWidth = `${width}px`
        element!.style.maxHeight = `${height}px`
        element!.style.setProperty('--dropdown-max-width', `${width}px`)
        element!.style.setProperty('--dropdown-max-height', `${height}px`)
      }

      constrainSize()
      const popper = createPopper(reference, element, {
        strategy: 'fixed',
        placement: `${position ?? 'bottom'}-${align === 'right' ? 'end' : 'start'}`,
        modifiers: [
          { name: 'offset', options: { offset: [0, 8] } },
          { name: 'flip', enabled: !position, options: { padding: gutter } },
          { name: 'preventOverflow', options: { padding: gutter, altAxis: true, tether: false } },
          // Keep translation free for component enter/leave transitions.
          { name: 'computeStyles', options: { gpuAcceleration: false, adaptive: false } }
        ]
      })

      function update() {
        constrainSize()
        void popper.update()
      }

      const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update)
      observer?.observe(reference)
      observer?.observe(element)
      win.addEventListener('resize', update)
      viewport?.addEventListener('resize', update)
      viewport?.addEventListener('scroll', update)

      onCleanup(() => {
        observer?.disconnect()
        win.removeEventListener('resize', update)
        viewport?.removeEventListener('resize', update)
        viewport?.removeEventListener('scroll', update)
        // Vue can retain the popup for a leave transition after open becomes false.
        const leavingStyle = element.style.cssText
        popper.destroy()
        if (element.isConnected) {
          element.style.cssText = leavingStyle
        } else {
          for (const [name, value, priority] of previous) {
            element.style.setProperty(name, value, priority)
          }
        }
      })
    },
    { flush: 'post', immediate: true }
  )
}
