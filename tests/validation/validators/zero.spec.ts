import { zero } from 'sefirot/validation/validators'

describe('validation/validators/zero', () => {
  it('accepts 0', () => {
    expect(zero(0)).toBe(true)
  })

  it('treats -0 as zero', () => {
    expect(zero(-0)).toBe(true)
  })

  it('rejects anything that is not the number 0', () => {
    expect(zero('0')).toBe(false)
    expect(zero(0n)).toBe(false)
    expect(zero(false)).toBe(false)
    expect(zero(null)).toBe(false)
    expect(zero(undefined)).toBe(false)
    expect(zero([])).toBe(false)
    // eslint-disable-next-line unicorn/new-for-builtins
    expect(zero(new Number(0))).toBe(false)
  })
})
