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
          { label: 'Option 3', value: 3 }
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
})
