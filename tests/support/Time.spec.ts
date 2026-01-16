import * as Time from 'sefirot/support/Time'

describe('support/Time', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('sleep', () => {
    it('sleeps for 500ms by default', async () => {
      expect.assertions(1)

      Time.sleep().then(() => {
        expect(true).toBe(true)
      })

      vi.advanceTimersByTime(500)
    })

    it('sleeps for a given time', async () => {
      expect.assertions(1)

      Time.sleep(1000).then(() => {
        expect(true).toBe(true)
      })

      vi.advanceTimersByTime(1000)
    })
  })

  describe('delay', () => {
    it('delays callback execution for 500ms by default', async () => {
      expect.assertions(1)

      Time.delay([]).then(() => {
        expect(true).toBe(true)
      })

      vi.advanceTimersByTime(500)
    })

    it('delays callback execution for a given time', async () => {
      expect.assertions(1)

      Time.delay([], 1000).then(() => {
        expect(true).toBe(true)
      })

      vi.advanceTimersByTime(1000)
    })
  })
})
