import minLength from '@/validation/rules/minLength'

describe('Validation - Rules - minLength', () => {
  test('it validates if the value is valid minLength', () => {
    const rule = minLength(5, 'Error message')

    expect(rule('12345')).toBe(true)
    expect(rule('1234')).toBe(false)
    expect(rule([1, 2, 3, 4, 5])).toBe(true)
    expect(rule([1, 2, 3, 4])).toBe(false)
  })
})
