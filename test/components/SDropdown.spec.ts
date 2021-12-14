import { mount } from '@vue/test-utils'
import SDropdown from 'sefirot/components/SDropdown.vue'
import { UseDropdownOptions, useDropdown, useTextItem, useUserItem } from 'sefirot/composables/Dropdown'
import { Wrapper } from '../utils'

let createWrapper: (options: UseDropdownOptions) => Wrapper

describe('components/SDropdown', () => {
  beforeEach(() => {
    createWrapper = options => mount(SDropdown, {
      propsData: {
        options: useDropdown(options)
      },
      attachTo: document.body
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

  it('should focus on the first item when `focusFirstItem` is called', () => {
    const wrapper = createWrapper({
      items: [
        useTextItem({ text: 'Item 1', value: 1 }),
        useTextItem({ text: 'Item 2', value: 2 })
      ]
    })

    wrapper.vm.focusFirstItem()
    expect(wrapper.find('.item:first-child').element).toStrictEqual(document.activeElement)
  })

  it('should focus on the prev item when `focusPrev` is called', () => {
    const wrapper = createWrapper({
      items: [
        useTextItem({ text: 'Item 1', value: 1 }),
        useTextItem({ text: 'Item 2', value: 2 })
      ]
    })

    wrapper.find('.item:last-child').trigger('keyup.up')
    expect(wrapper.find('.item:first-child').element).toStrictEqual(document.activeElement)
  })

  it('should focus on the next item when `focusNext` is called', () => {
    const wrapper = createWrapper({
      items: [
        useTextItem({ text: 'Item 1', value: 1 }),
        useTextItem({ text: 'Item 2', value: 2 })
      ]
    })

    wrapper.find('.item:first-child').trigger('keyup.down')
    expect(wrapper.find('.item:last-child').element).toStrictEqual(document.activeElement)
  })
})
