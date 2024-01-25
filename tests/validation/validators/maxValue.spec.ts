import { maxValue } from 'sefirot/validation/validators'

describe('validation/validators/maxValue', () => {
  test('it validates whether the value is valid number or string', () => {
    const max = 10

    expect(maxValue(0, max)).toBe(true)
    expect(maxValue(10, max)).toBe(true)
    expect(maxValue('0', max)).toBe(true)
    expect(maxValue('10', max)).toBe(true)

    expect(maxValue(undefined, max)).toBe(false)
    expect(maxValue(null, max)).toBe(false)
    expect(maxValue(true, max)).toBe(false)
    expect(maxValue(false, max)).toBe(false)
    expect(maxValue(11, max)).toBe(false)
    expect(maxValue('11', max)).toBe(false)
    expect(maxValue({}, max)).toBe(false)
    expect(maxValue([], max)).toBe(false)
  })

  test('it validates whether the value is valid date', () => {
    const maxDate = new Date('Fri Jan 19 2024 14:55:27 GMT+0900 (Japan Standard Time)')
    const invalidDate = new Date('Fri Jan 19 2024 14:55:28 GMT+0900 (Japan Standard Time)')

    expect(maxValue(maxDate, +maxDate)).toBe(true)

    expect(maxValue(undefined, +maxDate)).toBe(false)
    expect(maxValue(null, +maxDate)).toBe(false)
    expect(maxValue(invalidDate, +maxDate)).toBe(false)
  })
})
