import { mount } from '@vue/test-utils'
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'

describe('components/SCard', () => {
  describe('SCard', () => {
    it('renders `SCard` element', () => {
      const wrapper = mount(SCard)
      expect(wrapper.find('.SCard').exists()).toBe(true)
    })
  })

  describe('SCardBlock', () => {
    it('renders `SCardBlock` element', () => {
      const wrapper = mount(SCardBlock)
      expect(wrapper.find('.SCardBlock').exists()).toBe(true)
    })
  })
})
