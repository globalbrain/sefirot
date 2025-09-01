import * as Utils from 'sefirot/composables/Utils'
import { ref } from 'vue'

describe('composables/Utils', () => {
  describe('computedWhen', () => {
    it('creates computed value only when the condition is met', () => {
      const condition = ref(false)
      const state = ref('initial')

      const c = Utils.computedWhen(condition, () => {
        return state.value
      }, 'default')

      // Default value.
      expect(c.value).toBe('default')

      // Condition is met.
      condition.value = true
      expect(c.value).toBe('initial')

      // It's reactive value.
      state.value = 'updated'
      expect(c.value).toBe('updated')
    })

    test('when omitted, the default value when condition is false is `undefined`', () => {
      const c = Utils.computedWhen(false, () => true)

      expect(c.value).toBe(undefined)
    })

    it('passes non-nullable value of condition to the closure arg', () => {
      const value = ref<string | null>(null)

      const c = Utils.computedWhen(value, (v) => v)

      expect(c.value).toBe(undefined)

      value.value = 'abc'

      expect(c.value).toBe('abc')
    })
  })

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
