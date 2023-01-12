import * as Time from 'sefirot/support/Time'

describe('support/Time', () => {
  describe('sleep', () => {
    test('sleep for 500ms by default', async () => {
      expect.assertions(1)

      vi.useFakeTimers()

      Time.sleep().then(() => {
        expect(true).toBe(true)
      })

      vi.advanceTimersByTime(500)
    })

    test('sleep for a given time', async () => {
      expect.assertions(1)

      vi.useFakeTimers()

      Time.sleep(1000).then(() => {
        expect(true).toBe(true)
      })

      vi.advanceTimersByTime(1000)
    })
  })

  describe('delay', () => {
    test('delay callback execution for 500ms by default', async () => {
      expect.assertions(1)

      vi.useFakeTimers()

      Time.delay([]).then(() => {
        expect(true).toBe(true)
      })

      vi.advanceTimersByTime(500)
    })

    test('delay callback execution for given time', async () => {
      expect.assertions(1)

      vi.useFakeTimers()

      Time.delay([], 1000).then(() => {
        expect(true).toBe(true)
      })

      vi.advanceTimersByTime(1000)
    })
  })
})
