import numeric from '@/validation/rules/numeric'

describe('Validation - Rules - numeric', () => {
  test('it validates if the value is valid numeric', () => {
    const rule = numeric('Error message')

    expect(rule(12345)).toBe(true)
    expect(rule('12345')).toBe(true)
    expect(rule('invalid')).toBe(false)
  })
})
