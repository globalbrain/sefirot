import { mount } from '@vue/test-utils'
import SInputYMD from 'sefirot/components/SInputYMD.vue'
import useForm from 'sefirot/compositions/useForm'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SInputYMD', () => {
  beforeEach(() => {
    createWrapper = options => mount(SInputYMD, options)
  })

  it('should emit correct value for year inputs', async () => {
    const wrapper = createWrapper()

    const input = wrapper.find('.SInputYMD .input.year')
    await input.setValue(2000)
    await input.trigger('blur')
    expect(wrapper.emitted('input')).toHaveEmittedWith({ year: 2000 })
  })

  it('should emit correct value for month inputs', async () => {
    const wrapper = createWrapper()

    const input = wrapper.find('.SInputYMD .input.month')
    await input.setValue(12)
    await input.trigger('blur')
    expect(wrapper.emitted('input')).toHaveEmittedWith({ month: 12 })
  })

  it('should emit correct value for date inputs', async () => {
    const wrapper = createWrapper()

    const input = wrapper.find('.SInputYMD .input.date')
    await input.setValue(30)
    await input.trigger('blur')
    expect(wrapper.emitted('input')).toHaveEmittedWith({ date: 30 })
  })

  it('should emit null for empty year inputs', async () => {
    const wrapper = createWrapper()

    const input = wrapper.find('.SInputYMD .input.year')
    await input.setValue('')
    await input.trigger('blur')
    expect(wrapper.emitted('input')).toHaveEmittedWith(null)
  })

  it('should emit null for empty month inputs', async () => {
    const wrapper = createWrapper()

    const input = wrapper.find('.SInputYMD .input.month')
    await input.setValue('')
    await input.trigger('blur')
    expect(wrapper.emitted('input')).toHaveEmittedWith(null)
  })

  it('should emit null for empty date inputs', async () => {
    const wrapper = createWrapper()

    const input = wrapper.find('.SInputYMD .input.date')
    await input.setValue('')
    await input.trigger('blur')
    expect(wrapper.emitted('input')).toHaveEmittedWith(null)
  })

  it('should remove empty key when emitting', async () => {
    const wrapper = createWrapper({
      propsData: {
        value: { year: 2000, month: 12 }
      }
    })

    const input = wrapper.find('.SInputYMD .input.year')
    await input.setValue('')
    await input.trigger('blur')
    expect(wrapper.emitted('input')).toHaveEmittedWith({ month: 12 })
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

    const yInput = wrapper.find('.SInputYMD .input.year')
    const mInput = wrapper.find('.SInputYMD .input.month')
    const dInput = wrapper.find('.SInputYMD .input.date')

    await yInput.trigger('blur')
    expect(validation.time.$isDirty.value).toBe(false)

    await mInput.trigger('blur')
    expect(validation.time.$isDirty.value).toBe(false)

    await dInput.trigger('blur')
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
        date: false,
        value: data.time,
        validation: validation.time
      }
    })

    const yInput = wrapper.find('.SInputYMD .input.year')
    const mInput = wrapper.find('.SInputYMD .input.month')

    await yInput.trigger('blur')
    await mInput.trigger('blur')

    expect(validation.time.$isDirty.value).toBe(true)
  })
})
