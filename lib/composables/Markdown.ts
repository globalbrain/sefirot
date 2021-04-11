import MarkdownIt from 'markdown-it'
import { onUnmounted } from '@vue/composition-api'
import { isCallbackUrl, isExternalUrl, LinkAttrs, linkPlugin } from './markdown/LinkPlugin'
import { useRouter } from './Router'

export type UseMarkdown = (source: string, inline: boolean) => string

export interface UseMarkdownOptions extends MarkdownIt.Options {
  linkAttrs?: LinkAttrs
  config?: (md: MarkdownIt) => void
}

export function useMarkdown(options: UseMarkdownOptions = {}): UseMarkdown {
  const md = new MarkdownIt({
    linkify: true,
    ...options
  })

  md.use(linkPlugin, {
    target: '_blank',
    rel: 'noopener noreferrer',
    ...options.linkAttrs
  })

  if (options.config) {
    options.config(md)
  }

  return (source, inline) => {
    return inline ? md.renderInline(source) : md.render(source)
  }
}

export interface UseLink {
  selector: string
  addListeners(): void
  removeListeners(): void
  subscribe(cb: LinkSubscriber): () => void
}

export interface UseLinkOptions {
  callbacks?: LinkEvent[]
}

export interface LinkSubscriberPayload {
  event: Event
  target: HTMLAnchorElement
  isExternal: boolean
  isCallback: boolean
}

export type LinkSubscriber = (payload: LinkSubscriberPayload) => void

export type LinkEvent = () => void

export function useLink(options: UseLinkOptions): UseLink {
  const router = useRouter()

  const subscribers: LinkSubscriber[] = []
  const selector = buildSelector()
  const querySelector = `.${selector} a.SMarkdown-link`

  onUnmounted(() => removeListeners())

  function handler(event: Event): void {
    const target = event.target as HTMLAnchorElement
    const href = target.getAttribute('href')!

    if (!href) {
      return
    }

    const isExternal = isExternalUrl(href)
    const isCallback = isCallbackUrl(href)

    subscribers.forEach(sub => sub({
      event,
      target,
      isExternal,
      isCallback
    }))

    if (isExternal) {
      return
    }

    if (!event.defaultPrevented) {
      event.preventDefault()
    }

    if (isCallback) {
      const idx = parseInt(target.dataset.callbackId || '')
      const callbacks = options.callbacks || (options.callbacks = [])
      const callback = callbacks[idx]

      if (!callback) {
        throw new Error(`Callback not found at index: ${idx}`)
      }

      return callback()
    }

    router.push(href)
  }

  function addListeners(): void {
    removeListeners()

    const elements = document.querySelectorAll(querySelector)

    elements.forEach((element) => {
      element.addEventListener('click', handler)
    })
  }

  function removeListeners(): void {
    const elements = document.querySelectorAll(querySelector)

    elements.forEach((element) => {
      element.removeEventListener('click', handler)
    })
  }

  function subscribe(fn: LinkSubscriber): () => void {
    subscribers.push(fn)

    return () => {
      const idx = subscribers.indexOf(fn)
      idx > -1 && subscribers.splice(idx, 1)
    }
  }

  return {
    selector,
    addListeners,
    removeListeners,
    subscribe
  }
}

function buildSelector(): string {
  const uuid = [...Array(8)].map(() => {
    return (Math.random() * 36 | 0).toString(36)
  }).join('')

  return `SMarkdown-${uuid}`
}
