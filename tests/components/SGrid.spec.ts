import { mount } from '@vue/test-utils'
import SGrid from 'sefirot/components/SGrid.vue'
import SGridItem from 'sefirot/components/SGridItem.vue'

describe('components/SGrid', () => {
  describe('SGrid', () => {
    test('renders `SGrid` element', () => {
      const wrapper = mount(SGrid)
      expect(wrapper.find('.SGrid').exists()).toBe(true)
    })

    test('adds proper grid-template-columns and gap styles', () => {
      const wrapper = mount(SGrid, {
        propsData: {
          cols: 3,
          gap: 10
        }
      })
      expect(wrapper.html()).toContain('--grid-template-columns: repeat(3, minmax(0, 1fr));')
      expect(wrapper.html()).toContain('--gap: 10px;')
    })
  })

  describe('SGridItem', () => {
    test('renders `SGridItem` element', () => {
      const wrapper = mount(SGridItem)
      expect(wrapper.find('.SGridItem').exists()).toBe(true)
    })
  })
})
