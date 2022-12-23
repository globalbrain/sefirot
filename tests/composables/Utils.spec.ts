import { ref } from 'vue'
import * as Utils from 'sefirot/composables/Utils'

describe('composables/Utils', () => {
  describe('computedArray', () => {
    test('computed array can be created', () => {
      const state = ref(true)

      const arr = Utils.computedArray<string>((arr) => {
        state.value ? arr.push('a') : arr.push('b')
      })

      expect(arr.value[0]).toBe('a')

      state.value = false

      expect(arr.value[0]).toBe('b')
    })
  })
})
