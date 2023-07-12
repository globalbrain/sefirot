import { mount } from '@vue/test-utils'
import SMedium from 'sefirot/components/SMedium.vue'

describe('components/SMedium', () => {
  test('renders `SMedium` element', () => {
    const wrapper = mount(SMedium)
    expect(wrapper.find('.SMedium').exists()).toBe(true)
  })
})
