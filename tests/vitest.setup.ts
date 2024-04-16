import { createPinia, setActivePinia } from 'pinia'
import { setupRouter } from './Utils'

// @ts-expect-error - not properly implemented in happy-dom
delete window.MutationObserver

beforeAll(() => {
  setupRouter()
})

beforeEach(() => {
  setActivePinia(createPinia())

  const el = document.createElement('div')
  el.id = 'sefirot-modals'
  document.body.appendChild(el)
})

afterEach(() => {
  document.body.innerHTML = ''
})
