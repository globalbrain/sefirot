import { useData } from 'sefirot/composables/Data'

describe('composables/Data', () => {
  test('it resets the state to the initial value', () => {
    const { data, init } = useData({
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

    // Check 2nd time reset to ensure it can reset the state multiple times.
    data.value.a = 3
    data.value.b = 4

    expect(data.value.a).toBe(3)
    expect(data.value.b).toBe(4)

    init()

    expect(data.value.a).toBe(1)
    expect(data.value.b).toBe(2)
  })
})
