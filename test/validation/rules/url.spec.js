import url from '@/validation/rules/url'

describe('Validation - Rules - url', () => {
  test('it validates if the value is valid url', () => {
    const rule = url('Error message')

    expect(rule('https://example.com')).toBe(true)
    expect(rule('http://example.com')).toBe(true)
    expect(rule('https://example.com/path')).toBe(true)
    expect(rule('invalid-url')).toBe(false)
  })
})
