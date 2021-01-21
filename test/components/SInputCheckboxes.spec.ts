import { mount } from '@vue/test-utils'
import SInputCheckboxes from 'sefirot/components/SInputCheckboxes.vue'

describe('components/SInputCheckboxes', () => {
  test('it emits correct value when an user clicks a checkbox', () => {
    const options = [
      { label: 'Check box 1', value: 1 },
      { label: 'Check box 2', value: 2 },
      { label: 'Check box 3', value: 3 }
    ]

    const wrapper1 = mount(SInputCheckboxes, {
      propsData: { value: [], options }
    })

    wrapper1.find('.SInputCheckboxes .col:nth-child(1) .input').trigger('click')

    expect(wrapper1.emitted('change')?.[0][0]).toEqual([1])

    const wrapper2 = mount(SInputCheckboxes, {
      propsData: { value: [1], options }
    })

    wrapper2.find('.SInputCheckboxes .col:nth-child(2) .input').trigger('click')

    expect(wrapper2.emitted('change')?.[0][0]).toEqual([1, 2])

    const wrapper3 = mount(SInputCheckboxes, {
      propsData: { value: [1, 2], options }
    })

    wrapper3.find('.SInputCheckboxes .col:nth-child(1) .input').trigger('click')

    expect(wrapper3.emitted('change')?.[0][0]).toEqual([2])
  })
})
