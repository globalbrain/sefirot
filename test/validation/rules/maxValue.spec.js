import maxValue from '@/validation/rules/maxValue'

describe('Validation - Rules - maxValue', () => {
  test('it validates if the value is valid maxValue', () => {
    const rule = maxValue(5, 'Error message')

    expect(rule(4)).toBe(true)
    expect(rule(5)).toBe(true)
    expect(rule(6)).toBe(false)
  })
})
