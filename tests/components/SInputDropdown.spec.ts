import { mount } from '@vue/test-utils'
import SInputDropdown from 'sefirot/components/SInputDropdown.vue'
import { type Option } from 'sefirot/support/Option'

const options: Option[] = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Bravo' }
]

describe('components/SInputDropdown', () => {
  // `multiple` is a generic-typed prop (`boolean & Multiple`); the intersection is
  // what preserves Vue's Boolean casting. A bare attribute arrives as '', which must
  // still be read as `true` — otherwise the control silently falls back to single.
  it('casts a bare `multiple` attribute to true and renders the selection as a chip list', () => {
    const wrapper = mount(SInputDropdown, {
      props: { options, modelValue: ['a', 'b'], multiple: '' } as any
    })

    expect(wrapper.find('.SInputDropdownItem .many').exists()).toBe(true)
    expect(wrapper.find('.SInputDropdownItem .one').exists()).toBe(false)
  })

  it('defaults to single select and renders a single chip', () => {
    const wrapper = mount(SInputDropdown, {
      props: { options, modelValue: 'a' } as any
    })

    expect(wrapper.find('.SInputDropdownItem .one').exists()).toBe(true)
    expect(wrapper.find('.SInputDropdownItem .many').exists()).toBe(false)
  })
})
