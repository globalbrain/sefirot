import { nextTick, ref, isRef } from '@vue/composition-api'
import * as Utils from 'sefirot/composables/Utils'

describe('composables/Utils', () => {
  describe('#computedOnly', () => {
    it('only triggers updates when mutating the given watch source', async () => {
      const spy = jest.fn()

      const source = ref('foo')
      const counter = ref(1)

      const computedRef = Utils.computedOnly(source, () => {
        spy()
        return counter.value * 2
      })

      // The initial value should be 2.
      expect(spy).toBeCalledTimes(1)
      expect(computedRef.value).toBe(2)

      // Change to the `source` should trigger the compute.
      source.value = 'bar'
      await nextTick()
      expect(spy).toBeCalledTimes(2)
      expect(computedRef.value).toBe(2)

      // Change to the `counter` should not trigger the compute.
      counter.value++
      await nextTick()
      expect(spy).toBeCalledTimes(2)
      expect(computedRef.value).toBe(2)
    })

    it('returns shallow ref', () => {
      const obj = {
        key: ref('foo')
      }

      const computedRef = Utils.computedOnly(ref(), () => obj)

      // The returned ref should not be unwrapping nested refs.
      expect(isRef(computedRef.value.key)).toBe(true)
    })
  })

  describe('#computedIfOnly', () => {
    it('only executes the callback when source value is truthy', async () => {
      const spy = jest.fn()

      const source = ref(false)
      const counter = ref(1)

      const computedRef = Utils.computedIfOnly(source, () => {
        spy()
        return counter.value * 2
      }, 0)

      expect(spy).toBeCalledTimes(0)
      expect(computedRef.value).toBe(0)

      source.value = true
      await nextTick()
      expect(spy).toBeCalledTimes(1)
      expect(computedRef.value).toBe(2)

      source.value = false
      await nextTick()
      expect(spy).toBeCalledTimes(1)
      expect(computedRef.value).toBe(0)
    })

    it('passes the source value to the callback when the source is truthy', () => {
      const source = ref({ key: 1 })

      const computedRef = Utils.computedIfOnly(source, (value) => {
        return value.key * 2
      }, 0)

      expect(computedRef.value).toBe(2)
    })
  })
})
