import { maxFileSize } from 'sefirot/validation/validators'

describe('validation/validators/maxFileSize', () => {
  test('it validates whether the file is smaller than size', () => {
    const size = '5 KB'

    expect(maxFileSize(new File([new ArrayBuffer(5_000)], 'foo.txt', { type: 'text/plain' }), size)).toBe(true)

    expect(maxFileSize(undefined, size)).toBe(false)
    expect(maxFileSize(null, size)).toBe(false)
    expect(maxFileSize(true, size)).toBe(false)
    expect(maxFileSize(false, size)).toBe(false)
    expect(maxFileSize(1, size)).toBe(false)
    expect(maxFileSize('abc', size)).toBe(false)
    expect(maxFileSize({}, size)).toBe(false)
    expect(maxFileSize([], size)).toBe(false)
    expect(maxFileSize(new File([new ArrayBuffer(10_000)], 'foo.txt', { type: 'text/plain' }), size)).toBe(false)
  })
})
