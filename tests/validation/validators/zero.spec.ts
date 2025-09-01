import { zero } from 'sefirot/validation/validators'

describe('validation/validators/zero', () => {
  it('validatess if the value is zero', () => {
    expect(zero(0)).toBe(true)

    expect(zero(undefined)).toBe(false)
    expect(zero(null)).toBe(false)
    expect(zero(true)).toBe(false)
    expect(zero(false)).toBe(false)
    expect(zero(1)).toBe(false)
    expect(zero('0')).toBe(false)
    expect(zero({})).toBe(false)
    expect(zero([])).toBe(false)
  })
})
