import { required } from 'sefirot/validation/validators'

describe('validation/validators/required', () => {
  it('returns false for nullish', () => {
    expect(required(null)).toBe(false)
    expect(required(undefined)).toBe(false)
  })

  it('handles arrays by length', () => {
    expect(required([])).toBe(false)
    expect(required([0])).toBe(true)
  })

  it('handles strings by trimmed length', () => {
    expect(required('')).toBe(false)
    expect(required('   ')).toBe(false)
    expect(required('a')).toBe(true)
    expect(required('  a  ')).toBe(true)
  })

  it('accepts valid Date, rejects invalid Date', () => {
    expect(required(new Date('2024-01-01'))).toBe(true)
    expect(required(new Date('invalid date'))).toBe(false)
  })

  it('treats numbers as present', () => {
    expect(required(0)).toBe(true)
    expect(required(123)).toBe(true)
  })

  it('treats false as present', () => {
    expect(required(false)).toBe(true)
  })

  it('rejects NaN', () => {
    expect(required(Number.NaN)).toBe(false)
  })

  it('treats empty object as present', () => {
    expect(required({})).toBe(true)
  })
})
