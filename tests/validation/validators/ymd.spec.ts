import { ymd } from 'sefirot/validation/validators'

describe('validation/validators/ymd', () => {
  it('returns false when value is not an object', () => {
    expect(ymd(null)).toBe(false)
    expect(ymd(undefined)).toBe(false)
    expect(ymd('2024-01-01')).toBe(false)
  })

  it('accepts valid complete dates within range', () => {
    expect(ymd({ year: 2024, month: 2, date: 29 })).toBe(true)
    expect(ymd({ year: 2023, month: 12, date: 31 })).toBe(true)
    expect(ymd({ year: 1000, month: 1, date: 1 })).toBe(true)
    expect(ymd({ year: 2999, month: 12, date: 31 })).toBe(true)
  })

  it('rejects invalid ranges or impossible dates', () => {
    expect(ymd({ year: 2023, month: 2, date: 29 })).toBe(false)
    expect(ymd({ year: 2024, month: 0, date: 1 })).toBe(false)
    expect(ymd({ year: 2024, month: 13, date: 1 })).toBe(false)
    expect(ymd({ year: 2024, month: 1, date: 0 })).toBe(false)
    expect(ymd({ year: 2024, month: 1, date: 32 })).toBe(false)
    expect(ymd({ year: 999, month: 12, date: 31 })).toBe(false)
    expect(ymd({ year: 3000, month: 1, date: 1 })).toBe(false)
  })

  it('requires integers', () => {
    expect(ymd({ year: '2024', month: 1, date: 1 })).toBe(false)
    expect(ymd({ year: 2024, month: '01', date: 1 })).toBe(false)
    expect(ymd({ year: 2024, month: 1, date: '01' })).toBe(false)
    expect(ymd({ year: 2024.5, month: 1, date: 1 })).toBe(false)
    expect(ymd({ year: Number.NaN, month: 1, date: 1 })).toBe(false)
    expect(ymd({ year: 2024, month: true, date: 1 })).toBe(false)
  })

  it('supports optional parts via the required arg', () => {
    expect(ymd({ year: 2024 }, ['y'])).toBe(true)
    expect(ymd({ month: 5 }, ['m'])).toBe(true)
    expect(ymd({ date: 15 }, ['d'])).toBe(true)
    expect(ymd({}, [])).toBe(true)
    expect(ymd({ year: 2024 }, ['y'], true)).toBe(true)
    expect(ymd({}, [], true)).toBe(true)
    expect(ymd({ year: null }, [], true)).toBe(true)
    expect(ymd({ month: null }, [], true)).toBe(true)
    expect(ymd({ date: null }, [], true)).toBe(true)
    expect(ymd({ year: 2024, month: null }, ['y'], true)).toBe(true)
  })

  it('considers null valid even when the part is required', () => {
    expect(ymd({ year: null, month: 1, date: 1 }, ['y', 'm', 'd'])).toBe(true)
    expect(ymd({ year: 2024, month: null, date: 1 }, ['y', 'm', 'd'])).toBe(true)
    expect(ymd({ year: 2024, month: 1, date: null }, ['y', 'm', 'd'])).toBe(true)
    expect(ymd({ year: null, month: null, date: null }, ['y', 'm', 'd'])).toBe(true)
  })

  it('accepts null for required parts', () => {
    expect(ymd({ year: null }, ['y'])).toBe(true)
    expect(ymd({ month: null }, ['m'])).toBe(true)
    expect(ymd({ date: null }, ['d'])).toBe(true)
  })

  it('rejects null on required parts when rejectNull=true', () => {
    expect(ymd({ year: null, month: 1, date: 1 }, ['y', 'm', 'd'], true)).toBe(false)
    expect(ymd({ year: 2024, month: null, date: 1 }, ['y', 'm', 'd'], true)).toBe(false)
    expect(ymd({ year: 2024, month: 1, date: null }, ['y', 'm', 'd'], true)).toBe(false)
  })

  it('treats missing required part as invalid', () => {
    expect(ymd({ year: 2024, date: 1 }, ['y', 'm', 'd'])).toBe(false)
    expect(ymd({ month: 1, date: 1 }, ['y', 'm', 'd'], true)).toBe(false)
  })

  it('adds defaults based on current date', () => {
    expect(ymd({ year: 2024, month: null, date: null }, ['y', 'm', 'd'])).toBe(true)
    expect(ymd({ year: null, month: 1, date: 1 }, ['y', 'm', 'd'])).toBe(true)

    const RealDate = Date

    // @ts-expect-error mock
    globalThis.Date = class extends RealDate {
      constructor(...args: ConstructorParameters<typeof RealDate> | []) {
        if (args.length === 0) {
          super('2024-02-01T00:00:00Z')
        } else {
          super(...args)
        }
      }
    }

    try {
      expect(ymd({ month: 2, date: 29 }, ['m', 'd'])).toBe(true)
      expect(ymd({ month: 2, date: 30 }, ['m', 'd'])).toBe(false)
      expect(ymd({ date: 29 }, ['d'])).toBe(true)
    } finally {
      globalThis.Date = RealDate
    }

    // @ts-expect-error mock
    globalThis.Date = class extends RealDate {
      constructor(...args: ConstructorParameters<typeof RealDate> | []) {
        if (args.length === 0) {
          super('2024-03-01T00:00:00Z')
        } else {
          super(...args)
        }
      }
    }

    try {
      expect(ymd({ month: 2, date: 29 }, ['m', 'd'])).toBe(true)
      expect(ymd({ date: 31 }, ['d'])).toBe(true)
    } finally {
      globalThis.Date = RealDate
    }
  })
})
