import { onMounted } from 'vue'

export interface Option {
  containerClass: string
  spacerClass?: string
  spacerTag?: string
  type?: 'fill' | 'fit'
}

export type CssStyles = Partial<Record<keyof CSSStyleDeclaration, string>>

export function useGrid(options: Option) {
  let container: Element | null

  const containerClass = toClassSelector(options.containerClass)
  const spacerClass = options.spacerClass ? toClassName(options.spacerClass) : 'spacer'
  const spacerTag = options.spacerTag ?? 'div'
  const type = options.type ?? 'fit'

  window.addEventListener('resize', adjustSpacer)

  onMounted(() => {
    container = document.querySelector(containerClass)

    adjustSpacer()

    container && observer.observe(container, { childList: true })
  })

  const observer = new MutationObserver((_, observer) => {
    observer.disconnect()

    adjustSpacer()

    observer.observe(container!, { childList: true })
  })

  function adjustSpacer() {
    document.querySelectorAll(`${containerClass} ${toClassSelector(spacerClass)}`)
      .forEach(n => n.remove())

    container = document.querySelector(containerClass)
    const track = container?.firstElementChild

    const containerWidth = container?.clientWidth ?? 0
    const trackWidth = track?.clientWidth ?? 0
    const trackCount = container?.childElementCount ?? 0

    const perRow = trackWidth !== 0 ? Math.floor(containerWidth / trackWidth) : 0
    const mod = perRow !== 0 ? trackCount % perRow : 0
    const lack = mod !== 0 ? perRow - mod : 0

    const fragment = createSpacers(lack, spacerTag, spacerClass, type)

    container?.appendChild(fragment!)
  }
}

function toClassSelector(name: string) {
  return name.startsWith('.') ? name : '.' + name
}

function toClassName(name: string) {
  return name.startsWith('.') ? name.slice(1) : name
}

function createSpacers(size: number, tag: string, classes: string, type: 'fill' | 'fit') {// TODO dataid => attrs
  const fragment = document.createDocumentFragment()

  if (size === 0) {
    return fragment
  }

  if (type === 'fill') {
    const spacer = createSpacer(tag, classes, { gridColumn: `span ${size}`})

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
