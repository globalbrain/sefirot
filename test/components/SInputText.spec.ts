import { mount } from '@vue/test-utils'
import SIconSearch from 'sefirot/components/icons/SIconSearch.vue'
import SInputText from 'sefirot/components/SInputText.vue'
import useForm from 'sefirot/compositions/useForm'
import { CreateWrapperFn } from '../utils'

type Instance = InstanceType<typeof SInputText>
let createWrapper: CreateWrapperFn<Instance>

describe('components/SInputText', () => {
  beforeEach(() => {
    createWrapper = options => mount(SInputText, options)
  })

  it('should emit value on input', () => {
    const wrapper = createWrapper()

    wrapper.find('.SInputText .input-area').setValue('ok')
    expect(wrapper.emitted('input')).toHaveEmittedWith('ok')
  })

  it('should emit value when losing focus', () => {
    const wrapper = createWrapper()

    const input = wrapper.find('.SInputText .input-area')

    input.setValue('ok')
    input.trigger('blur')

    expect(wrapper.emitted('blur')).toHaveEmittedWith('ok')
  })

  it('should invoke validation when losing focus', () => {
    const { data, validation } = useForm({
      data: { name: '' },
      rules: { name: [] }
    })

    const wrapper = createWrapper({
      propsData: {
        value: data.name,
        validation
      }
    })

    const input = wrapper.find('.SInputText .input-area')

    input.setValue('ok')
    input.trigger('blur')

    expect(validation.name.$isDirty.value).toBe(true)
  })

  it('should emit value on `enter` keypress', () => {
    const wrapper = createWrapper()

    const input = wrapper.find('.SInputText .input-area')

    input.setValue('ok')
    input.trigger('keypress.enter')

    expect(wrapper.emitted('enter')).toHaveEmittedWith('ok')
  })

  it('should focus on icon click', async () => {
    const wrapper = createWrapper({
      propsData: {
        icon: SIconSearch
      }
    })

    const input = wrapper.find('.SInputText .input-area')
    const icon = wrapper.find('.SInputText .icon')

    await icon.trigger('click')
    expect(input.element === document.activeElement)
  })

  it('should apply correct padding on non-empty value', () => {
    const wrapper = createWrapper({
      propsData: {
        text: 'a',
        textAfter: 'b'
      }
    })

    expect(wrapper.vm.inputStyles).toHaveProperty('paddingLeft', '0px')
    expect(wrapper.vm.inputStyles).toHaveProperty('paddingRight', '0px')
  })

  it('should toggle `clear` button', async () => {
    const wrapper = createWrapper({
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
  })

  it('should emit when input is cleared', () => {
    const wrapper = createWrapper({
      propsData: {
        value: 'John Doe',
        clearable: true
      }
    })

    wrapper.find('.SInputText .clear').trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  it('should apply color according to input value', async () => {
    const wrapper = createWrapper({
      propsData: {
        color: (value: string) => value.length > 3 ? 'success' : 'info'
      }
    })

    const input = wrapper.find('.SInputText .input')

    await wrapper.setProps({ value: 'abcde' })
    expect(input.classes('success')).toBeTruthy()

    await wrapper.setProps({ value: 'ab' })
    expect(input.classes('info')).toBeTruthy()
  })
})
