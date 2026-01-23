import dompurify from 'dompurify'

export function createDompurify() {
  return dompurify(window)
}
