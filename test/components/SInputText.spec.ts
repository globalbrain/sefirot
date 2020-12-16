import { mount } from '@vue/test-utils'
import useForm from 'sefirot/compositions/useForm'
import SIconSearch from 'sefirot/components/icons/SIconSearch.vue'
import SInputText from 'sefirot/components/SInputText.vue'

describe('components/SInputText', () => {
  it('emits `input` event when a user inputs the value', () => {
    const wrapper = mount(SInputText)

    wrapper.find('.SInputText .input').setValue('ok')

    expect((wrapper.emitted('input') as any)[0][0]).toBe('ok')
  })

  it('emits `blur` event when a user blur from the input', () => {
    const wrapper = mount(SInputText)

    const input = wrapper.find('.SInputText .input')

    input.setValue('ok')
    input.trigger('blur')

    expect((wrapper.emitted('blur') as any)[0][0]).toBe('ok')
  })

  it('"touches" the validation on blur event', () => {
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

  it('emits `enter` event when a user key down enter', () => {
    const wrapper = mount(SInputText)

    const input = wrapper.find('.SInputText .input')

    input.setValue('ok')
    input.trigger('keypress.enter')

    expect((wrapper.emitted('enter') as any)[0][0]).toBe('ok')
  })

  it('focus the input when the user clicks the icon', async () => {
    const wrapper = mount(SInputText, {
      propsData: {
        icon: SIconSearch
      }
    })

    const input = wrapper.find('.SInputText .input')
    const icon = wrapper.find('.SInputText .icon')

    await icon.trigger('click')

    expect(input.element === document.activeElement)
  })

  it('sets correct padding styles when there is `text`', () => {
    const wrapper = mount(SInputText, {
      propsData: {
        text: 'a',
        textAfter: 'b'
      }
    })

    expect((wrapper.vm as any).inputStyles.paddingRight).toBe('0px')
    expect((wrapper.vm as any).inputStyles.paddingLeft).toBe('0px')
  })

  it('emits `clear` event when a user clicks the clear button', async () => {
    const wrapper = mount(SInputText, {
      propsData: {
        clearable: true
      }
    })

    const clearButton = wrapper.find('.SInputText .clear')

    expect(clearButton.classes('show')).toBe(false)

    await wrapper.setProps({ value: null })
    expect(clearButton.classes('show')).toBe(false)

    await wrapper.setProps({ value: '' })
    expect(clearButton.classes('show')).toBe(false)

    await wrapper.setProps({ value: 'Hello' })
    expect(clearButton.classes('show')).toBe(true)

    wrapper.find('.SInputText .clear').trigger('click')

    expect((wrapper.emitted('clear') as any)[0][0]).toBe(undefined)
  })
})
