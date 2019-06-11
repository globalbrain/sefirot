import sameAs from '@/validation/rules/sameAs'

describe('Validation - Rules - sameAs', () => {
  test('it validates if the value is valid sameAs', () => {
    const rule = sameAs('other', 'Error message')

    expect(rule).not.toBe(null)
  })
})
