import required from '@/validation/rules/required'

describe('Validation - Rules - required', () => {
  test('it validates if the value exists', () => {
    const rule = required('Error message')

    expect(rule('Some value')).toBe(true)
    expect(rule(0)).toBe(true)
    expect(rule(null)).toBe(false)
    expect(rule()).toBe(false)
  })
})
