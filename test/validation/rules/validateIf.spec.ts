import { validateIf, required, integer } from 'sefirot/validation/rules'

describe('validation/rules/validateIf', () => {
  test('it executes the given rules only when specified locator is truthy', () => {
    const checks: any[] = [
      [undefined, '', true],
      [undefined, 'Exist', true],
      [null, '', true],
      [null, 'Exist', true],
      [true, '', false],
      [true, 'Exist', true],
      [false, '', true],
      [false, 'Exist', true],
      ['', '', true],
      ['', 'Exist', true],
      ['Hello', '', false],
      ['Hello', 'Exist', true],
      [0, '', true],
      [0, 'Exist', true],
      [1, '', false],
      [1, 'Exist', true]
    ]

    checks.forEach((check) => {
      const rule = validateIf('other', [required()])

      const result = rule.validate(check[1], {
        other: check[0]
      })

      expect(result).toBe(check[2])
    })
  })

  test('it can take callback as a locator', () => {
    const rule = validateIf(data => data.other, [required()])

    expect(rule.validate('', { other: false })).toBe(true)
    expect(rule.validate('', { other: true })).toBe(false)
    expect(rule.validate('Exist', { other: true })).toBe(true)
  })

  test('it skippes any optional validators if the value is not present', () => {
    const rule = validateIf(data => data.other, [integer()])

    expect(rule.validate(null, { other: true })).toBe(true)
    expect(rule.validate(0.5, { other: true })).toBe(false)
  })
})
