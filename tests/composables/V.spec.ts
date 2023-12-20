import { createPinia, setActivePinia } from 'pinia'
import { useD } from 'sefirot/composables/D'
import { useV } from 'sefirot/composables/V'
import { setup } from 'tests/Utils'
import { ref } from 'vue'

describe('composables/V', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('it validates the data', () => {
    const vm = setup(() => {
      const { data } = useD({
        name: null as string | null
      })

      const { validation } = useV(data, {
        name: { required: (v: any) => v !== null }
      })

      return {
        data,
        validation
      }
    })

    expect(vm.validation.$invalid).toBe(true)
    expect(vm.validation.name.$invalid).toBe(true)

    vm.data.name = 'John Doe'

    expect(vm.validation.$invalid).toBe(false)
    expect(vm.validation.name.$invalid).toBe(false)
  })

  test('data can be getter', () => {
    const vm = setup(() => {
      const { data } = useD({
        v: 1
      })

      function targetData() {
        return {
          a: data.value.v + 1
        }
      }

      const { validation } = useV(targetData, {
        a: { maxValue: (v: any) => v < 3 }
      })

      return {
        data,
        validation
      }
    })

    expect(vm.validation.a.$invalid).toBe(false)

    vm.data.v = 3

    expect(vm.validation.a.$invalid).toBe(true)
  })

  test('rules can be getter', () => {
    const vm = setup(() => {
      const { data } = useD({
        v: 5
      })

      const max = ref(6)

      const { validation } = useV(data, () => ({
        v: { maxValue: (v: any) => v < max.value }
      }))

      return {
        validation,
        max
      }
    })

    expect(vm.validation.v.$invalid).toBe(false)

    vm.max = 4

    expect(vm.validation.v.$invalid).toBe(true)
  })

  test('it can validate all fields in once', async () => {
    const vm = setup(() => {
      const { data } = useD({
        a: 1,
        b: 2
      })

      const { validate } = useV(data, {
        a: { maxValue: (v: any) => v < 3 },
        b: { maxValue: (v: any) => v < 3 }
      })

      return {
        validate
      }
    })

    expect(await vm.validate()).toBe(true)
  })

  test('it can set and reset dirty state', () => {
    const vm = setup(() => {
      const { data } = useD({
        name: null as string | null
      })

      const { validation, reset } = useV(data, {
        name: { required: (v: any) => v !== null }
      })

      return {
        validation,
        reset
      }
    })

    expect(vm.validation.name.$dirty).toBe(false)

    vm.validation.name.$touch()

    expect(vm.validation.name.$dirty).toBe(true)

    vm.reset()

    expect(vm.validation.name.$dirty).toBe(false)
  })
})
