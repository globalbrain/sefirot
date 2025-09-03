import { requiredYmdIf } from 'sefirot/validation/validators'

describe('validation/validators/requiredYmdIf', () => {
  it('skips when condition is false', async () => {
    const res = await requiredYmdIf({ year: 2024 }, false)
    expect(res).toBe(true)
  })

  it('applies ymd with default required when condition is true', async () => {
    const valid = { year: 2024, month: 2, day: 29 }
    const invalid = { year: 2023, month: 2, day: 29 }
    expect(await requiredYmdIf(valid, true)).toBe(true)
    expect(await requiredYmdIf(invalid, true)).toBe(false)
  })

  it('respects custom required parts and rejectNull is true', async () => {
    const val1 = { year: 2025 }
    const val2 = { year: null }
    const val3 = { month: 5, day: 10 }
    expect(await requiredYmdIf(val1, true, ['y'])).toBe(true)
    expect(await requiredYmdIf(val2, true, ['y'])).toBe(false)
    expect(await requiredYmdIf(val3, true, ['y'])).toBe(false)
  })
})
