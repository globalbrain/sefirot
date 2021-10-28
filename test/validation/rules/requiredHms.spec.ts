import { requiredHMS } from 'sefirot/validation/rules'

describe('validation/rules/requiredHMS', () => {
  test('it creates requiredHMS validation rule', () => {
    const result = requiredHMS().validate({ hour: '1', minute: '2', second: '3' }, {})

    expect(result).toBe(true)
  })

  test('it can set custom error message', () => {
    const rule = requiredHMS(undefined, 'Custom message')

    expect(rule.message).toBe('Custom message')
  })
})
