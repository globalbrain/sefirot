import { useD } from 'sefirot/composables/D'

describe('composables/D', () => {
  test('it resets the state to the initial value', () => {
    const { data, init } = useD({
      a: 1,
      b: 2
    })

    data.value.a = 3
    data.value.b = 4

    expect(data.value.a).toBe(3)
    expect(data.value.b).toBe(4)

    init()

    expect(data.value.a).toBe(1)
    expect(data.value.b).toBe(2)
  })
})
