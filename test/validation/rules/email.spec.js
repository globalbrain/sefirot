import email from '@/validation/rules/email'

describe('Validation - Rules - email', () => {
  test('it validates if the value is valid email address', () => {
    const rule = email('Error message')

    expect(rule('john.doe@example.com')).toBe(true)
    expect(rule('jhon-doe-invalid-address')).toBe(false)
  })
})
