import { mount, shallowMount } from '@vue/test-utils'
import SAction from 'sefirot/components/SAction.vue'
import SActionButton from 'sefirot/components/SActionButton.vue'
import SActionPill from 'sefirot/components/SActionPill.vue'
import SActionAvatar from 'sefirot/components/SActionAvatar.vue'
import SActionSwitch from 'sefirot/components/SActionSwitch.vue'
import { Types } from 'sefirot/composables/Action'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SAction', () => {
  beforeEach(() => {
    createWrapper = options => shallowMount(SAction, options)
  })

  it('should render SActionButton', () => {
    const wrapper = createWrapper({
      propsData: {
        action: {
          type: Types.Button
        }
      }
    })

    expect(wrapper.findComponent(SActionButton).exists()).toBeTruthy()
  })

  it('should render SActionPill', () => {
    const wrapper = createWrapper({
      propsData: {
        action: {
          type: Types.Pill
        }
      }
    })

    expect(wrapper.findComponent(SActionPill).exists()).toBeTruthy()
  })

  it('should render SActionAvatar', () => {
    const wrapper = createWrapper({
      propsData: {
        action: {
          type: Types.Avatar
        }
      }
    })

    expect(wrapper.findComponent(SActionAvatar).exists()).toBeTruthy()
  })

  it('should render SActionSwitch', () => {
    const wrapper = createWrapper({
      propsData: {
        action: {
          type: Types.Switch
        }
      }
    })

    expect(wrapper.findComponent(SActionSwitch).exists()).toBeTruthy()
  })
})

describe('components/SActionButton', () => {
  beforeEach(() => {
    createWrapper = options => mount(SActionButton, options)
  })

  it('should invoke callback on click', () => {
    const callback = jest.fn()

    const wrapper = createWrapper({
      propsData: {
        action: {
          type: Types.Button,
          callback
        }
      }
    })

    wrapper.find('.SButton').trigger('click')
    expect(callback).toHaveBeenCalled()
  })
})

describe('components/SActionSwitch', () => {
  beforeEach(() => {
    createWrapper = options => mount(SActionSwitch, options)
  })

  it('should invoke callback on click', () => {
    const callback = jest.fn()

    const wrapper = createWrapper({
      propsData: {
        action: {
          type: Types.Switch,
          value: true,
          callback
        }
      }
    })

    wrapper.find('.SInputSwitch .SInputSwitch-container .SInputSwitch-input').trigger('click')
    expect(callback).toHaveBeenCalled()
  })
})
