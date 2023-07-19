import { mount } from '@vue/test-utils'
import SContent from 'sefirot/components/SContent.vue'

describe('components/SContent', () => {
  test('renders `SContent` element', () => {
    const wrapper = mount(SContent)
    expect(wrapper.find('.SContent').exists()).toBe(true)
  })
})
