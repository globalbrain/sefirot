import { day } from 'sefirot/support/Day'
import { afterOrEqual } from 'sefirot/validation/rules'

describe('validation/rules/afterOrEqual', () => {
  it('validates if the date is after or equal to the specified date', () => {
    const rule = afterOrEqual(day('2020-01-02'))

    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)
    expect(rule.$validator(day('2020-01-03'), null, null)).toBe(true)
    expect(rule.$validator(day('2020-01-02'), null, null)).toBe(true)
    expect(rule.$validator(day('2020-01-01'), null, null)).toBe(false)
  })

  it('shows the default error message', () => {
    const rule = afterOrEqual(day('2020-01-02'))
    expect(rule.$message({ $params: {} })).toBe('Date must be after or equal to 2020-01-02.')
  })

  it('uses the custom error message', () => {
    const rule = afterOrEqual(day('2020-01-02'), 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})
