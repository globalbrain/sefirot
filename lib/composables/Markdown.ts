import {
  type DOMPurifyConfig,
  type DOMPurifyI,
  createDompurify
} from '@globalbrain/sefirot/dompurify'
import mdit, { type MarkdownIt } from 'markdown-it'

export interface UseMarkdownOptions {
  /** @default true */
  html?: boolean
  /** @default true */
  xhtmlOut?: boolean
  /** @default false */
  breaks?: boolean
  /** @default 'language-' */
  langPrefix?: string
  /** @default true */
  linkify?: boolean
  /** @default false */
  typographer?: boolean
  /** @default '“”‘’' */
  quotes?: string | string[]
  /** @default null */
  highlight?: ((str: string, lang: string, attrs: string) => string) | null
  config?: (md: MarkdownIt) => void
  /** @default false */
  inline?: boolean
  domPurifyInstance?: DOMPurifyI
  domPurifyOptions?: DOMPurifyConfig
}

const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i

let DOMPurify: DOMPurifyI | undefined

export function getDomPurifySingleton(): DOMPurifyI {
  if (DOMPurify) { return DOMPurify }
  DOMPurify = createDompurify()
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
  return DOMPurify
}

export function configureLinkify(linkify: MarkdownIt['linkify']): void {
  // linkify-it only treats `｜` (U+FF5C) as a full-width link boundary. Treat
  // every full-width form as one so that links and emails are also detected
  // next to full-width punctuation, letters and digits, as in Japanese text.
  linkify.re.get_text_separators = () => /[><\uFF00-\uFFEF]/

  // linkify-it 6 no longer detects schemeless URLs such as `example.com` by
  // default. Keep detecting them as before.
  linkify.set({ fuzzyLink: true })
}

export function useMarkdown({
  config,
  inline: _inline,
  domPurifyInstance,
  domPurifyOptions,
  ...options
}: UseMarkdownOptions = {}) {
  const md = mdit({ html: true, xhtmlOut: true, linkify: true, ...options })
  configureLinkify(md.linkify)

  md.renderer.rules.ordered_list_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const start = Number(token.attrGet('start')) - 1
    if (start >= 0) {
      token.attrSet('style', `counter-reset: s-medium-counter ${start}`)
    }
    return self.renderToken(tokens, idx, options)
  }

  config?.(md)

  return (source: string, inline = _inline) => {
    const html = inline ? md.renderInline(source) : md.render(source)
    return (domPurifyInstance || getDomPurifySingleton()).sanitize(html, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ['target'],
      ...domPurifyOptions
    })
  }
}

export function useLinkifyIt() {
  const md = mdit('zero', { linkify: true })
  md.enable('linkify')
  configureLinkify(md.linkify)

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    token.attrSet('target', '_blank')
    token.attrSet('rel', 'noreferrer')
    return self.renderToken(tokens, idx, options)
  }

  return (source: string) => md.renderInline(source)
}
