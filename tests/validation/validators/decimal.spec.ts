import { decimal } from 'sefirot/validation/validators'

describe('validation/validators/decimal', () => {
  test('it validates whether the value is decimal', () => {
    expect(decimal(0)).toBe(true)
    expect(decimal(1)).toBe(true)
    expect(decimal(-1)).toBe(true)
    expect(decimal(1.1)).toBe(true)
    expect(decimal(-1.1)).toBe(true)
    expect(decimal('1.00')).toBe(true)
    expect(decimal('-1.00')).toBe(true)
    expect(decimal('-')).toBe(true)

    expect(decimal(undefined)).toBe(false)
    expect(decimal(null)).toBe(false)
    expect(decimal(true)).toBe(false)
    expect(decimal(false)).toBe(false)
    expect(decimal('abc')).toBe(false)
    expect(decimal({})).toBe(false)
    expect(decimal([])).toBe(false)
  })
})
