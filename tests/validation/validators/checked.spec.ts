import { checked } from 'sefirot/validation/validators'

describe('validation/validators/checked', () => {
  it('returns true only for boolean true', () => {
    expect(checked(true)).toBe(true)
  })

  it('returns false for boolean false', () => {
    expect(checked(false)).toBe(false)
  })

  it('returns false for undefined / null', () => {
    expect(checked(undefined)).toBe(false)
    expect(checked(null)).toBe(false)
  })

  it('returns false for non-boolean truthy/falsey values', () => {
    expect(checked('true')).toBe(false)
    expect(checked('')).toBe(false)
    expect(checked(1)).toBe(false)
    expect(checked(0)).toBe(false)
    expect(checked([])).toBe(false)
    expect(checked({})).toBe(false)
    // eslint-disable-next-line no-new-wrappers
    expect(checked(new Boolean(true))).toBe(false)
  })
})
