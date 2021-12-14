import { shallowMount } from '@vue/test-utils'
import SDialog from 'sefirot/components/SDialog.vue'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SDialog', () => {
  beforeEach(() => {
    createWrapper = options => shallowMount(SDialog, options)
  })

  it('should return action type', () => {
    const wrapper = createWrapper()

    expect(wrapper.vm.getActionType()).toBe('text')
    expect(wrapper.vm.getActionType('text')).toBe('text')
    expect(wrapper.vm.getActionType('mute')).toBe('mute')
  })
})
