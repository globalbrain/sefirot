import { mount } from '@vue/test-utils'
import SInputHMS from 'sefirot/components/SInputHMS.vue'
import useForm from 'sefirot/compositions/useForm'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SInputHMS', () => {
  beforeEach(() => {
    createWrapper = options => mount(SInputHMS, options)
  })

  it('should emit correct value for hour inputs', async () => {
    const wrapper = createWrapper()

    const input = wrapper.find('.SInputHMS .input.hour')
    await input.setValue(1)
    await input.trigger('blur')
    expect(wrapper.emitted('input')).toHaveEmittedWith({ hour: '1' })
  })

  it('should emit correct value for minute inputs', async () => {
    const wrapper = createWrapper()

    const input = wrapper.find('.SInputHMS .input.minute')
    await input.setValue(1)
    await input.trigger('blur')
    expect(wrapper.emitted('input')).toHaveEmittedWith({ minute: '01' })
  })

  it('should emit correct value for second inputs', async () => {
    const wrapper = createWrapper()

    const input = wrapper.find('.SInputHMS .input.second')
    await input.setValue(1)
    await input.trigger('blur')
    expect(wrapper.emitted('input')).toHaveEmittedWith({ second: '01' })
  })

  it('should emit null for empty hour inputs', async () => {
    const wrapper = createWrapper()

    const input = wrapper.find('.SInputHMS .input.hour')
    await input.setValue('')
    await input.trigger('blur')
    expect(wrapper.emitted('input')).toHaveEmittedWith(null)
  })

  it('should emit null for empty minute inputs', async () => {
    const wrapper = createWrapper()

    const input = wrapper.find('.SInputHMS .input.minute')
    await input.setValue('')
    await input.trigger('blur')
    expect(wrapper.emitted('input')).toHaveEmittedWith(null)
  })

  it('should emit null for empty second inputs', async () => {
    const wrapper = createWrapper()

    const input = wrapper.find('.SInputHMS .input.second')
    await input.setValue('')
    await input.trigger('blur')
    expect(wrapper.emitted('input')).toHaveEmittedWith(null)
  })

  it('should emit null of the value is invalid', async () => {
    const wrapper = createWrapper()

    const input = wrapper.find('.SInputHMS .input.hour')
    await input.setValue('ABCDE')
    await input.trigger('blur')
    expect(wrapper.emitted('input')).toHaveEmittedWith(null)
  })

  it('should remove empty key when emitting', async () => {
    const wrapper = createWrapper({
      propsData: {
        value: { hour: '1', minute: '01' }
      }
    })

    const input = wrapper.find('.SInputHMS .input.hour')
    await input.setValue('')
    await input.trigger('blur')
    expect(wrapper.emitted('input')).toHaveEmittedWith({ minute: '01' })
  })

  it('should trigger validation $touch method when all fields are filled', async () => {
    const { data, validation } = useForm({
      data: {
        time: null
      },
      rules: {
        time: []
      }
    })

    const wrapper = createWrapper({
      propsData: {
        value: data.time,
        validation: validation.time
      }
    })

    const hInput = wrapper.find('.SInputHMS .input.hour')
    const mInput = wrapper.find('.SInputHMS .input.minute')
    const sInput = wrapper.find('.SInputHMS .input.second')

    await hInput.trigger('blur')
    await mInput.trigger('blur')
    await sInput.trigger('blur')

    expect(validation.time.$isDirty.value).toBe(true)
  })

  it('should trigger validation $touch by touching only visible inputs', async () => {
    const { data, validation } = useForm({
      data: {
        time: null
      },
      rules: {
        time: []
      }
    })

    const wrapper = createWrapper({
      propsData: {
        second: false,
        value: data.time,
        validation: validation.time
      }
    })

    const hInput = wrapper.find('.SInputHMS .input.hour')
    const mInput = wrapper.find('.SInputHMS .input.minute')

    await hInput.trigger('blur')
    await mInput.trigger('blur')

    expect(validation.time.$isDirty.value).toBe(true)
  })
})
