
import { mount } from '@vue/test-utils'
import VCalendar from 'v-calendar'
import useForm from 'sefirot/compositions/useForm'
import SInputDate from 'sefirot/components/SInputDate.vue'
import { createVue, CreateWrapperFn } from '../utils'

type Instance = InstanceType<typeof SInputDate>
let createWrapper: CreateWrapperFn<Instance>

const { localVue } = createVue()
  .use(VCalendar, { firstDayOfWeek: 1 })

jest.useFakeTimers()

describe('components/SInputDate', () => {
  beforeEach(() => {
    createWrapper = options => mount(SInputDate, {
      localVue,
      ...options
    })
  })

  it('should emit value on input', () => {
    const wrapper = createWrapper()

    wrapper.vm.emitInput('stub')
    expect(wrapper.emitted('input')).toHaveEmittedWith('stub')
  })

  it('should emit value when losing focus', () => {
    const wrapper = createWrapper()

    wrapper.vm.emitBlur({ target: { value: 'stub' } } as any)
    jest.runAllTimers()

    expect(wrapper.emitted('blur')).toHaveEmittedWith('stub')
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

    const input = wrapper.find('.SInputDate .input')

    input.setValue('2021-01-01')
    input.trigger('blur')
    jest.runAllTimers()

    expect(validation.name.$isDirty.value).toBe(true)
  })
})
