import { regex } from 'sefirot/validation/validators'

describe('validation/validators/regex', () => {
  test('it validates if the value matches the given regex', () => {
    const checks = [
      ['aaa', true],
      ['abc', false]
    ]

    checks.forEach((check) => {
      expect(regex(check[0], /aaa/)).toBe(check[1])
    })
  })
})
