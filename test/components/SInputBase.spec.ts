import { ref, reactive } from '@vue/composition-api'
import { shallowMount } from '@vue/test-utils'
import { required } from 'sefirot/validation/rules'
import { createValidation } from 'sefirot/validation/Validation'
import SInputBase from 'sefirot/components/SInputBase.vue'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SInputBase', () => {
  beforeEach(() => {
    createWrapper = options => shallowMount(SInputBase, options)
  })

  it('should compute error message according to the validation result', async () => {
    const inputValue = ref<number | null>(null)
    const validation = createValidation(
      reactive({
        value: inputValue
      }),
      {
        value: [required()]
      }
    )
    const wrapper = createWrapper()

    expect(wrapper.vm.errorMsg).toBe(null)

    await wrapper.setProps({
      validation
    })
    expect(wrapper.vm.errorMsg).toBe('The field is required.')

    inputValue.value = 10
    expect(wrapper.vm.errorMsg).toBe(null)
  })
})
