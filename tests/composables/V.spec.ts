import { createPinia, setActivePinia } from 'pinia'
import { useD } from 'sefirot/composables/D'
import { useV } from 'sefirot/composables/V'
import { nextTick, ref } from 'vue'

describe('composables/V', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('it validates the data', () => {
    const { data } = useD({
      name: null as string | null
    })

    const { validation } = useV(data, {
      name: { required: (v: any) => v !== null }
    })

    expect(validation.value.$invalid).toBe(true)
    expect(validation.value.name.$invalid).toBe(true)

    data.value.name = 'John Doe'

    expect(validation.value.$invalid).toBe(false)
    expect(validation.value.name.$invalid).toBe(false)
  })

  test('data can be getter', () => {
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

    expect(validation.value.a.$invalid).toBe(false)

    data.value.v = 3

    expect(validation.value.a.$invalid).toBe(true)
  })

  test('rules can be getter', async () => {
    const { data } = useD({
      v: 5
    })

    const max = ref(6)

    const { validation } = useV(data, () => ({
      v: { maxValue: (v: any) => v < max.value }
    }))

    expect(validation.value.v.$invalid).toBe(false)

    max.value = 4

    await nextTick()

    expect(validation.value.v.$invalid).toBe(true)
  })

  test('it can validate all fields in once', async () => {
    const { data } = useD({
      a: 1,
      b: 2
    })

    const { validate } = useV(data, {
      a: { maxValue: (v: any) => v < 3 },
      b: { maxValue: (v: any) => v < 3 }
    })

    expect(await validate()).toBe(true)
  })

  test('it can set and reset dirty state', () => {
    const { data } = useD({
      name: null as string | null
    })

    const { validation, reset } = useV(data, {
      name: { required: (v: any) => v !== null }
    })

    expect(validation.value.name.$dirty).toBe(false)

    validation.value.name.$touch()

    expect(validation.value.name.$dirty).toBe(true)

    reset()

    expect(validation.value.name.$dirty).toBe(false)
  })
})
