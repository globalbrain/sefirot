import { mount } from '@vue/test-utils'
import { useCardState } from 'sefirot/composables/Card'

describe('composables/Card', () => {
  describe('useCardState', () => {
    it('throws when not provided', () => {
      expect(() => mount(() => {
        useCardState()
      })).toThrowErrorMatchingInlineSnapshot('[Error: [sefirot] Unexpected call to `useCardState`. This probably means you are using `<SCard>` child component outside of `<SCard>`. Make sure to wrap the component within `<SCard>` component.]')
    })
  })
})
