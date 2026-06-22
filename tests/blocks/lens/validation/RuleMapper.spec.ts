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

  it('maps slack_channel_link rule', () => {
    const args = map([{ type: 'slack_channel_link' }]) as any

    expect(args.slack_channel_link.$validator('https://acme.slack.com/archives/C0123ABCDEF', null, null)).toBe(true)
    expect(args.slack_channel_link.$validator('not a link', null, null)).toBe(false)
  })

  it('maps slack_channel_name rule', () => {
    const args = map([{ type: 'slack_channel_name', offset: 0 }]) as any

    expect(args.slack_channel_name.$validator('my-channel', null, null)).toBe(true)
    expect(args.slack_channel_name.$validator('Invalid Channel', null, null)).toBe(false)
  })

  it('applies the offset when mapping slack_channel_name rule', () => {
    const args = map([{ type: 'slack_channel_name', offset: 2 }]) as any

    expect(args.slack_channel_name.$validator('a'.repeat(78), null, null)).toBe(true)
    expect(args.slack_channel_name.$validator('a'.repeat(79), null, null)).toBe(false)
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

  it('maps min_length rule', () => {
    const args = map([{ type: 'min_length', length: 3 }]) as any

    expect(args.min_length.$validator('abc', null, null)).toBe(true)
    expect(args.min_length.$validator('ab', null, null)).toBe(false)
  })

  it('maps min_value and max_value rules', () => {
    const args = map([
      { type: 'min_value', value: 10 },
      { type: 'max_value', value: 20 }
    ]) as any

    expect(args.min_value.$validator(10, null, null)).toBe(true)
    expect(args.min_value.$validator(9, null, null)).toBe(false)
    expect(args.max_value.$validator(20, null, null)).toBe(true)
    expect(args.max_value.$validator(21, null, null)).toBe(false)
  })

  it('maps email rule', () => {
    const args = map([{ type: 'email' }]) as any

    expect(args.email.$validator('jane@example.com', null, null)).toBe(true)
    expect(args.email.$validator('not-an-email', null, null)).toBe(false)
  })

  it('maps url rule', () => {
    const args = map([{ type: 'url' }]) as any

    expect(args.url.$validator('https://example.com', null, null)).toBe(true)
    expect(args.url.$validator('not a url', null, null)).toBe(false)
  })

  it('maps decimal rule', () => {
    const args = map([{ type: 'decimal' }]) as any

    expect(args.decimal.$validator(3.14, null, null)).toBe(true)
    expect(args.decimal.$validator('abc', null, null)).toBe(false)
  })

  it('maps decimal_or_hyphen rule', () => {
    const args = map([{ type: 'decimal_or_hyphen' }]) as any

    expect(args.decimal_or_hyphen.$validator('-', null, null)).toBe(true)
    expect(args.decimal_or_hyphen.$validator(3.14, null, null)).toBe(true)
    expect(args.decimal_or_hyphen.$validator('abc', null, null)).toBe(false)
  })

  it('maps the integer sign rules', () => {
    const args = map([
      { type: 'positive_integer' },
      { type: 'negative_integer' },
      { type: 'zero_or_positive_integer' },
      { type: 'zero_or_negative_integer' }
    ]) as any

    expect(args.positive_integer.$validator(1, null, null)).toBe(true)
    expect(args.positive_integer.$validator(0, null, null)).toBe(false)
    expect(args.negative_integer.$validator(-1, null, null)).toBe(true)
    expect(args.negative_integer.$validator(0, null, null)).toBe(false)
    expect(args.zero_or_positive_integer.$validator(0, null, null)).toBe(true)
    expect(args.zero_or_positive_integer.$validator(-1, null, null)).toBe(false)
    expect(args.zero_or_negative_integer.$validator(0, null, null)).toBe(true)
    expect(args.zero_or_negative_integer.$validator(1, null, null)).toBe(false)
  })

  it('maps checked rule', () => {
    const args = map([{ type: 'checked' }]) as any

    expect(args.checked.$validator(true, null, null)).toBe(true)
    expect(args.checked.$validator(false, null, null)).toBe(false)
  })

  it('maps each rule, validating every array element', () => {
    const args = map([
      { type: 'each', rules: [{ type: 'max_length', length: 5 }] }
    ]) as any

    expect(args.each.$validator(['ok', 'fine'], null, null)).toBe(true)
    expect(args.each.$validator(['ok', 'toolong'], null, null)).toBe(false)
    expect(args.each.$validator('not-an-array', null, null)).toBe(false)
    // An empty array defers to `required`, so the each rule alone passes it.
    expect(args.each.$validator([], null, null)).toBe(true)
  })

  it('maps each rule with a required child, rejecting empty elements', () => {
    const args = map([{ type: 'each', rules: [{ type: 'required' }] }]) as any

    expect(args.each.$validator(['a', 'b'], null, null)).toBe(true)
    expect(args.each.$validator(['a', ''], null, null)).toBe(false)
  })

  it('maps each rule, dropping server-only children but keeping the rest', () => {
    const args = map([
      { type: 'each', rules: [{ type: 'unique' }, { type: 'max_length', length: 5 }] }
    ]) as any

    expect(args.each.$validator(['ok'], null, null)).toBe(true)
    expect(args.each.$validator(['toolong'], null, null)).toBe(false)
  })

  it('composes multiple each rules instead of keeping only the last', () => {
    const args = map([
      { type: 'each', rules: [{ type: 'min_length', length: 2 }] },
      { type: 'each', rules: [{ type: 'max_length', length: 4 }] }
    ]) as any

    expect(args.each.$validator(['abc'], null, null)).toBe(true)
    expect(args.each.$validator(['a'], null, null)).toBe(false)
    expect(args.each.$validator(['abcde'], null, null)).toBe(false)
  })

  describe('relative date keywords', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2026-06-15T12:34:56Z'))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('resolves the now keyword to the current instant', () => {
      const args = map([{ type: 'after', date: 'now' }]) as any
      const now = day()

      expect(args.after.$validator(now.add(1, 'day'), null, null)).toBe(true)
      expect(args.after.$validator(now.subtract(1, 'day'), null, null)).toBe(false)
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

  it('throws on an invalid date string', () => {
    expect(() => map([{ type: 'before', date: 'not-a-date' }]))
      .toThrow('Invalid date string in validation rule: "not-a-date"')
  })

  it('throws on an unsupported rule type', () => {
    expect(() => map([{ type: 'unknown_rule' } as any]))
      .toThrow('Unsupported rule type: unknown_rule')
  })
})
