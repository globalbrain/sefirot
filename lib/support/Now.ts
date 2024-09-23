const now: SDate = {
  get day() {
    return new Date().getDate()
  },
  get month() {
    return new Date().getMonth() + 1
  },
  get year() {
    return new Date().getFullYear()
  }
}

Object.defineProperty(now, 'valueOf', {
  value: () => new Date().valueOf(),
  enumerable: false
})

Object.defineProperty(now, 'getDay', {
  value: () => new Date().getDay(),
  enumerable: false
})

export { now }

export interface SDate {
  day: number
  month: number
  year: number
}
