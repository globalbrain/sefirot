import { mount } from '@vue/test-utils'
import SDesc from 'sefirot/components/SDesc.vue'
import SDescItem from 'sefirot/components/SDescItem.vue'
import SDescLabel from 'sefirot/components/SDescLabel.vue'
import SDescText from 'sefirot/components/SDescText.vue'

describe('components/SDesc', () => {
  describe('SDesc', () => {
    test('renders `SDesc` element', () => {
      const wrapper = mount(SDesc)
      expect(wrapper.find('.SDesc').exists()).toBe(true)
    })
  })

  describe('SDescItem', () => {
    test('renders `SDescItem` element', () => {
      const wrapper = mount(SDescItem)
      expect(wrapper.find('.SDescItem').exists()).toBe(true)
    })
  })

  describe('SDescLabel', () => {
    test('renders `SDescLabel` element', () => {
      const wrapper = mount(SDescLabel)
      expect(wrapper.find('.SDescLabel').exists()).toBe(true)
    })
  })

  describe('SDescText', () => {
    test('renders `:value`', () => {
      const wrapper = mount(SDescText, {
        props: {
          value: 'John Doe'
        }
      })

      expect(wrapper.find('.SDescText').text()).toBe('John Doe')
    })
  })
})
