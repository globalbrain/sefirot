import { mount } from '@vue/test-utils'
import SInputTextarea from 'sefirot/components/SInputTextarea.vue'

describe('components/SInputTextarea', () => {
  test('it emits `input` event when a user inputs the value', () => {
    const wrapper = mount(SInputTextarea)

    wrapper.find('.SInputTextarea .input').setValue('ok')

    expect((wrapper.emitted('input') as any)[0][0]).toBe('ok')
  })

  test('it emits `blur` event when a user blur from the input', () => {
    const wrapper = mount(SInputTextarea)

    const input = wrapper.find('.SInputTextarea .input') as any

    input.element.value = 'ok'
    input.trigger('blur')

    expect((wrapper.emitted('blur') as any)[0][0]).toBe('ok')
  })
})
