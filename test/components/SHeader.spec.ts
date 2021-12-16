import { shallowMount } from '@vue/test-utils'
import SHeader from 'sefirot/components/SHeader.vue'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SHeader', () => {
  beforeEach(() => {
    createWrapper = options => shallowMount(SHeader, options)
  })

  it('should compute actions which have `small` as default size', () => {
    const wrapper = createWrapper({
      propsData: {
        actions: [
          { type: 'button' },
          { type: 'avatar' },
          { size: 'small', type: 'pill' },
          { size: 'medium', type: 'switch' }
        ]
      }
    })

    expect(wrapper.vm.cActions).toStrictEqual([
      { size: 'small', type: 'button' },
      { size: 'small', type: 'avatar' },
      { size: 'small', type: 'pill' },
      { size: 'medium', type: 'switch' }
    ])
  })

  it('should compute tags which have `small` as default size', () => {
    const wrapper = createWrapper({
      propsData: {
        tags: [
          { text: 'tag1' },
          { size: 'small', text: 'tag2' },
          { size: 'medium', text: 'tag3' },
          { size: 'large', text: 'tag4' }
        ]
      }
    })

    expect(wrapper.vm.cTags).toStrictEqual([
      { size: 'small', text: 'tag1' },
      { size: 'small', text: 'tag2' },
      { size: 'medium', text: 'tag3' },
      { size: 'large', text: 'tag4' }
    ])
  })
})
