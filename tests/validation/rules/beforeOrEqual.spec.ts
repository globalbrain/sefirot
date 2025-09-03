import { day } from 'sefirot/support/Day'
import { beforeOrEqual } from 'sefirot/validation/rules'

describe('validation/rules/beforeOrEqual', () => {
  it('validates if the date is before or equal to the specified date', () => {
    const rule = beforeOrEqual(day('2020-01-02'))

    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)
    expect(rule.$validator(day('2020-01-01'), null, null)).toBe(true)
    expect(rule.$validator(day('2020-01-02'), null, null)).toBe(true)
    expect(rule.$validator(day('2020-01-03'), null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = beforeOrEqual(day('2020-01-02'))
    expect(rule.$message({ $params: {} })).toBe('Date must be before or equal to 2020-01-02.')
  })

  test('custom error message', () => {
    const rule = beforeOrEqual(day('2020-01-02'), 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})
