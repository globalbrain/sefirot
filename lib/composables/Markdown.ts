import MarkdownIt, { type Options as MarkdownItOptions } from 'markdown-it'
import { type Ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { type LinkAttrs, isCallbackUrl, isExternalUrl, linkPlugin } from './markdown/LinkPlugin'

export type UseMarkdown = (source: string, inline: boolean) => string

export interface UseMarkdownOptions extends MarkdownItOptions {
  linkAttrs?: LinkAttrs
  config?: (md: MarkdownIt) => void
}

export function useMarkdown(options: UseMarkdownOptions = {}): UseMarkdown {
  const md = new MarkdownIt({
    html: true,
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

export function useLinkifyIt() {
  const md = new MarkdownIt('zero', { linkify: true })
  md.enable('linkify')

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    token.attrSet('target', '_blank')
    token.attrSet('rel', 'noreferrer')
    return self.renderToken(tokens, idx, options)
  }

  return (source: string) => {
    return md.renderInline(source)
  }
}

export interface UseLink {
  addListeners(): void
  removeListeners(): void
  subscribe(cb: LinkSubscriber): () => void
}

export interface UseLinkOptions {
  container: Ref<Element | null>
  callbacks?: LinkCallback[]
}

export interface LinkSubscriberPayload {
  event: Event
  target: HTMLAnchorElement
  isExternal: boolean
  isCallback: boolean
}

export type LinkSubscriber = (payload: LinkSubscriberPayload) => void

export type LinkCallback = () => void

export function useLink({ container, callbacks }: UseLinkOptions): UseLink {
  const router = useRouter()
  const subscribers: LinkSubscriber[] = []

  onUnmounted(() => removeListeners())

  function handler(event: Event): void {
    const target = event.target as HTMLAnchorElement
    const href = target.getAttribute('href')!

    if (!href) {
      return
    }

    const isExternal = isExternalUrl(href)
    const isCallback = isCallbackUrl(href)

    subscribers.forEach((sub) => sub({
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
      const idx = Number.parseInt(target.dataset.callbackId || '')
      const callback = (callbacks ?? [])[idx]

      if (!callback) {
        throw new Error(`Callback not found at index: ${idx}`)
      }

      return callback()
    }

    router.push(href)
  }

  function addListeners(): void {
    removeListeners()

    if (container.value) {
      findLinks(container.value).forEach((element) => {
        element.addEventListener('click', handler)
      })
    }
  }

  function removeListeners(): void {
    if (container.value) {
      findLinks(container.value).forEach((element) => {
        element.removeEventListener('click', handler)
      })
    }
  }

  function subscribe(fn: LinkSubscriber): () => void {
    subscribers.push(fn)

    return () => {
      const idx = subscribers.indexOf(fn)
      idx > -1 && subscribers.splice(idx, 1)
    }
  }

  return {
    addListeners,
    removeListeners,
    subscribe
  }
}

function findLinks(target: Element) {
  return target.querySelectorAll('a.SMarkdown-link')
}
