import { mount } from '@vue/test-utils'
import SHead from 'sefirot/components/SHead.vue'
import SHeadLead from 'sefirot/components/SHeadLead.vue'
import SHeadTitle from 'sefirot/components/SHeadTitle.vue'

describe('components/SHead', () => {
  describe('SHead', () => {
    test('renders `SHead` element', () => {
      const wrapper = mount(SHead)
      expect(wrapper.find('.SHead').exists()).toBe(true)
    })

    test('renders `SHeadTitle` element', () => {
      const wrapper = mount(SHeadTitle)
      expect(wrapper.find('.SHeadTitle').exists()).toBe(true)
    })

    test('renders `SHeadLead` element', () => {
      const wrapper = mount(SHeadLead)
      expect(wrapper.find('.SHeadLead').exists()).toBe(true)
    })
  })
})
