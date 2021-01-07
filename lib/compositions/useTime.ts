function pad(n: number, width: number): string {
  const number = String(n)
  return number.length >= width ? number : new Array(width - number.length + 1).join('0') + number
}

function createTimes(from: number, to: number): string[] {
  const hours: string[] = []

  for (let h = from; h <= to; h++) {
    hours.push(pad(h, 2))
  }

  return hours
}

export default function useTime() {
  const hours = createTimes(0, 23)
  const minutes = createTimes(0, 59)
  const seconds = createTimes(0, 59)

  return {
    hours,
    minutes,
    seconds
  }
}
