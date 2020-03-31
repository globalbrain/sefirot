import { url } from 'sefirot/validation/validators'

describe('validation/validators/url', () => {
  test('it validates if the value is valid url', () => {
    const checks = [
      ['http://example.com', true],
      ['https://example.com', true],
      ['http://example.com/nested/path', true],
      ['https://example.com/nested/path', true],
      ['http://example', false],
      ['https://example', false]
    ]

    checks.forEach((check) => {
      expect(url(check[0])).toBe(check[1])
    })
  })
})
