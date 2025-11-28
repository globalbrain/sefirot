import { _required, required } from 'sefirot/validation/validators'

describe('validation/validators/required', () => {
  test('validates if the value is valid', () => {
    expect(required([1])).toBe(true)
    expect(required({})).toBe(true)
    expect(required({ a: 1 })).toBe(true)
    expect(required(true)).toBe(true)
    expect(required(false)).toBe(true)
    expect(required(0)).toBe(true)
    expect(required('1')).toBe(true)
    expect(required(' 1 ')).toBe(true)
    expect(required('🎉')).toBe(true)
    expect(required({})).toBe(true)
    expect(required(new Date(1234123412341))).toBe(true)

    expect(required(undefined)).toBe(false)
    expect(required(null)).toBe(false)
    expect(required([])).toBe(false)
    expect(required('')).toBe(false)
    expect(required('  ')).toBe(false)
    expect(required(new Date('a'))).toBe(false)
  })
})

describe('validation/validators/_required', () => {
  test('validates if the value is valid', () => {
    expect(_required('  ')).toBe(true)
  })
})
