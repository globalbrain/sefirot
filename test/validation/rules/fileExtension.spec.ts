import { fileExtension } from 'sefirot/validation/rules'

describe('validation/rules/fileExtension', () => {
  test('it creates fileExtension validation rule', () => {
    const file = new File(['foo'], 'foo.txt', { type: 'text/plain' })

    const result = fileExtension(['txt']).validate(file, {})

    expect(result).toBe(true)
  })

  test('it can set custom error message', () => {
    const rule = fileExtension(['txt'], 'Custom message')

    expect(rule.message).toBe('Custom message')
  })
})
