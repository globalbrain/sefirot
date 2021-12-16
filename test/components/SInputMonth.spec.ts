import { shallowMount } from '@vue/test-utils'
import SInputMonth from 'sefirot/components/SInputMonth.vue'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SInputMonth', () => {
  beforeEach(() => {
    createWrapper = options => shallowMount(SInputMonth, options)
  })

  it('should hava null option when use `nullable` props', () => {
    const wrapper = createWrapper({
      propsData: {
        nullable: true
      }
    })

    expect((wrapper.vm.options as any[])[0]).toStrictEqual({
      type: 'text',
      value: null,
      text: 'Select month'
    })
  })
})
