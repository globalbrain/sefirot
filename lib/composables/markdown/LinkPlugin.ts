import type MarkdownIt from 'markdown-it'

export type LinkAttrs = Record<string, string>

const EXTERNAL_REGEX = /^https?:/
const CALLBACK_REGEX = /\{([\d}]+)\}/
const CALLBACK_HREF = '#callback'

export function linkPlugin(md: MarkdownIt, linkAttrs: LinkAttrs = {}): void {
  md.renderer.rules.link_open = (tokens, idx, options, _env, self) => {
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')

    if (hrefIndex >= 0) {
      const hrefAttr = token.attrs![hrefIndex]
      const url = decodeURIComponent(hrefAttr[1])

      if (isExternalUrl(url)) {
        Object.entries(linkAttrs).forEach(([key, val]) => {
          token.attrSet(key, val)
        })
      }

      if (isCallbackUrl(url)) {
        const matched = url.match(CALLBACK_REGEX)![1]

        token.attrSet('data-callback-id', matched)

        hrefAttr[1] = CALLBACK_HREF
      }

      token.attrSet('class', 'SMarkdown-link')
    }

    return self.renderToken(tokens, idx, options)
  }
}

export function isExternalUrl(url: string): boolean {
  return EXTERNAL_REGEX.test(url)
}

export function isCallbackUrl(url: string): boolean {
  return url === CALLBACK_HREF || CALLBACK_REGEX.test(decodeURIComponent(url))
}
