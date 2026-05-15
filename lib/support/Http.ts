export function objectToFormData(
  obj: any,
  form?: FormData,
  namespace?: string,
  onlyFiles = false
): FormData {
  const fd = form || new FormData()

  if (obj == null) {
    return fd
  }

  let formKey: string

  Object.keys(obj).forEach((property) => {
    if (namespace) {
      formKey = `${namespace}[${property}]`
    } else {
      formKey = property
    }

    if (obj[property] === undefined) {
      return
    }

    if (
      typeof obj[property] === 'object'
      && !(obj[property] instanceof Blob)
      && obj[property] !== null
    ) {
      objectToFormData(obj[property], fd, formKey, onlyFiles)
    } else {
      const value = obj[property] === null ? '' : obj[property]
      if (onlyFiles && !(value instanceof Blob)) {
        return
      }
      fd.append(formKey, value)
    }
  })

  return fd
}

export function getHttpStatusCode(error: any): number | undefined {
  const sources = [error, error?.cause, error?.details, error?.error]
    .filter((s) => s && typeof s === 'object')

  return sources
    .flatMap((s) => [s.status, s.statusCode, s.response?.status, s.response?.statusCode, s.code])
    .map(Number)
    .find((n) => Number.isInteger(n) && n >= 100 && n <= 599)
}
