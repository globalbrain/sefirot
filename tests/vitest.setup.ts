import { createPinia, setActivePinia } from 'pinia'
import { setupRouter } from './Utils'

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
