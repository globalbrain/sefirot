import { useLinkifyIt, useMarkdown } from 'sefirot/composables/Markdown'

describe('composables/Markdown', () => {
  describe('useLinkifyIt', () => {
    it('links URLs and emails and opens them in a new tab', () => {
      const linkify = useLinkifyIt()

      expect(linkify('Visit https://example.com or mail hi@example.com today')).toBe(
        'Visit <a href="https://example.com" target="_blank" rel="noreferrer">https://example.com</a>'
        + ' or mail <a href="mailto:hi@example.com" target="_blank" rel="noreferrer">hi@example.com</a> today'
      )
    })

    it('links URLs without a scheme', () => {
      const linkify = useLinkifyIt()

      expect(linkify('Visit example.com today')).toBe(
        'Visit <a href="http://example.com" target="_blank" rel="noreferrer">example.com</a> today'
      )
    })

    it('ends links at full-width characters', () => {
      const linkify = useLinkifyIt()

      expect(linkify('https://example.com（参考）')).toBe(
        '<a href="https://example.com" target="_blank" rel="noreferrer">https://example.com</a>（参考）'
      )
      expect(linkify('https://example.com１２３')).toBe(
        '<a href="https://example.com" target="_blank" rel="noreferrer">https://example.com</a>１２３'
      )
    })

    it('links emails after full-width punctuation', () => {
      const linkify = useLinkifyIt()

      expect(linkify('連絡先：hi@example.com')).toBe(
        '連絡先：<a href="mailto:hi@example.com" target="_blank" rel="noreferrer">hi@example.com</a>'
      )
    })

    it('leaves markdown syntax as is', () => {
      const linkify = useLinkifyIt()

      expect(linkify('**Bold** and [link](https://example.com)')).toBe(
        '**Bold** and [link](<a href="https://example.com" target="_blank" rel="noreferrer">https://example.com</a>)'
      )
    })
  })

  describe('useMarkdown', () => {
    it('links URLs without a scheme', () => {
      const markdown = useMarkdown()

      expect(markdown('Visit example.com today').trim()).toBe(
        '<p>Visit <a href="http://example.com" target="_blank" rel="noreferrer" class="SMarkdown-link">example.com</a> today</p>'
      )
    })

    it('ends links at full-width characters', () => {
      const markdown = useMarkdown()

      expect(markdown('https://example.com（参考）').trim()).toBe(
        '<p><a href="https://example.com" target="_blank" rel="noreferrer" class="SMarkdown-link">https://example.com</a>（参考）</p>'
      )
    })
  })
})
