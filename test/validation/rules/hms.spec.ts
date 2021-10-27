import { hms } from 'sefirot/validation/rules'

describe('validation/rules/hms', () => {
  test('it creates hms validation rule', () => {
    const result = hms().validate({ hour: '1', minute: '2', second: '3' }, {})

    expect(result).toBe(true)
  })

  test('it can set custom error message', () => {
    const rule = hms(undefined, 'Custom message')

    expect(rule.message).toBe('Custom message')
  })
})
