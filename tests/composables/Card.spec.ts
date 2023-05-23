import { useCardState } from 'sefirot/composables/Card'

describe('composables/Card', () => {
  describe('useCardState', () => {
    test('throws when not provided', () => {
      expect(() => useCardState()).toThrowError()
    })
  })
})
