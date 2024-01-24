import { maxTotalFileSize } from 'sefirot/validation/validators'

describe('validation/validators/maxTotalFileSize', () => {
  test('validates whether the total size of the given files is smaller than given size', () => {
    const size = '2mb'
    const file1mb = new File([new ArrayBuffer(1_000_000)], 'foo.txt', { type: 'text/plain' })

    expect(maxTotalFileSize([], size)).toBe(true)
    expect(maxTotalFileSize([file1mb, file1mb], size)).toBe(true)

    expect(maxTotalFileSize(undefined, size)).toBe(false)
    expect(maxTotalFileSize(null, size)).toBe(false)
    expect(maxTotalFileSize(true, size)).toBe(false)
    expect(maxTotalFileSize(false, size)).toBe(false)
    expect(maxTotalFileSize(1, size)).toBe(false)
    expect(maxTotalFileSize('abc', size)).toBe(false)
    expect(maxTotalFileSize({}, size)).toBe(false)
    expect(maxTotalFileSize([file1mb, file1mb, file1mb], size)).toBe(false)
    expect(maxTotalFileSize([file1mb, 'file1mb'], size)).toBe(false)
  })
})
