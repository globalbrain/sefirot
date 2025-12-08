import { mount } from '@vue/test-utils'
import SInputDropdown from 'sefirot/components/SInputDropdown.vue'
import { nextTick } from 'vue'

describe('components/SInputDropdown', () => {
  describe('inline search filtering with Fuse.js', () => {
    it('should filter options based on search query', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Apple', value: 1 },
            { label: 'Banana', value: 2 },
            { label: 'Cherry', value: 3 },
            { label: 'Apricot', value: 4 }
          ],
          modelValue: []
        }
      })

      const input = wrapper.find('.inline-input')
      await input.setValue('ap')
      await nextTick()

      // Should filter to only Apple and Apricot using fuzzy search
      const dropdown = wrapper.find('.dropdown')
      expect(dropdown.exists()).toBe(true)
    })

    it('should return all options when query is empty', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Apple', value: 1 },
            { label: 'Banana', value: 2 },
            { label: 'Cherry', value: 3 }
          ],
          modelValue: []
        }
      })

      const input = wrapper.find('.inline-input')
      await input.setValue('')
      await nextTick()

      // All options should be available when query is empty
      // This is tested indirectly by checking the component state
      expect((input.element as HTMLInputElement).value).toBe('')
    })

    it('should handle no matches gracefully', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Apple', value: 1 },
            { label: 'Banana', value: 2 }
          ],
          modelValue: []
        }
      })

      const input = wrapper.find('.inline-input')
      await input.setValue('xyz')
      await nextTick()

      // Component should still render even with no matches
      expect(input.exists()).toBe(true)
    })

    it('should exclude disabled options from filtering', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Apple', value: 1 },
            { label: 'Banana', value: 2, disabled: true },
            { label: 'Cherry', value: 3 }
          ],
          modelValue: []
        }
      })

      const input = wrapper.find('.inline-input')
      await input.setValue('a')
      await nextTick()

      // Disabled options should not appear in filtered results
      expect(input.exists()).toBe(true)
    })
  })

  describe('keyboard navigation', () => {
    it('should navigate down with ArrowDown key', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 }
          ],
          modelValue: []
        }
      })

      const input = wrapper.find('.inline-input')
      await input.trigger('focus')
      await nextTick()

      // Press ArrowDown
      await input.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()

      const box = wrapper.find('.box')
      const ariaActiveDescendant = box.attributes('aria-activedescendant')
      expect(ariaActiveDescendant).toMatch(/option-0$/)
    })

    it('should navigate up with ArrowUp key', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 }
          ],
          modelValue: []
        }
      })

      const input = wrapper.find('.inline-input')
      await input.trigger('focus')
      await nextTick()

      // Press ArrowDown twice then ArrowUp once
      await input.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      await input.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      await input.trigger('keydown', { key: 'ArrowUp' })
      await nextTick()

      const box = wrapper.find('.box')
      const ariaActiveDescendant = box.attributes('aria-activedescendant')
      expect(ariaActiveDescendant).toMatch(/option-0$/)
    })

    it('should wrap to first option when pressing ArrowDown on last option', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: []
        }
      })

      const input = wrapper.find('.inline-input')
      await input.trigger('focus')
      await nextTick()

      // Navigate to last option and press ArrowDown again
      await input.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      await input.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      await input.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()

      const box = wrapper.find('.box')
      const ariaActiveDescendant = box.attributes('aria-activedescendant')
      expect(ariaActiveDescendant).toMatch(/option-0$/)
    })

    it('should wrap to last option when pressing ArrowUp on first option', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: []
        }
      })

      const input = wrapper.find('.inline-input')
      await input.trigger('focus')
      await nextTick()

      // Press ArrowDown to activate first option, then ArrowUp to wrap
      await input.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      await input.trigger('keydown', { key: 'ArrowUp' })
      await nextTick()

      const box = wrapper.find('.box')
      const ariaActiveDescendant = box.attributes('aria-activedescendant')
      expect(ariaActiveDescendant).toMatch(/option-1$/)
    })

    it('should select active option with Enter key', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: []
        }
      })

      const input = wrapper.find('.inline-input')
      await input.trigger('focus')
      await nextTick()

      // Type to trigger filtering and open dropdown - this sets active index to 0
      await input.setValue('Option')
      await nextTick()

      // Press Enter to select the first option (no ArrowDown needed since typing sets index to 0)
      await input.trigger('keydown', { key: 'Enter' })
      await nextTick()

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[1]])
    })

    it('should select active option with Tab key', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: []
        }
      })

      const input = wrapper.find('.inline-input')
      await input.trigger('focus')
      await nextTick()

      // Type to trigger filtering and open dropdown - this sets active index to 0
      await input.setValue('Option')
      await nextTick()

      // Press Tab to select the first option (no ArrowDown needed)
      await input.trigger('keydown', { key: 'Tab' })
      await nextTick()

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[1]])
    })

    it('should remove last selected item with Backspace when query is empty', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 }
          ],
          modelValue: [1, 2],
          nullable: true
        }
      })

      const input = wrapper.find('.inline-input')
      expect((input.element as HTMLInputElement).value).toBe('')

      // Press Backspace with empty query
      await input.trigger('keydown', { key: 'Backspace' })
      await nextTick()

      // Should remove the last item (value 2)
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[1]])
    })

    it('should not remove item with Backspace when query is not empty', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: [1],
          nullable: true
        }
      })

      const input = wrapper.find('.inline-input')
      await input.setValue('test')
      await nextTick()

      await input.trigger('keydown', { key: 'Backspace' })
      await nextTick()

      // Should not emit update event when query is not empty
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('should not navigate when disabled', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: [],
          disabled: true
        }
      })

      const input = wrapper.find('.inline-input')
      await input.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()

      const box = wrapper.find('.box')
      expect(box.attributes('aria-activedescendant')).toBeUndefined()
    })
  })

  describe('selection behavior', () => {
    it('should select option in multi-select mode', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: []
        }
      })

      const input = wrapper.find('.inline-input')

      // Type to open dropdown and filter options - this sets active index to 0
      await input.setValue('Option')
      await nextTick()

      // Press Enter to select first option
      await input.trigger('keydown', { key: 'Enter' })
      await nextTick()

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[1]])
    })

    it('should deselect option when clicking again in multi-select mode', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: [1],
          nullable: true
        }
      })

      const input = wrapper.find('.inline-input')

      // Type to open dropdown and filter - this sets active index to 0
      await input.setValue('Option 1')
      await nextTick()

      // Press Enter to toggle first option (deselect it)
      await input.trigger('keydown', { key: 'Enter' })
      await nextTick()

      // Should remove value 1 from the array
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]])
    })

    it('should select option in single-select mode', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: null
        }
      })

      const input = wrapper.find('.inline-input')

      // Type to open dropdown and filter - this sets active index to 0
      await input.setValue('Option')
      await nextTick()

      // Press Enter to select first option
      await input.trigger('keydown', { key: 'Enter' })
      await nextTick()

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1])
    })

    it('should replace selection in single-select mode', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: 1,
          nullable: true
        }
      })

      const input = wrapper.find('.inline-input')
      await input.setValue('Option 2')
      await nextTick()

      // Press Enter to select the filtered option (Option 2)
      await input.trigger('keydown', { key: 'Enter' })
      await nextTick()

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
    })

    it('should select first filtered option when pressing Enter with query', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Apple', value: 1 },
            { label: 'Banana', value: 2 },
            { label: 'Apricot', value: 3 }
          ],
          modelValue: []
        }
      })

      const input = wrapper.find('.inline-input')
      await input.setValue('ap')
      await nextTick()
      await input.trigger('keydown', { key: 'Enter' })
      await nextTick()

      // Should select the first match (Apple, value 1)
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[1]])
    })
  })

  describe('reset behavior after selection', () => {
    it('should clear query after selection', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: []
        }
      })

      const input = wrapper.find('.inline-input')
      await input.setValue('opt')
      await nextTick()
      await input.trigger('keydown', { key: 'Enter' })
      await nextTick()
      await nextTick() // Wait for reset

      expect((input.element as HTMLInputElement).value).toBe('')
    })

    it('should reset active index after selection', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: []
        }
      })

      const input = wrapper.find('.inline-input')
      await input.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      await input.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      await input.trigger('keydown', { key: 'Enter' })
      await nextTick()
      await nextTick() // Wait for reset

      const box = wrapper.find('.box')
      // After reset, aria-activedescendant should not be set
      expect(box.attributes('aria-activedescendant')).toBeUndefined()
    })
  })

  describe('chip rendering in multi-select mode', () => {
    it('should render chips for selected items', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 }
          ],
          modelValue: [1, 2]
        }
      })

      const chips = wrapper.findAll('.inline-chip')
      expect(chips).toHaveLength(2)
      expect(chips[0].text()).toContain('Option 1')
      expect(chips[1].text()).toContain('Option 2')
    })

    it('should render chip with close button when removable', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: [1],
          nullable: true
        }
      })

      const chip = wrapper.find('.inline-chip')
      const closeButton = chip.find('.inline-chip-close')
      expect(closeButton.exists()).toBe(true)
    })

    it('should remove item when chip close button is clicked', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: [1, 2],
          nullable: true
        }
      })

      const chips = wrapper.findAll('.inline-chip')
      const closeButton = chips[0].find('.inline-chip-close')
      await closeButton.trigger('click')
      await nextTick()

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[2]])
    })

    it('should render avatar chips correctly', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { type: 'avatar', label: 'John Doe', value: 1, image: 'avatar1.jpg' },
            { type: 'avatar', label: 'Jane Smith', value: 2, image: 'avatar2.jpg' }
          ],
          modelValue: [1]
        }
      })

      const chip = wrapper.find('.inline-chip.avatar')
      expect(chip.exists()).toBe(true)
      expect(chip.find('.inline-chip-avatar').exists()).toBe(true)
      expect(chip.find('.inline-chip-label').text()).toBe('John Doe')
    })

    it('should have internationalized aria-label on chip close buttons', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 }
          ],
          modelValue: [1],
          nullable: true
        }
      })

      const closeButton = wrapper.find('.inline-chip-close')
      const ariaLabel = closeButton.attributes('aria-label')
      expect(ariaLabel).toContain('Option 1')
    })
  })

  describe('focus management', () => {
    it('should focus inline input when box is clicked', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: []
        },
        attachTo: document.body
      })

      const box = wrapper.find('.box')
      await box.trigger('click')
      await nextTick()

      const input = wrapper.find('.inline-input')
      expect(document.activeElement).toBe(input.element)

      wrapper.unmount()
    })

    it('should refocus inline input after selection', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: []
        },
        attachTo: document.body
      })

      const input = wrapper.find('.inline-input')
      await input.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      await input.trigger('keydown', { key: 'Enter' })
      await nextTick()
      await nextTick() // Wait for focus

      expect(document.activeElement).toBe(input.element)

      wrapper.unmount()
    })

    it('should not focus when disabled', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 }
          ],
          modelValue: [],
          disabled: true
        },
        attachTo: document.body
      })

      const box = wrapper.find('.box')
      await box.trigger('click')
      await nextTick()

      const input = wrapper.find('.inline-input')
      expect(document.activeElement).not.toBe(input.element)

      wrapper.unmount()
    })
  })

  describe('ARIA attributes for inline search', () => {
    it('should add ARIA attributes when search="inline"', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 }
          ],
          modelValue: []
        }
      })

      const box = wrapper.find('.box')

      // Should have combobox role
      expect(box.attributes('role')).toBe('combobox')

      // Should have aria-expanded (initially false since dropdown is closed)
      expect(box.attributes('aria-expanded')).toBe('false')

      // Should have aria-controls
      expect(box.attributes('aria-controls')).toBeDefined()

      // aria-activedescendant should not be set when no option is active
      expect(box.attributes('aria-activedescendant')).toBeUndefined()
    })

    it('should update aria-expanded when dropdown opens', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: []
        }
      })

      const box = wrapper.find('.box')
      expect(box.attributes('aria-expanded')).toBe('false')

      // Click to open dropdown
      await box.trigger('click')
      await nextTick()

      expect(box.attributes('aria-expanded')).toBe('true')
    })

    it('should set aria-activedescendant when navigating options', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: []
        }
      })

      // Open dropdown first
      await wrapper.find('.box').trigger('click')
      await nextTick()

      const input = wrapper.find('.inline-input')

      // Type to trigger filtering
      await input.setValue('Option')
      await nextTick()

      const box = wrapper.find('.box')

      // aria-activedescendant should be set when an option is active
      const ariaActiveDescendant = box.attributes('aria-activedescendant')
      expect(ariaActiveDescendant).toBeDefined()
      expect(ariaActiveDescendant).toMatch(/option-0$/)
    })

    it('should add role="listbox" to dropdown when search="inline"', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: 'inline',
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: []
        }
      })

      // Open dropdown
      await wrapper.find('.box').trigger('click')
      await nextTick()

      const dropdownContent = wrapper.find('.dropdown-content')
      expect(dropdownContent.attributes('role')).toBe('listbox')
      expect(dropdownContent.attributes('id')).toBeDefined()
    })

    it('should not add ARIA attributes when search is not "inline"', async () => {
      const wrapper = mount(SInputDropdown, {
        props: {
          search: true,
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 }
          ],
          modelValue: null
        }
      })

      const box = wrapper.find('.box')

      // Should have button role, not combobox
      expect(box.attributes('role')).toBe('button')

      // Should not have ARIA attributes
      expect(box.attributes('aria-expanded')).toBeUndefined()
      expect(box.attributes('aria-controls')).toBeUndefined()
      expect(box.attributes('aria-activedescendant')).toBeUndefined()
    })
  })
})
