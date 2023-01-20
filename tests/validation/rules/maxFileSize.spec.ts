import { maxFileSize } from 'sefirot/validation/rules'

describe('validation/rules/maxFileSize', () => {
  test('it validates whether the file is smaller than size', () => {
    const rule = maxFileSize('5 KB')
    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(new File([new ArrayBuffer(5_000)], 'foo.txt', { type: 'text/plain' }), null, null)).toBe(true)
    expect(rule.$validator(new File([new ArrayBuffer(10_000)], 'foo.txt', { type: 'text/plain' }), null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = maxFileSize('5 MB')
    expect(rule.$message({ $params: { size: '5 MB' } })).toBe('The file must be smaller than 5 MB.')
  })

  test('custom error message', () => {
    const rule = maxFileSize('5 MB', 'Custom message.')
    expect(rule.$message({ $params: { size: '5 MB' } })).toBe('Custom message.')
  })
})
