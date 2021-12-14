import { shallowMount } from '@vue/test-utils'
import SAlert from 'sefirot/components/SAlert.vue'
import SIconInfo from 'sefirot/components/icons/SIconInfo.vue'
import SIconCheckCircle from 'sefirot/components/icons/SIconCheckCircle.vue'
import SIconWarning from 'sefirot/components/icons/SIconWarning.vue'
import SIconXCircle from 'sefirot/components/icons/SIconXCircle.vue'
import { AlertModes } from 'sefirot/composables/Alert'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SAlert', () => {
  beforeEach(() => {
    createWrapper = options => shallowMount(SAlert, options)
  })

  it('should render SIconInfo', () => {
    const wrapper = createWrapper({
      propsData: {
        type: AlertModes.Info
      }
    })

    expect(wrapper.findComponent(SIconInfo).exists()).toBeTruthy()
  })

  it('should render SIconCheckCircle', () => {
    const wrapper = createWrapper({
      propsData: {
        type: AlertModes.Success
      }
    })

    expect(wrapper.findComponent(SIconCheckCircle).exists()).toBeTruthy()
  })

  it('should render SIconWarning', () => {
    const wrapper = createWrapper({
      propsData: {
        type: AlertModes.Warning
      }
    })

    expect(wrapper.findComponent(SIconWarning).exists()).toBeTruthy()
  })

  it('should render SIconXCircle', () => {
    const wrapper = createWrapper({
      propsData: {
        type: AlertModes.Danger
      }
    })

    expect(wrapper.findComponent(SIconXCircle).exists()).toBeTruthy()
  })
})
