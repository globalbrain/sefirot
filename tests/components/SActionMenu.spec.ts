import { mount } from '@vue/test-utils'
import SActionMenu from 'sefirot/components/SActionMenu.vue'
import { type DropdownSection } from 'sefirot/composables/Dropdown'

const mockOptions: DropdownSection[] = [
  {
    type: 'actions',
    options: [
      { label: 'Edit', onClick: () => {} },
      { label: 'Delete', onClick: () => {} }
    ]
  }
]

// Helper to mock element positions for different viewport locations
function mockElementPosition(
  element: Element,
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
) {
  let rect: Partial<DOMRect>

  switch (position) {
    case 'top-left':
      rect = {
        left: 50,
        right: 150,
        top: 50,
        bottom: 80,
        width: 100,
        height: 30
      }
      break
    case 'top-right':
      rect = {
        left: 900,
        right: 1000,
        top: 50,
        bottom: 80,
        width: 100,
        height: 30
      }
      break
    case 'bottom-left':
      rect = {
        left: 50,
        right: 150,
        top: 700,
        bottom: 680,
        width: 100,
        height: 30
      }
      break
    case 'bottom-right':
      rect = {
        left: 900,
        right: 1000,
        top: 700,
        bottom: 680,
        width: 100,
        height: 30
      }
      break
  }

  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    ...rect,
    x: rect.left!,
    y: rect.top!
  } as DOMRect)
}

// Helper to mock dropdown dimensions
function mockDropdownDimensions(element: Element) {
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    width: 288, // 288 is the current min-width of the dropdown, we use it here for more realistic tests
    height: 150,
    left: 0,
    right: 288,
    top: 0,
    bottom: 150,
    x: 0,
    y: 0
  } as DOMRect)
}

// Helper to set up all mocking for a specific position
function setupPositionMocks(
  wrapper: ReturnType<typeof mount>,
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
) {
  mockElementPosition(wrapper.find('.SActionMenu').element, position)
  mockDropdownDimensions(wrapper.find('.dropdown').element)

  // Trigger a resize event to ensure the component recalculates positions from the mocked dimensions
  window.dispatchEvent(new Event('resize'))
}

describe('SActionMenu Viewport Alignment', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    })

    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768
    })

    vi.clearAllMocks()
  })

  describe('Top-Left Position', () => {
    it('keeps left alignment when there is space on the right', async () => {
      const wrapper = mount(SActionMenu, {
        props: {
          options: mockOptions,
          dropdownAlign: 'left'
        }
      })

      setupPositionMocks(wrapper, 'top-left')

      await wrapper.find('button').trigger('click')

      // Should maintain left alignment (plenty of space on right: 1024 - 50 = 974 > 288)
      await expect.poll(() => wrapper.find('.SActionMenu').classes()).toContain('left')
      // Dropdown should be positioned at the bottom
      await expect.poll(() => wrapper.find('.SActionMenu .dropdown').classes()).toContain('bottom')
    })

    it('flips to left alignment even when preferring right', async () => {
      const wrapper = mount(SActionMenu, {
        props: {
          options: mockOptions,
          dropdownAlign: 'right'
        }
      })

      setupPositionMocks(wrapper, 'top-left')

      await wrapper.find('button').trigger('click')

      // Should flip to left (only 150px space on left, but 974px on right)
      await expect.poll(() => wrapper.find('.SActionMenu').classes()).toContain('left')
      // Dropdown should be positioned at the bottom
      await expect.poll(() => wrapper.find('.SActionMenu .dropdown').classes()).toContain('bottom')
    })
  })

  describe('Top-Right Position', () => {
    it('flips to right alignment when insufficient space on right', async () => {
      const wrapper = mount(SActionMenu, {
        props: {
          options: mockOptions,
          dropdownAlign: 'left'
        }
      })

      setupPositionMocks(wrapper, 'top-right')

      await wrapper.find('button').trigger('click')

      // Should flip to right (only 124px space on right: 1024 - 900 = 124 < 288)
      await expect.poll(() => wrapper.find('.SActionMenu').classes()).toContain('right')
      // Dropdown should be positioned at the bottom
      await expect.poll(() => wrapper.find('.SActionMenu .dropdown').classes()).toContain('bottom')
    })

    it('keeps right alignment when space is available on left', async () => {
      const wrapper = mount(SActionMenu, {
        props: {
          options: mockOptions,
          dropdownAlign: 'right'
        }
      })

      setupPositionMocks(wrapper, 'top-right')

      await wrapper.find('button').trigger('click')

      // Should keep right (1000px space on left > 288px needed)
      await expect.poll(() => wrapper.find('.SActionMenu').classes()).toContain('right')
      // Dropdown should be positioned at the bottom
      await expect.poll(() => wrapper.find('.SActionMenu .dropdown').classes()).toContain('bottom')
    })
  })

  describe('Bottom-Left Position', () => {
    it('keeps left alignment', async () => {
      const wrapper = mount(SActionMenu, {
        props: {
          options: mockOptions,
          dropdownAlign: 'left'
        }
      })

      setupPositionMocks(wrapper, 'bottom-left')

      await wrapper.find('button').trigger('click')

      await expect.poll(() => wrapper.find('.SActionMenu').classes()).toContain('left')
      // Dropdown should be positioned at the top
      await expect.poll(() => wrapper.find('.SActionMenu .dropdown').classes()).toContain('top')
    })

    it('flips to left alignment when right preferred but insufficient space', async () => {
      const wrapper = mount(SActionMenu, {
        props: {
          options: mockOptions,
          dropdownAlign: 'right'
        }
      })

      setupPositionMocks(wrapper, 'bottom-left')

      await wrapper.find('button').trigger('click')

      await expect.poll(() => wrapper.find('.SActionMenu').classes()).toContain('left')
      // Dropdown should be positioned at the top
      await expect.poll(() => wrapper.find('.SActionMenu .dropdown').classes()).toContain('top')
    })
  })

  describe('Bottom-Right Position', () => {
    it('flips to right alignment when left preferred but insufficient space', async () => {
      const wrapper = mount(SActionMenu, {
        props: {
          options: mockOptions,
          dropdownAlign: 'left'
        }
      })

      setupPositionMocks(wrapper, 'bottom-right')

      await wrapper.find('button').trigger('click')

      await expect.poll(() => wrapper.find('.SActionMenu').classes()).toContain('right')
      // Dropdown should be positioned at the top
      await expect.poll(() => wrapper.find('.SActionMenu .dropdown').classes()).toContain('top')
    })

    it('keeps right alignment when space is available', async () => {
      const wrapper = mount(SActionMenu, {
        props: {
          options: mockOptions,
          dropdownAlign: 'right'
        }
      })

      setupPositionMocks(wrapper, 'bottom-right')

      await wrapper.find('button').trigger('click')

      await expect.poll(() => wrapper.find('.SActionMenu').classes()).toContain('right')
      // Dropdown should be positioned at the top
      await expect.poll(() => wrapper.find('.SActionMenu .dropdown').classes()).toContain('top')
    })
  })
})
