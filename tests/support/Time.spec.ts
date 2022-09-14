import * as Time from 'sefirot/support/Time'

describe('support/Time', () => {
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
