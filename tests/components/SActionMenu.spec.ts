import { flushPromises, mount } from '@vue/test-utils'
import SActionMenu from 'sefirot/components/SActionMenu.vue'
import { type DropdownSection } from 'sefirot/composables/Dropdown'

const options: DropdownSection[] = [{
  type: 'actions',
  options: [{ label: 'Edit', onClick: () => {} }]
}]

describe('SActionMenu viewport alignment', () => {
  beforeEach(() => {
    vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1024)
    vi.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(768)
    vi.spyOn(document.documentElement, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 1024, 768))
    vi.stubGlobal('innerWidth', 1024)
    vi.stubGlobal('innerHeight', 768)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it.each([
    { x: 50, y: 50, align: 'left', left: 50, top: 88 },
    { x: 50, y: 50, align: 'right', left: 50, top: 88 },
    { x: 900, y: 50, align: 'left', left: 712, top: 88 },
    { x: 900, y: 50, align: 'right', left: 712, top: 88 },
    { x: 50, y: 700, align: 'left', left: 50, top: 542 },
    { x: 50, y: 700, align: 'right', left: 50, top: 542 },
    { x: 900, y: 700, align: 'left', left: 712, top: 542 },
    { x: 900, y: 700, align: 'right', left: 712, top: 542 }
  ] as const)('keeps a menu reachable at ($x, $y) with $align alignment', async ({ x, y, align, left, top }) => {
    const wrapper = mount(SActionMenu, { props: { options, dropdownAlign: align }, attachTo: document.body })
    const root = wrapper.element as HTMLElement
    // happy-dom leaves these computed defaults empty; Popper expects browser values.
    for (let node: HTMLElement | null = root; node; node = node.parentElement) {
      node.style.transform = 'none'
      node.style.perspective = 'none'
    }
    const popup = wrapper.find<HTMLElement>('.dropdown').element
    vi.spyOn(root, 'getBoundingClientRect').mockReturnValue(new DOMRect(x, y, 100, 30))
    vi.spyOn(popup, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 288, 150))
    Object.defineProperties(popup, { offsetWidth: { value: 288 }, offsetHeight: { value: 150 } })

    await wrapper.find('button').trigger('click')
    await flushPromises()
    expect(popup.style.left).toBe(`${left}px`)
    expect(popup.style.top).toBe(`${top}px`)
    await wrapper.find('button').trigger('click')
    expect(popup.style.display).toBe('none')
    wrapper.unmount()
  })
})
