import dompurify from 'dompurify'
import { JSDOM } from 'jsdom'

export function createDompurify() {
  return dompurify(new JSDOM(`<!DOCTYPE html>`).window)
}
