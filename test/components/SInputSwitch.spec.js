import { mount } from '@vue/test-utils'
import SInputSwitch from 'sefirot/components/SInputSwitch'

describe('Components - Inputs - SInputSwitch', () => {
  test('it emits `change` event when a user click the switch', () => {
    const wrapper = mount(SInputSwitch, {
      propsData: {
        text: 'Switch text',
        value: false
      }
    })

    wrapper.find('.SInputSwitch .input').trigger('click')

    expect(wrapper.emitted('change')[0][0]).toBe(true)
  })
})
