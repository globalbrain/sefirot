import { map } from 'sefirot/blocks/lens/validation/RuleMapper'
import { day } from 'sefirot/support/Day'

describe('blocks/lens/validation/RuleMapper', () => {
  it('maps required and max_length rules', () => {
    const args = map([
      { type: 'required' },
      { type: 'max_length', length: 10 }
    ]) as any

    expect(Object.keys(args)).toEqual(['required', 'max_length'])
    expect(args.required.$validator('value', null, null)).toBe(true)
    expect(args.required.$validator('', null, null)).toBe(false)
    expect(args.max_length.$validator('1234567890', null, null)).toBe(true)
    expect(args.max_length.$validator('12345678901', null, null)).toBe(false)
  })

  it('maps before rule with an absolute date', () => {
    const args = map([{ type: 'before', date: '2026-01-02' }]) as any

    expect(args.before.$validator(day('2026-01-01'), null, null)).toBe(true)
    expect(args.before.$validator(day('2026-01-02'), null, null)).toBe(false)
  })

  it('maps before_or_equal rule with an absolute date', () => {
    const args = map([{ type: 'before_or_equal', date: '2026-01-02' }]) as any

    expect(args.before_or_equal.$validator(day('2026-01-02'), null, null)).toBe(true)
    expect(args.before_or_equal.$validator(day('2026-01-03'), null, null)).toBe(false)
  })

  it('maps after rule with an absolute date', () => {
    const args = map([{ type: 'after', date: '2026-01-02' }]) as any

    expect(args.after.$validator(day('2026-01-03'), null, null)).toBe(true)
    expect(args.after.$validator(day('2026-01-02'), null, null)).toBe(false)
  })

  it('maps after_or_equal rule with an absolute date', () => {
    const args = map([{ type: 'after_or_equal', date: '2026-01-02' }]) as any

    expect(args.after_or_equal.$validator(day('2026-01-02'), null, null)).toBe(true)
    expect(args.after_or_equal.$validator(day('2026-01-01'), null, null)).toBe(false)
  })

  it('resolves the today keyword to the start of the current day', () => {
    const args = map([{ type: 'after_or_equal', date: 'today' }]) as any
    const startOfToday = day().startOf('day')

    expect(args.after_or_equal.$validator(startOfToday, null, null)).toBe(true)
    expect(args.after_or_equal.$validator(startOfToday.subtract(1, 'day'), null, null)).toBe(false)
  })

  it('resolves tomorrow and yesterday keywords', () => {
    const tomorrow = map([{ type: 'after_or_equal', date: 'tomorrow' }]) as any
    const yesterday = map([{ type: 'before', date: 'yesterday' }]) as any

    const startOfToday = day().startOf('day')

    expect(tomorrow.after_or_equal.$validator(startOfToday.add(1, 'day'), null, null)).toBe(true)
    expect(tomorrow.after_or_equal.$validator(startOfToday, null, null)).toBe(false)

    expect(yesterday.before.$validator(startOfToday.subtract(2, 'day'), null, null)).toBe(true)
    expect(yesterday.before.$validator(startOfToday.subtract(1, 'day'), null, null)).toBe(false)
  })
})
