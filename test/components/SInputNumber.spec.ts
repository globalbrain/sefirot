import { mount } from '@vue/test-utils'
import SInputNumber from 'sefirot/components/SInputNumber.vue'

describe('components/SInputNumber', () => {
  it('compute the number with thousand separator if `helpFormat` prop is true', () => {
    const wrapper = mount(SInputNumber, {
      propsData: {
        helpFormat: true
      }
    })

    wrapper.setProps({
      value: 1000000
    })

    expect((wrapper.vm as any).valueWithSeparator).toBe('1,000,000')
  })

  it('emits `input` event when a user inputs the value', () => {
    const wrapper = mount(SInputNumber)

    wrapper.find('.SInputNumber .input').setValue(1)

    expect((wrapper.emitted('input') as any)[0][0]).toBe(1)
  })

  it('emits `input` event when a user inputs nothing', () => {
    const wrapper = mount(SInputNumber)

    wrapper.find('.SInputNumber .input').setValue(null)

    expect((wrapper.emitted('input') as any)[0][0]).toBe(null)
  })

  it('emits `blur` event when a user blur form the input', () => {
    const wrapper = mount(SInputNumber)

    const input = wrapper.find('.SInputNumber .input')

    input.setValue(1)
    input.trigger('blur')

    expect((wrapper.emitted('blur') as any)[0][0]).toBe(1)
  })

  it('emits `enter` event when a user key down enter', () => {
    const wrapper = mount(SInputNumber)

    const input = wrapper.find('.SInputNumber .input')

    input.setValue(1)
    input.trigger('keypress.enter')

    expect((wrapper.emitted('enter') as any)[0][0]).toBe(1)
  })
})
