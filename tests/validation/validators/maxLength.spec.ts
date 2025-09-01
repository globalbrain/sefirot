import { maxLength } from 'sefirot/validation/validators'

describe('validation/validators/maxLength', () => {
  it('accepts strings within the max length', () => {
    expect(maxLength('abc', 5)).toBe(true)
    expect(maxLength('', 0)).toBe(true)
    expect(maxLength('', 1)).toBe(true)
  })

  it('rejects strings longer than max length', () => {
    expect(maxLength('abcdef', 5)).toBe(false)
  })

  it('accepts arrays within the max length', () => {
    expect(maxLength([1, 2, 3], 3)).toBe(true)
    expect(maxLength([], 0)).toBe(true)
    expect(maxLength([], 1)).toBe(true)
  })

  it('rejects arrays longer than max length', () => {
    expect(maxLength([1, 2, 3, 4], 3)).toBe(false)
  })

  it('rejects non-string/array values', () => {
    expect(maxLength(123, 3)).toBe(false)
    expect(maxLength(true, 3)).toBe(false)
    expect(maxLength({ length: 2 }, 3)).toBe(false)
    expect(maxLength(null, 3)).toBe(false)
    expect(maxLength(undefined, 3)).toBe(false)
  })

  it('counts UTF-16 code units, not grapheme clusters', () => {
    expect(maxLength('👩‍🚀', 4)).toBe(false)
    expect(maxLength('👩‍🚀', 5)).toBe(true) // 🧑 (2) + zwj (1) + 🚀 (2)
  })
})
