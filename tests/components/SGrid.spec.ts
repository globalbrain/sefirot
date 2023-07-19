import { mount } from '@vue/test-utils'
import SGrid from 'sefirot/components/SGrid.vue'
import SGridItem from 'sefirot/components/SGridItem.vue'

describe('components/SGrid', () => {
  describe('SGrid', () => {
    test('renders `SGrid` element', () => {
      const wrapper = mount(SGrid)
      expect(wrapper.find('.SGrid').exists()).toBe(true)
    })
  })

  describe('SGridItem', () => {
    test('renders `SGridItem` element', () => {
      const wrapper = mount(SGridItem)
      expect(wrapper.find('.SGridItem').exists()).toBe(true)
    })
  })
})
