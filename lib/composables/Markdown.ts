import DOMPurify, { type Config } from 'dompurify'
import MarkdownIt, { type Options as MarkdownItOptions } from 'markdown-it'

export type UseMarkdown = (source: string, inline?: boolean) => string

export interface UseMarkdownOptions extends MarkdownItOptions {
  config?: (md: MarkdownIt) => void
  /** @default false */
  inline?: boolean
  domPurifyOptions?: Config
}

const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i

if (typeof document !== 'undefined') {
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A') {
      const target = node.getAttribute('target')
      if (target && target !== '_blank' && target !== '_self') {
        node.removeAttribute('target')
      }

      const href = node.getAttribute('href')
      if (href && EXTERNAL_URL_RE.test(href)) {
        node.setAttribute('target', '_blank')
        node.setAttribute('rel', 'noreferrer')
      }

      node.classList.add('SMarkdown-link')
    }
  })
}

export function useMarkdown({
  config,
  inline: _inline,
  domPurifyOptions,
  ...options
}: UseMarkdownOptions = {}): UseMarkdown {
  //

  const md = new MarkdownIt({ html: true, linkify: true, ...options })
  config?.(md)

  return (source, inline = _inline) => {
    const html = inline ? md.renderInline(source) : md.render(source)
    return DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ['target'],
      ...domPurifyOptions
    })
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

  return (source: string) => md.renderInline(source)
}
