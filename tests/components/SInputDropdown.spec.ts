import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import SInputDropdown from 'sefirot/components/SInputDropdown.vue'

describe('components/SInputDropdown', () => {
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
