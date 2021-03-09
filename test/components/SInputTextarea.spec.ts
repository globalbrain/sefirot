import { mount } from '@vue/test-utils'
import SInputTextarea from 'sefirot/components/SInputTextarea.vue'
import useForm from 'sefirot/compositions/useForm'
import { CreateWrapperFn } from '../utils'

type Instance = InstanceType<typeof SInputTextarea>
let createWrapper: CreateWrapperFn<Instance>

describe('components/SInputTextarea', () => {
  beforeEach(() => {
    createWrapper = options => mount(SInputTextarea, options)
  })

  it('should emit value on input', () => {
    const wrapper = createWrapper()

    wrapper.find('.SInputTextarea .input').setValue('ok')
    expect(wrapper.emitted('input')).toHaveEmittedWith('ok')
  })

  it('should emit value when losing focus', () => {
    const wrapper = createWrapper()

    const input = wrapper.find('.SInputTextarea .input')

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

    const input = wrapper.find('.SInputTextarea .input')

    input.setValue('ok')
    input.trigger('blur')

    expect(validation.name.$isDirty.value).toBe(true)
  })
})
