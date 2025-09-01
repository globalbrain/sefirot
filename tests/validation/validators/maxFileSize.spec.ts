import { maxFileSize } from 'sefirot/validation/validators'

describe('validation/validators/maxFileSize', () => {
  it('returns false when value is not a File', () => {
    expect(maxFileSize(null, '1MB')).toBe(false)
    expect(maxFileSize({}, '1MB')).toBe(false)
    expect(maxFileSize('not a file', '1MB')).toBe(false)
  })

  it('treats plain numbers as bytes', () => {
    expect(maxFileSize(f(500), '500')).toBe(true)
    expect(maxFileSize(f(501), '500')).toBe(false)
  })

  it('accepts KB/MB', () => {
    expect(maxFileSize(f(1000), '1kb')).toBe(true)
    expect(maxFileSize(f(1001), '1KB')).toBe(false)
    expect(maxFileSize(f(1_500_000), '1.5MB')).toBe(true)
    expect(maxFileSize(f(1_500_001), '1.5mb')).toBe(false)
  })

  it('respects equality boundary', () => {
    expect(maxFileSize(f(1_000_000), '1MB')).toBe(true)
  })

  it('returns false for invalid size strings', () => {
    expect(maxFileSize(f(10), 'abc')).toBe(false)
  })

  it('accepts sizes with decimal points', () => {
    expect(maxFileSize(f(1500), '1.5KB')).toBe(true)
    expect(maxFileSize(f(1501), '1.5KB')).toBe(false)
  })
})

function f(bytes: number) {
  return new File([new Uint8Array(bytes)], 'foo.txt', { type: 'text/plain' })
}
