import * as Dom from 'sefirot/support/Dom'

function input(type: string): HTMLInputElement {
  const el = document.createElement('input')
  el.type = type
  return el
}

describe('support/Dom', () => {
  describe('isTextLikeInput', () => {
    it('returns true for plain text-like input types', () => {
      for (const type of ['text', 'search', 'url', 'email', 'tel', 'password', 'number']) {
        expect(Dom.isTextLikeInput(input(type))).toBe(true)
      }
    })

    it('returns false for non-text input types', () => {
      for (const type of ['checkbox', 'radio', 'file', 'range', 'color', 'date']) {
        expect(Dom.isTextLikeInput(input(type))).toBe(false)
      }
    })

    it('returns false for a textarea (Enter inserts a newline)', () => {
      expect(Dom.isTextLikeInput(document.createElement('textarea'))).toBe(false)
    })

    it('returns false for non-input elements and null', () => {
      expect(Dom.isTextLikeInput(document.createElement('div'))).toBe(false)
      expect(Dom.isTextLikeInput(null)).toBe(false)
    })
  })
})
