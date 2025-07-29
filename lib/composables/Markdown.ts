import DOMPurify, { type Config } from 'dompurify'
import MarkdownIt from 'markdown-it'

export type UseMarkdown = (source: string, inline?: boolean) => string

// vendored for vue compatibility
export interface MarkdownItOptions {
  /**
   * Set `true` to enable HTML tags in source. Be careful!
   * That's not safe! You may need external sanitizer to protect output from XSS.
   * It's better to extend features via plugins, instead of enabling HTML.
   * @default false
   */
  html?: boolean | undefined

  /**
   * Set `true` to add '/' when closing single tags
   * (`<br />`). This is needed only for full CommonMark compatibility. In real
   * world you will need HTML output.
   * @default false
   */
  xhtmlOut?: boolean | undefined

  /**
   * Set `true` to convert `\n` in paragraphs into `<br>`.
   * @default false
   */
  breaks?: boolean | undefined

  /**
   * CSS language class prefix for fenced blocks.
   * Can be useful for external highlighters.
   * @default 'language-'
   */
  langPrefix?: string | undefined

  /**
   * Set `true` to autoconvert URL-like text to links.
   * @default false
   */
  linkify?: boolean | undefined

  /**
   * Set `true` to enable [some language-neutral replacement](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js) +
   * quotes beautification (smartquotes).
   * @default false
   */
  typographer?: boolean | undefined

  /**
   * Double + single quotes replacement
   * pairs, when typographer enabled and smartquotes on. For example, you can
   * use `'«»„“'` for Russian, `'„“‚‘'` for German, and
   * `['«\xA0', '\xA0»', '‹\xA0', '\xA0›']` for French (including nbsp).
   * @default '“”‘’'
   */
  quotes?: string | string[]

  /**
   * Highlighter function for fenced code blocks.
   * Highlighter `function (str, lang, attrs)` should return escaped HTML. It can
   * also return empty string if the source was not changed and should be escaped
   * externally. If result starts with <pre... internal wrapper is skipped.
   * @default null
   */
  highlight?: ((str: string, lang: string, attrs: string) => string) | null | undefined
}

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

  md.renderer.rules.ordered_list_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const start = Number(token.attrGet('start')) - 1
    if (start >= 0) {
      token.attrSet('style', `counter-reset: s-medium-counter ${start}`)
    }
    return self.renderToken(tokens, idx, options)
  }

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
