import { checked } from 'sefirot/validation/rules'

describe('validation/rules/checked', () => {
  test('it creates checked validation rule', () => {
    const result = checked().validate(true, {})

    expect(result).toBe(true)
  })

  test('it can set custom error message', () => {
    const rule = checked('Custom message')

    expect(rule.message).toBe('Custom message')
  })
})
