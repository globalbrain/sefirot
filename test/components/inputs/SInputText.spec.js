import { mount } from '@vue/test-utils'
import SInputText from '@/components/inputs/SInputText'

describe('Components - Inputs - SInputText', () => {
  test('it emits `input` event when a user inputs the value', () => {
    const wrapper = mount(SInputText)

    wrapper.find('.SInputText .input').setValue('ok')

    expect(wrapper.emitted('input')[0][0]).toBe('ok')
  })

  test('it emits `blur` event when a user blur from the input', () => {
    const wrapper = mount(SInputText)

    const input = wrapper.find('.SInputText .input')

    input.element.value = 'ok'
    input.trigger('blur')

    expect(wrapper.emitted('blur')[0][0]).toBe('ok')
  })
})
