import { mount } from '@vue/test-utils'
import useForm from 'sefirot/compositions/useForm'
import SIconSearch from 'sefirot/components/icons/SIconSearch.vue'
import SInputText from 'sefirot/components/SInputText.vue'

describe('Components - SInputText', () => {
  test('it emits `input` event when a user inputs the value', () => {
    const wrapper = mount(SInputText)

    wrapper.find('.SInputText .input').setValue('ok')

    expect(wrapper.emitted('input')[0][0]).toBe('ok')
  })

  test('it emits `blur` event when a user blur from the input', () => {
    const wrapper = mount(SInputText)

    const input = wrapper.find('.SInputText .input')

    input.setValue('ok')
    input.trigger('blur')

    expect(wrapper.emitted('blur')[0][0]).toBe('ok')
  })

  test('it "touches" the validation on blur event', () => {
    const { data, validation } = useForm({
      data: { name: '' },
      rules: { name: [] }
    })

    const wrapper = mount(SInputText, {
      propsData: { value: data.name, validation }
    })

    const input = wrapper.find('.SInputText .input')

    input.setValue('ok')
    input.trigger('blur')

    expect(validation.name.$isDirty.value).toBe(true)
  })

  test('it emits `enter` event when a user key down enter', () => {
    const wrapper = mount(SInputText)

    const input = wrapper.find('.SInputText .input')

    input.setValue('ok')
    input.trigger('keypress.enter')

    expect(wrapper.emitted('enter')[0][0]).toBe('ok')
  })

  test('it shows clear button only when the `value` is not empty', async () => {
    const wrapper = mount(SInputText, {
      propsData: {
        value: '',
        clearable: true
      }
    })

    const clear = wrapper.find('.SInputText .clear')

    expect(clear.classes('show')).toBe(false)

    wrapper.setProps({ value: '' })

    expect(clear.classes('show')).toBe(false)

    wrapper.setProps({ value: 'ok' })

    await wrapper.vm.$nextTick()

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
