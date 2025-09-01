import { minValue } from 'sefirot/validation/validators'

describe('validation/validators/minValue', () => {
  it('validates whether the value is valid number or string', () => {
    const min = 10

    expect(minValue(10, min)).toBe(true)
    expect(minValue('10', min)).toBe(true)

    expect(minValue(undefined, min)).toBe(false)
    expect(minValue(null, min)).toBe(false)
    expect(minValue(true, min)).toBe(false)
    expect(minValue(false, min)).toBe(false)
    expect(minValue(0, min)).toBe(false)
    expect(minValue(9, min)).toBe(false)
    expect(minValue('0', min)).toBe(false)
    expect(minValue('9', min)).toBe(false)
    expect(minValue({}, min)).toBe(false)
    expect(minValue([], min)).toBe(false)
  })

  it('validates whether the value is valid date', () => {
    const minDate = new Date('Fri Jan 19 2024 14:55:28 GMT+0900 (Japan Standard Time)')
    const invalidDate = new Date('Fri Jan 19 2024 14:55:27 GMT+0900 (Japan Standard Time)')

    expect(minValue(minDate, +minDate)).toBe(true)

    expect(minValue(undefined, +minDate)).toBe(false)
    expect(minValue(null, +minDate)).toBe(false)
    expect(minValue(invalidDate, +minDate)).toBe(false)
  })
})
