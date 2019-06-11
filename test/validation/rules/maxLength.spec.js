import maxLength from '@/validation/rules/maxLength'

describe('Validation - Rules - maxLength', () => {
  test('it validates if the value is valid maxLength', () => {
    const rule = maxLength(5, 'Error message')

    expect(rule('12345')).toBe(true)
    expect(rule('123456')).toBe(false)
    expect(rule([1, 2, 3, 4, 5])).toBe(true)
    expect(rule([1, 2, 3, 4, 5, 6])).toBe(false)
  })
})
