import { maxTotalFileSize } from 'sefirot/validation/rules'

describe('validation/rules/maxTotalFileSize', () => {
  test('validates whether the total size of the given files is smaller than given size', () => {
    const rule = maxTotalFileSize('2mb')

    const file1mb = new File([new ArrayBuffer(1_000_000)], 'foo.txt', { type: 'text/plain' })

    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator([file1mb, file1mb], null, null)).toBe(true)
    expect(rule.$validator([file1mb, file1mb, file1mb], null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = maxTotalFileSize('2mb')
    expect(rule.$message({ $params: { size: '2mb' } })).toBe('The total file size must be smaller than 2mb.')
  })

  test('custom error message', () => {
    const rule = maxTotalFileSize('2mb', 'Custom message.')
    expect(rule.$message({ $params: { size: '2mb' } })).toBe('Custom message.')
  })
})
