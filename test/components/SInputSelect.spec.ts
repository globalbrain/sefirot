import { mount } from '@vue/test-utils'
import useForm from 'sefirot/compositions/useForm'
import SInputSelect from 'sefirot/components/SInputSelect.vue'
import { CreateWrapperFn } from '../utils'

type Instance = InstanceType<typeof SInputSelect>
let createWrapper: CreateWrapperFn<Instance>

describe('components/SInputSelect', () => {
  beforeEach(() => {
    createWrapper = (options = {}) => mount(SInputSelect, {
      ...options,
      propsData: {
        options: [
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
          { label: 'Option 3', value: 3 },
          { label: 'Option 4', value: 4, disabled: true }
        ],
        ...options.propsData
      }
    })
  })

  it('should emit value on input change', () => {
    const wrapper = createWrapper({
      propsData: { value: 1 }
    })

    wrapper.find('.SInputSelect .select').setValue(
      JSON.stringify({ label: 'Option 2', value: 2 })
    )
    expect(wrapper.emitted('change')).toHaveEmittedWith(2)
  })

  it('should display only options which is not disabled', () => {
    const wrapper = createWrapper({
      propsData: { value: 1 }
    })

    const options = wrapper.find('.SInputSelect .select').findAll('option')
    expect(options.length).toBe(3)
  })

  it('should invoke validation on input change', async () => {
    const { data, validation } = useForm({
      data: { item: null },
      rules: { item: [] }
    })

    const wrapper = createWrapper({
      propsData: {
        value: data.item,
        validation: validation.item
      }
    })

    const option = wrapper.find('.SInputSelect .select').findAll('option').at(1)

    await option.setSelected()
    expect(validation.item.$isDirty.value).toBe(true)
  })

  it('should toggle focus on `focus` and `blur` event', async () => {
    const wrapper = createWrapper({
      propsData: { value: 1 }
    })

    expect(wrapper.vm.isFocused).toBe(false)

    await wrapper.find('.SInputSelect .select').trigger('focus')
    expect(wrapper.vm.isFocused).toBe(true)

    await wrapper.find('.SInputSelect .select').trigger('blur')
    expect(wrapper.vm.isFocused).toBe(false)
  })
})
