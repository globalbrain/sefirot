import { mount } from '@vue/test-utils'
import SDropdownSectionFilter from 'sefirot/components/SDropdownSectionFilter.vue'

describe('components/SDropdown', () => {
  describe('SDropdownSectionFilter', () => {
    it('shows avatar type filter', async () => {
      const wrapper = mount(SDropdownSectionFilter, {
        props: {
          selected: 1,
          options: [
            { type: 'avatar', label: 'User A', value: 1 },
            { type: 'avatar', label: 'User B', value: 2 },
            { type: 'avatar', label: 'User C', value: 3 }
          ]
        }
      })

      expect(wrapper.findAll('.SDropdownSectionFilterItemAvatar').length).toBe(3)
    })

    test('hide disabled options', async () => {
      const wrapper = mount(SDropdownSectionFilter, {
        props: {
          selected: 1,
          options: [
            { label: 'Item 001', value: 1 },
            { label: 'Item 002', value: 2, disabled: true },
            { label: 'Item 003', value: 3 }
          ]
        }
      })

      expect(wrapper.findAll('.SDropdownSectionFilter .list .item').length).toBe(2)
    })
  })
})
