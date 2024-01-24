import { maxLength } from 'sefirot/validation/validators'

describe('validation/validators/maxLength', () => {
  test('it validates whether the value is valid', () => {
    const length = 10

    expect(maxLength('', length)).toBe(true)
    expect(maxLength('1'.repeat(10), length)).toBe(true)
    expect(maxLength([], length)).toBe(true)
    expect(maxLength(Array(10).fill('1'), length)).toBe(true)

    expect(maxLength(undefined, length)).toBe(false)
    expect(maxLength(null, length)).toBe(false)
    expect(maxLength(true, length)).toBe(false)
    expect(maxLength(false, length)).toBe(false)
    expect(maxLength('1'.repeat(11), length)).toBe(false)
    expect(maxLength({}, length)).toBe(false)
    expect(maxLength({ length: 10 }, length)).toBe(false)
    expect(maxLength(Array(11).fill('1'), length)).toBe(false)
  })
})
