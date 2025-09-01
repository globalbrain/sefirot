import { maxTotalFileSize } from 'sefirot/validation/validators'

describe('validation/validators/maxTotalFileSize', () => {
  it('returns false when value is not an array', () => {
    expect(maxTotalFileSize(null as any, '1MB')).toBe(false)
    expect(maxTotalFileSize({} as any, '1MB')).toBe(false)
    expect(maxTotalFileSize('not a file' as any, '1MB')).toBe(false)
    expect(maxTotalFileSize(f(100), '1MB') as any).toBe(false)
  })

  it('returns false when array contains non-File elements', () => {
    expect(maxTotalFileSize([f(100), {} as any], '1MB')).toBe(false)
  })

  it('accepts valid arrays of Files and compares total size', () => {
    const files = [f(500_000), f(400_000)]
    expect(maxTotalFileSize(files, '1MB')).toBe(true) // 900k <= 1e6
    expect(maxTotalFileSize([...files, f(200_000)], '1MB')).toBe(false) // 1.1M > 1e6
  })

  it('accepts KB/MB suffixes', () => {
    expect(maxTotalFileSize([f(1000)], '1kb')).toBe(true)
    expect(maxTotalFileSize([f(1_500_000)], '1.5MB')).toBe(true)
    expect(maxTotalFileSize([f(1_500_001)], '1.5MB')).toBe(false)
  })

  it('treats plain numbers as bytes', () => {
    expect(maxTotalFileSize([f(500)], '500')).toBe(true)
    expect(maxTotalFileSize([f(501)], '500')).toBe(false)
  })

  it('respects equality', () => {
    expect(maxTotalFileSize([f(1_000_000)], '1MB')).toBe(true)
  })

  it('returns true for empty array', () => {
    expect(maxTotalFileSize([], '1MB')).toBe(true)
  })

  it('returns false for invalid size strings', () => {
    expect(maxTotalFileSize([], 'abc')).toBe(false)
    expect(maxTotalFileSize([f(10)], 'abc')).toBe(false)
  })
})

function f(bytes: number) {
  return new File([new Uint8Array(bytes)], 'foo.txt', { type: 'text/plain' })
}
