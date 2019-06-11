import minValue from '@/validation/rules/minValue'

describe('Validation - Rules - minValue', () => {
  test('it validates if the value is valid minValue', () => {
    const rule = minValue(5, 'Error message')

    expect(rule(4)).toBe(false)
    expect(rule(5)).toBe(true)
    expect(rule(6)).toBe(true)
  })
})
