import { mount } from '@vue/test-utils'
import SInputRadios from '@/components/inputs/SInputRadios'

describe('Components - Inputs - SInputRadios', () => {
  test('it emits correct value when an user clicks a radio button', () => {
    const options = [
      { label: 'Radio button 1', value: 1 },
      { label: 'Radio button 2', value: 2 },
      { label: 'Radio button 3', value: 3 }
    ]

    const wrapper1 = mount(SInputRadios, {
      propsData: { value: 1, nullable: false, options }
    })

    wrapper1.find('.SInputRadios .col:nth-child(1) .input').trigger('click')

    expect(wrapper1.emitted('change')).toBe(undefined)

    const wrapper2 = mount(SInputRadios, {
      propsData: { value: 1, nullable: false, options }
    })

    wrapper2.find('.SInputRadios .col:nth-child(2) .input').trigger('click')

    expect(wrapper2.emitted('change')[0][0]).toEqual(2)
  })

  test('it can accept no radio to be checked when the `nullable` option are set', () => {
    const options = [
      { label: 'Radio button 1', value: 1 },
      { label: 'Radio button 2', value: 2 },
      { label: 'Radio button 3', value: 3 }
    ]

    const wrapper1 = mount(SInputRadios, {
      propsData: { value: 1, nullable: true, options }
    })

    wrapper1.find('.SInputRadios .col:nth-child(1) .input').trigger('click')

    expect(wrapper1.emitted('change')[0][0]).toBe(null)

    const wrapper2 = mount(SInputRadios, {
      propsData: { value: 1, nullable: true, options }
    })

    wrapper2.find('.SInputRadios .col:nth-child(2) .input').trigger('click')

    expect(wrapper2.emitted('change')[0][0]).toEqual(2)
  })
})
