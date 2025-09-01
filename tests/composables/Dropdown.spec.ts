import * as Dropdown from 'sefirot/composables/Dropdown'
import { ref } from 'vue'

describe('composables/Dropdown', () => {
  describe('useManualDropdownPosition', () => {
    it('sets the position to bottom by default', () => {
      const { position } = Dropdown.useManualDropdownPosition()

      expect(position.value).toBe('bottom')
    })

    it('sets the position to bottom when there is not enough space at the top', () => {
      const container = createContainer(100, 100)

      const { position, update } = Dropdown.useManualDropdownPosition(container)

      update()

      expect(position.value).toBe('bottom')
    })

    it('sets the position to top when there is not enough space at the bottom', () => {
      window.innerHeight = 500

      const container = createContainer(500, 500)

      const { position, update } = Dropdown.useManualDropdownPosition(container)

      update()

      expect(position.value).toBe('top')
    })

    it('sets the position to bottom when there is enough space at the bottom', () => {
      window.innerHeight = 500

      const container = createContainer(500, 100)

      const { position, update } = Dropdown.useManualDropdownPosition(container)

      update()

      expect(position.value).toBe('bottom')
    })

    it('sets the position to top when initial position is set to top', () => {
      const container = createContainer(500, 500)

      const { position, update } = Dropdown.useManualDropdownPosition(container, 'top')

      update()

      expect(position.value).toBe('top')
    })

    test('if container is not passed it will return a new one', () => {
      window.innerHeight = 500

      const { container } = Dropdown.useManualDropdownPosition()

      expect(container.value).toBe(null)
    })
  })
})

function createContainer(top: number, bottom: number) {
  return ref({
    getBoundingClientRect: vi.fn(() => ({ top, bottom }))
  })
}
