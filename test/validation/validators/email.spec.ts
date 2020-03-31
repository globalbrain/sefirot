import { email } from 'sefirot/validation/validators'

describe('Validation - Validators - email', () => {
  test('it validates if the value valid email address', () => {
    const checks = [
      ['john.doe@example.com', true],
      ['john.doe', false],
      ['john@example', false]
    ]

    checks.forEach((check) => {
      expect(email(check[0])).toBe(check[1])
    })
  })
})
