import { minLength } from 'sefirot/validation/validators'

describe('validation/validators/minLength', () => {
  it('validates whether the value is valid', () => {
    const length = 10

    expect(minLength('1'.repeat(10), length)).toBe(true)
    expect(minLength(Array(10).fill('1'), length)).toBe(true)

    expect(minLength(undefined, length)).toBe(false)
    expect(minLength(null, length)).toBe(false)
    expect(minLength(true, length)).toBe(false)
    expect(minLength(false, length)).toBe(false)
    expect(minLength(10, length)).toBe(false)
    expect(minLength('', length)).toBe(false)
    expect(minLength('1'.repeat(9), length)).toBe(false)
    expect(minLength([], length)).toBe(false)
    expect(minLength(Array(9).fill('1'), length)).toBe(false)
    expect(minLength({}, length)).toBe(false)
    expect(minLength({ length: 10 }, length)).toBe(false)
  })
})
