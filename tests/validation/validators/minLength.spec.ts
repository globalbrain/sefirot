import { minLength } from 'sefirot/validation/validators'

describe('validation/validators/minLength', () => {
  it('accepts strings with length >= min', () => {
    expect(minLength('abc', 3)).toBe(true)
    expect(minLength('abcd', 3)).toBe(true)
  })

  it('rejects strings shorter than min', () => {
    expect(minLength('ab', 3)).toBe(false)
    expect(minLength('', 1)).toBe(false)
  })

  it('accepts arrays with length >= min', () => {
    expect(minLength([1, 2, 3], 3)).toBe(true)
    expect(minLength([1, 2, 3, 4], 3)).toBe(true)
  })

  it('rejects arrays shorter than min', () => {
    expect(minLength([1], 2)).toBe(false)
    expect(minLength([], 1)).toBe(false)
  })

  it('rejects non-string/array types', () => {
    expect(minLength(123, 3)).toBe(false)
    expect(minLength(true, 3)).toBe(false)
    expect(minLength({ length: 2 }, 2)).toBe(false)
    expect(minLength(null, 3)).toBe(false)
    expect(minLength(undefined, 3)).toBe(false)
  })

  it('counts code points, matching the database and backend', () => {
    expect(minLength('👩‍🚀', 3)).toBe(true)
    expect(minLength('👩‍🚀', 4)).toBe(false)
  })
})
