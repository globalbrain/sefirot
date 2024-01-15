import { maxFileSize } from 'sefirot/validation/validators'

describe('vaidation/validators/maxFileSize', () => {
  it('should validate if the file is smaller than provided size', () => {
    const file = new File([new ArrayBuffer(1_000_000)], 'foo.txt', { type: 'text/plain' })

    expect(maxFileSize(file, '1 GB')).toBe(true)
    expect(maxFileSize(file, '1 MB')).toBe(true)
    expect(maxFileSize(file, '1 KB')).toBe(false)
    expect(maxFileSize(file, '10 B')).toBe(false)
    expect(maxFileSize('file', '10 B')).toBe(false)
  })

  it('assumes size in bytes if no unit is provided', () => {
    const file = new File([new ArrayBuffer(10_000)], 'foo.txt', { type: 'text/plain' })

    expect(maxFileSize(file, '10 KB')).toBe(true)
    expect(maxFileSize(file, '10000')).toBe(true)
    expect(maxFileSize(file, '1 KB')).toBe(false)
    expect(maxFileSize(file, '1000')).toBe(false)
    expect(maxFileSize('file', '1000')).toBe(false)
  })
})
