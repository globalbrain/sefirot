import { mount } from '@vue/test-utils'
import SInputDropdown from 'sefirot/components/SInputDropdown.vue'
import useForm from 'sefirot/compositions/useForm'
import { useSearch, useTextOption } from 'sefirot/composables/InputDropdown'
import { CreateWrapperFn } from '../utils'

type Instance = InstanceType<typeof SInputDropdown>
let createWrapper: CreateWrapperFn<Instance>

describe('components/SInputDropdown', () => {
  beforeEach(() => {
    createWrapper = (options = {}) => mount(SInputDropdown, {
      ...options,
      propsData: {
        options: [
          useTextOption({ text: 'Option 1', value: 1 }),
          useTextOption({ text: 'Option 2', value: 2 }),
          useTextOption({ text: 'Option 3', value: 3 }),
          useTextOption({ text: 'Option 4', value: 4, disabled: true })
        ],
        ...options.propsData
      }
    })
  })

  it('should emit correct value', () => {
    const wrapper = createWrapper({
      propsData: {
        value: [1, 2]
      }
    })

    wrapper.vm.handleCallback({ value: 3 } as any)
    expect(wrapper.emitted('change')).toHaveEmittedWith([1, 2, 3])
  })

  it('should emit null value', () => {
    const wrapper = createWrapper({
      propsData: {
        value: 1
      }
    })

    wrapper.vm.handleCallback({ value: 1 } as any)
    expect(wrapper.emitted('change')).toHaveEmittedWith(null)
  })

  it('should not emit when nullable is disabled', () => {
    const wrapper = createWrapper({
      propsData: {
        nullable: false,
        value: [1]
      }
    })

    wrapper.vm.handleCallback({ value: 1 } as any)
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('should invoke validation', () => {
    const { data, validation } = useForm({
      data: { item: null },
      rules: { item: [] }
    })

    const wrapper = createWrapper({
      propsData: {
        value: data.item,
        validation
      }
    })

    wrapper.vm.handleCallback({ value: 1 } as any)
    expect(validation.item.$isDirty.value).toBe(true)
  })

  it('should focus search input on render', async () => {
    const wrapper = createWrapper({
      attachTo: document.body,
      propsData: {
        search: useSearch({
          placeholder: 'Search items',
          missing: 'No items found'
        })
      }
    })

    await wrapper.vm.handleOpen()
    expect(wrapper.find('.SInputDropdown .SDropdown .search .SInputText input').element)
      .toBe(document.activeElement)
  })

  it('should hide disabled options', async () => {
    const wrapper = createWrapper({
      propsData: {
        value: 1
      }
    })

    await wrapper.vm.handleOpen()

    const options = wrapper
      .find('.SInputDropdown .SDropdown .container .list')
      .findAll('.item')
      .filter(item => item.isVisible())

    expect(options.length).toBe(3)
  })
})
