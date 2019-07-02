import { mount } from '@vue/test-utils'
import SIconSearch from '@/components/icons/SIconSearch'
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

  test('it emits `enter` event when a user key down enter', () => {
    const wrapper = mount(SInputText)

    const input = wrapper.find('.SInputText .input')

    input.element.value = 'ok'
    input.trigger('keypress.enter')

    expect(wrapper.emitted('enter')[0][0]).toBe('ok')
  })

  test('it focuses the input when a user clicks the icon', () => {
    const wrapper = mount(SInputText, {
      propsData: {
        icon: SIconSearch
      }
    })

    const input = wrapper.find('.SInputText .input').element

    wrapper.find('.SInputText .icon').trigger('click')

    expect(input).toBe(document.activeElement);
  })

  test('it shows clear button only when the `value` is not empty', () => {
    const wrapper = mount(SInputText, {
      propsData: {
        clearable: true
      }
    })

    const clear = wrapper.find('.SInputText .clear')

    expect(clear.classes('show')).toBe(false)

    wrapper.setProps({ value: '' })

    expect(clear.classes('show')).toBe(false)

    wrapper.setProps({ value: 'ok' })

    expect(clear.classes('show')).toBe(true)
  })

  test('it emits `clear` event when a user clicks the clear button', () => {
    const wrapper = mount(SInputText, {
      propsData: {
        clearable: true
      }
    })

    wrapper.find('.SInputText .clear').trigger('click')

    expect(wrapper.emitted('clear')[0][0]).toBe(undefined)
  })
})
