import { mount } from '@vue/test-utils'
import SInputDropdown from 'sefirot/components/SInputDropdown.vue'
import { type Option } from 'sefirot/support/InputDropdown'

const options: Option[] = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Bravo' }
]

describe('components/SInputDropdown', () => {
  // Single vs multi is inferred from the model at runtime: an array model selects
  // multiple (rendered as a chip list), anything else a single value.
  it('treats an array model as multi-select (chip list)', () => {
    const wrapper = mount(SInputDropdown, {
      props: { options, modelValue: ['a', 'b'] } as any
    })

    expect(wrapper.find('.SInputDropdownItem .many').exists()).toBe(true)
    expect(wrapper.find('.SInputDropdownItem .one').exists()).toBe(false)
  })

  it('treats a non-array model as single-select', () => {
    const wrapper = mount(SInputDropdown, {
      props: { options, modelValue: 'a' } as any
    })

    expect(wrapper.find('.SInputDropdownItem .one').exists()).toBe(true)
    expect(wrapper.find('.SInputDropdownItem .many').exists()).toBe(false)
  })
})
