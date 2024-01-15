import { maxTotalFileSize } from 'sefirot/validation/validators'

describe('vaidation/validators/maxTotalFileSize', () => {
  test('validates if the total size of the given files is smaller than the given size', () => {
    const file1mb = new File([new ArrayBuffer(1_000_000)], 'foo.txt', { type: 'text/plain' })

    expect(maxTotalFileSize([file1mb, file1mb], '1gb')).toBe(true)
    expect(maxTotalFileSize([file1mb, file1mb], '3mb')).toBe(true)
    expect(maxTotalFileSize([file1mb, file1mb], '1.5mb')).toBe(false)
    expect(maxTotalFileSize([file1mb], '2mb')).toBe(true)
    expect(maxTotalFileSize([file1mb], '5kb')).toBe(false)
    expect(maxTotalFileSize([file1mb], '1')).toBe(false)
    expect(maxTotalFileSize([file1mb, 'file1mb'], '1')).toBe(false)
  })
})
