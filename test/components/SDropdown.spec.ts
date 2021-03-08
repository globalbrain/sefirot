import { mount } from '@vue/test-utils'
import SDropdown from 'sefirot/components/SDropdown.vue'
import { UseDropdownOptions, useDropdown, useTextItem, useUserItem } from 'sefirot/composables/Dropdown'
import { Wrapper } from '../utils'

type Instance = InstanceType<typeof SDropdown>
let createWrapper: (options: UseDropdownOptions) => Wrapper<Instance>

describe('components/SDropdown', () => {
  beforeEach(() => {
    createWrapper = options => mount(SDropdown, {
      propsData: {
        options: useDropdown(options)
      }
    })
  })

  it('should render text item', () => {
    const wrapper = createWrapper({
      items: [
        useTextItem({ text: 'Item 1', value: 1 })
      ]
    })

    expect(wrapper.find('.SDropdown .SDropdownItem .SDropdownItemText').exists())
  })

  it('should render user item', () => {
    const wrapper = createWrapper({
      items: [
        useUserItem({ name: 'John Doe', value: 1, avatar: '' })
      ]
    })

    expect(wrapper.find('.SDropdown .SDropdownItem .SDropdownItemUser').exists())
  })

  it('should throw with invalid item', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => jest.fn())

    const wrapper = () => {
      createWrapper({
        items: [{ type: 'invalid' }] as any
      })
    }

    expect(wrapper).toThrowError('Invalid item type.')
    expect(error).toHaveBeenCalled()
  })

  it('should mark multiple items as selected', () => {
    const wrapper = createWrapper({
      items: [
        useTextItem({ text: 'Item 1', value: 1 }),
        useTextItem({ text: 'Item 2', value: 2 }),
        useTextItem({ text: 'Item 3', value: 3 })
      ],
      selected: { value: [1, 2] } as any
    })

    const selected = wrapper.findAll('.SDropdown .SDropdownItem .status')
    expect(selected.at(0).isEmpty()).toBe(false)
    expect(selected.at(1).isEmpty()).toBe(false)
    expect(selected.at(2).isEmpty()).toBe(true)
  })

  it('should invoke callback on click', () => {
    const callback = jest.fn()

    const wrapper = createWrapper({
      callback,
      items: [
        useTextItem({ text: 'Item 1', value: 1 })
      ]
    })

    wrapper.find('.SDropdown .SDropdownItem').trigger('click')
    expect(callback).toHaveBeenCalled()
  })

  it('should invoke item callback with precedence on click', () => {
    const callback = jest.fn()
    const blanketCallback = jest.fn()

    const wrapper = createWrapper({
      callback: blanketCallback,
      items: [
        useTextItem({
          text: 'Item 1',
          value: 1,
          callback
        })
      ]
    })

    wrapper.find('.SDropdown .SDropdownItem').trigger('click')
    expect(callback).toHaveBeenCalled()
    expect(blanketCallback).not.toHaveBeenCalled()
  })

  it('should emit with `closeOnClick` enabled', () => {
    const wrapper = createWrapper({
      closeOnClick: true,
      items: [
        useTextItem({ text: 'Item 1', value: 1 })
      ]
    })

    wrapper.find('.SDropdown .SDropdownItem').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('should emit on close button click', () => {
    const wrapper = createWrapper({
      title: 'Title',
      items: [
        useTextItem({ text: 'Item 1', value: 1 })
      ]
    })

    wrapper.find('.SDropdown .header .close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
