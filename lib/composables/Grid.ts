import type { Ref } from 'vue'
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'

export interface Grid {
  container: Ref<HTMLElement | null>
}

export interface UseGridOptions {
  tag?: string
  class?: string
  type?: 'fill' | 'fit'
}

type CssStyles = Partial<Record<keyof CSSStyleDeclaration, string>>

export function useGrid(options: UseGridOptions): Grid {
  const container: Ref<HTMLElement | null> = ref(null)

  const spacerClass = options.class ? toClassName(options.class) : 'spacer'
  const spacerTag = options.tag ?? 'div'
  const type = options.type ?? 'fit'

  const observer = new MutationObserver((_, observer) => {
    observer.disconnect()

    adjustSpacer()

    observer.observe(container.value!, { childList: true })
  })

  watchEffect(() => {
    observer.disconnect()

    if (container.value) {
      adjustSpacer()
      observer.observe(container.value, { childList: true })
    }
  })

  onMounted(() => {
    window.addEventListener('resize', adjustSpacer)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', adjustSpacer)
  })

  function adjustSpacer() {
    container.value?.querySelectorAll(`${toClassSelector(spacerClass)}`)
      .forEach((n) => n.remove())

    const track = container.value?.firstElementChild

    const containerWidth = container.value?.clientWidth ?? 0
    const trackWidth = track?.clientWidth ?? 0
    const trackCount = container.value?.childElementCount ?? 0

    const perRow = trackWidth !== 0 ? Math.floor(containerWidth / trackWidth) : 0
    const mod = perRow !== 0 ? trackCount % perRow : 0
    const lack = mod !== 0 ? perRow - mod : 0

    const fragment = createSpacers(lack, spacerTag, spacerClass, type)

    container.value?.appendChild(fragment!)
  }

  return {
    container
  }
}

function toClassSelector(name: string) {
  return name.startsWith('.') ? name : `.${name}`
}

function toClassName(name: string) {
  return name.startsWith('.') ? name.slice(1) : name
}

function createSpacers(size: number, tag: string, classes: string, type: 'fill' | 'fit') {
  const fragment = document.createDocumentFragment()

  if (size === 0) {
    return fragment
  }

  if (type === 'fill') {
    const spacer = createSpacer(tag, classes, { gridColumn: `span ${size}` })

    fragment.appendChild(spacer)

    return fragment
  }

  if (type === 'fit') {
    for (let i = 0; i < size; i++) {
      fragment.appendChild(createSpacer(tag, classes))
    }
  }

  return fragment
}

function createSpacer(tag: string, classes?: string, styles?: CssStyles) {
  const spacer = document.createElement(tag)

  if (classes) {
    spacer.className = classes
  }

  if (styles) {
    for (const s in styles) {
      spacer.style[s] = styles[s]!
    }
  }

  return spacer
}
