import { maxValue } from 'sefirot/validation/validators'

describe('validation/validators/maxValue', () => {
  it('returns true when number <= max', () => {
    expect(maxValue(5, 10)).toBe(true)
    expect(maxValue(10, 10)).toBe(true)
  })

  it('returns false when number > max', () => {
    expect(maxValue(11, 10)).toBe(false)
  })

  it('accepts numeric strings', () => {
    expect(maxValue('5', 10)).toBe(true)
    expect(maxValue('10', 10)).toBe(true)
  })

  it('rejects non-numeric strings', () => {
    expect(maxValue('abc', 10)).toBe(false)
    expect(maxValue('123a', 200)).toBe(false)
  })

  it('rejects empty string', () => {
    expect(maxValue('', 0)).toBe(false)
  })

  it('rejects whitespace-only string', () => {
    expect(maxValue('   ', 0)).toBe(false)
  })

  it('accepts Date whose timestamp <= max', () => {
    const d = new Date('2024-01-01T00:00:00.000Z')
    expect(maxValue(d, +d)).toBe(true)
  })

  it('rejects Date whose timestamp > max', () => {
    const d = new Date('2024-01-01T00:00:00.000Z')
    const later = new Date(+d + 1)
    expect(maxValue(later, +d)).toBe(false)
  })

  it('rejects invalid Date', () => {
    const bad = new Date('not-a-date')
    expect(maxValue(bad, Date.now())).toBe(false)
  })

  it('rejects NaN and non-supported types', () => {
    expect(maxValue(Number.NaN, 10)).toBe(false)
    expect(maxValue(true, 10)).toBe(false)
    expect(maxValue({}, 10)).toBe(false)
    expect(maxValue(null, 10)).toBe(false)
    expect(maxValue(undefined, 10)).toBe(false)
  })

  it('rejects comma-formatted strings', () => {
    expect(maxValue('1,000', 1500)).toBe(false)
  })

  it('rejects exponential notation strings', () => {
    expect(maxValue('5e2', 600)).toBe(false)
  })
})
