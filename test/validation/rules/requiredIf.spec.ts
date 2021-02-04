import { requiredIf } from 'sefirot/validation/rules'

describe('validation/rules/requiredIf', () => {
  test('it validates if the value is present only when specified locator is truthy', () => {
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
      const result = requiredIf('other').validate(check[1], {
        other: check[0]
      })

      expect(result).toBe(check[2])
    })
  })

  test('it can set custom error message', () => {
    const rule = requiredIf('dummy', 'Custom message')

    expect(rule.message).toBe('Custom message')
  })
})
