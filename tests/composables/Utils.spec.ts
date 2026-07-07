import { mount } from '@vue/test-utils'
import * as Utils from 'sefirot/composables/Utils'
import { type ComputedRef, defineComponent, h, ref } from 'vue'

describe('composables/Utils', () => {
  describe('computedWhen', () => {
    it('creates computed value only when the condition is met', () => {
      const condition = ref(false)
      const state = ref('initial')

      const c = Utils.computedWhen(condition, () => state.value, 'default')

      // Default value.
      expect(c.value).toBe('default')

      // Condition is met.
      condition.value = true
      expect(c.value).toBe('initial')

      // It's reactive value.
      state.value = 'updated'
      expect(c.value).toBe('updated')
    })

    it('defaults to `undefined` when condition is false and no default is provided', () => {
      const c = Utils.computedWhen(false, () => true)

      expect(c.value).toBe(undefined)
    })

    it('passes the non-nullable condition value to the closure', () => {
      const value = ref<string | null>(null)

      const c = Utils.computedWhen(value, (v) => v)

      expect(c.value).toBe(undefined)

      value.value = 'abc'

      expect(c.value).toBe('abc')
    })
  })

  describe('computedArray', () => {
    it('creates a computed array', () => {
      const state = ref(true)

      const arr = Utils.computedArray<string>((arr) => {
        state.value ? arr.push('a') : arr.push('b')
      })

      expect(arr.value[0]).toBe('a')

      state.value = false

      expect(arr.value[0]).toBe('b')
    })
  })

  describe('useHasSlotContent', () => {
    function hasSlotContent(slot?: any): boolean {
      let has!: ComputedRef<boolean>

      const Comp = defineComponent({
        setup(_, { slots }) {
          has = Utils.useHasSlotContent()
          return () => h('div', slots.default?.())
        }
      })

      mount(Comp, { slots: slot != null ? { default: slot } : {} })

      return has.value
    }

    it('counts childless elements and components, whose children are not text', () => {
      // An icon-like element / a bare component: `children` is `null`, not a string.
      expect(hasSlotContent(() => h('span'))).toBe(true)
      expect(hasSlotContent(() => h(defineComponent({ render: () => null })))).toBe(true)
    })

    it('counts only non-blank text, of a text node or an element', () => {
      expect(hasSlotContent(() => 'label')).toBe(true)
      expect(hasSlotContent(() => '   ')).toBe(false)
      expect(hasSlotContent(() => h('div', 'label'))).toBe(true)
      expect(hasSlotContent(() => h('div', ''))).toBe(false)
    })

    it('does not count comments (a `v-if` rendering nothing) or an absent slot', () => {
      expect(hasSlotContent('<span v-if="false">x</span>')).toBe(false)
      expect(hasSlotContent()).toBe(false)
    })

    it('looks through fragments, so an empty `v-for` does not count', () => {
      expect(hasSlotContent('<span v-for="i in 0" :key="i">x</span>')).toBe(false)
      expect(hasSlotContent('<span v-for="i in 2" :key="i">x</span>')).toBe(true)
    })
  })
})
