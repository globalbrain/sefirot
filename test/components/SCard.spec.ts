import { computed } from '@vue/composition-api'
import { shallowMount } from '@vue/test-utils'
import SCard from 'sefirot/components/SCard.vue'
import SCardHeader from 'sefirot/components/SCardHeader.vue'
import SCardFooter from 'sefirot/components/SCardFooter.vue'
import SIconPlus from 'sefirot/components/icons/SIconPlus.vue'
import SIconPlusOff from 'sefirot/components/icons/SIconPlusOff.vue'
import SIconEdit3 from 'sefirot/components/icons/SIconEdit3.vue'
import SIconEdit3Off from 'sefirot/components/icons/SIconEdit3Off.vue'
import SIconTrash2 from 'sefirot/components/icons/SIconTrash2.vue'
import SIconTrash2Off from 'sefirot/components/icons/SIconTrash2Off.vue'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SCard', () => {
  beforeEach(() => {
    createWrapper = options => shallowMount(SCard, options)
  })

  it('should toggle `isCollapsed` value when `toggleCollapse` is called', () => {
    const wrapper = createWrapper()

    expect(wrapper.vm.isCollapsed).toBeFalsy()

    wrapper.vm.toggleCollapse()
    expect(wrapper.vm.isCollapsed).toBeTruthy()

    wrapper.vm.toggleCollapse()
    expect(wrapper.vm.isCollapsed).toBeFalsy()
  })
})

describe('components/SCardHeader', () => {
  beforeEach(() => {
    createWrapper = options => shallowMount(SCardHeader, options)
  })

  it('should return the icon according to `icon` type and `disabled` value', () => {
    const wrapper = createWrapper({
      propsData: {
        isCollapsed: true,
        collapsable: true
      }
    })

    expect(wrapper.vm.getIcon(SIconPlus, true)).toStrictEqual(SIconPlus)

    expect(wrapper.vm.getIcon('plus', true)).toStrictEqual(SIconPlusOff)
    expect(wrapper.vm.getIcon('plus', false)).toStrictEqual(SIconPlus)
    expect(wrapper.vm.getIcon('edit-3', true)).toStrictEqual(SIconEdit3Off)
    expect(wrapper.vm.getIcon('edit-3', false)).toStrictEqual(SIconEdit3)
    expect(wrapper.vm.getIcon('trash-2', true)).toStrictEqual(SIconTrash2Off)
    expect(wrapper.vm.getIcon('trash-2', false)).toStrictEqual(SIconTrash2)
  })

  it('should throw error when invalid icon type is passed', () => {
    const iconType = 'invalid'
    const wrapper = createWrapper({
      propsData: {
        isCollapsed: true,
        collapsable: true
      }
    })

    expect(() => wrapper.vm.getIcon(iconType, true)).toThrowError(`[sefirot] Invalid icon type: ${iconType}.`)
  })

  it('should handle callback according to `action` value', () => {
    const callback = jest.fn()
    const routerPush = jest.fn()
    const wrapper = createWrapper({
      propsData: {
        isCollapsed: true,
        collapsable: true
      },
      mocks: {
        $router: {
          push: routerPush
        }
      }
    })

    expect(wrapper.vm.handleCallback({
      type: 'primary',
      disabled: true,
      link: 'https://example.com',
      callback
    })).toBe(undefined)

    wrapper.vm.handleCallback({
      type: 'primary',
      link: 'https://example.com',
      callback
    })
    expect(routerPush).toHaveBeenCalled()

    wrapper.vm.handleCallback({
      type: 'primary',
      callback
    })
    expect(callback).toHaveBeenCalled()
  })
})

describe('components/SCardFooter', () => {
  beforeEach(() => {
    createWrapper = options => shallowMount(SCardFooter, options)
  })

  it('should be unwrapped actions', () => {
    const wrapper = createWrapper({
      propsData: {
        actions: computed(() => [
          { type: 'primary', label: 'action1' },
          { type: 'primary', label: 'action2' }
        ])
      }
    })

    expect(wrapper.vm.unwrappedActions).toStrictEqual(
      [
        { type: 'primary', label: 'action1' },
        { type: 'primary', label: 'action2' }
      ]
    )
  })
})
