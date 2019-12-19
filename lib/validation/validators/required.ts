export default function required (value: any): boolean {
  if (Array.isArray(value)) {
    return !!value.length
  }

  if (value === undefined || value === null) {
    return false
  }

  if (value === false) {
    return true
  }

  if (value instanceof Date) {
    return true
  }

  if (typeof value === 'object') {
    for (const _ in value) {
      return true
    }

    return false
  }

  return !!String(value).length
}
