import { useUrlQuerySync } from 'sefirot/composables/Url'
import { setupWithWrapper } from 'tests/Utils'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

describe('composables/Url', () => {
  describe('useUrlQuerySync', () => {
    it('syncs data changes to the URL query', async () => {
      const { wrapper, vm } = setupWithWrapper(() => {
        const data = reactive({ page: 1 })
        useUrlQuerySync(data)

        const route = useRoute()
        return { data, route }
      })

      // If the query is default value, do not show params on URL.
      expect(vm.route.query.page).toBeUndefined()

      // Change the data and check if the URL is updated.
      vm.data.page = 2
      await expect.poll(() => {
        return vm.route.query.page
      }).toBe('2')

      wrapper.unmount()
    })

    it('syncs the URL query to state on initialization', async () => {
      const { wrapper, vm } = setupWithWrapper(() => {
        const router = useRouter()

        // Set initial URL query before creating the composable
        router.replace({ query: { page: '5' } })

        const data = reactive({ page: 1 })
        useUrlQuerySync(data)

        const route = useRoute()
        return { data, route }
      })

      // State should be updated from URL query
      await expect.poll(() => vm.data.page).toBe('5')

      wrapper.unmount()
    })

    it('supports casting with the casts option', async () => {
      const { wrapper, vm } = setupWithWrapper(() => {
        const router = useRouter()

        // Set initial URL query
        router.replace({ query: { page: '10', isActive: 'true' } })

        const data = reactive({
          page: 1,
          isActive: false
        })

        useUrlQuerySync(data, {
          casts: {
            page: (value) => Number(value),
            isActive: (value) => value === 'true'
          }
        })

        const route = useRoute()
        return { data, route }
      })

      // State should be updated with casted values
      await expect.poll(() => vm.data.page).toBe(10)
      await expect.poll(() => vm.data.isActive).toBe(true)
      expect(typeof vm.data.page).toBe('number')
      expect(typeof vm.data.isActive).toBe('boolean')

      wrapper.unmount()
    })

    it('excludes specified keys from URL sync', async () => {
      const { wrapper, vm } = setupWithWrapper(() => {
        const data = reactive({
          page: 1,
          perPage: 50,
          secretToken: 'abc123'
        })

        useUrlQuerySync(data, {
          exclude: ['perPage', 'secretToken']
        })

        const route = useRoute()
        return { data, route }
      })

      // Change all values
      vm.data.page = 2
      vm.data.perPage = 100
      vm.data.secretToken = 'xyz789'

      // Only page should appear in URL
      await expect.poll(() => {
        return vm.route.query.page
      }).toBe('2')

      expect(vm.route.query.perPage).toBeUndefined()
      expect(vm.route.query.secretToken).toBeUndefined()

      wrapper.unmount()
    })

    it('handles arrays correctly', async () => {
      const { wrapper, vm } = setupWithWrapper(() => {
        const data = reactive({
          tags: ['vue', 'typescript'],
          categories: [] as string[]
        })

        useUrlQuerySync(data)

        const route = useRoute()
        return { data, route }
      })

      // Modify arrays
      vm.data.tags.push('javascript')
      vm.data.categories = ['frontend', 'backend']

      await expect.poll(() => {
        return vm.route.query.tags
      }).toEqual(['vue', 'typescript', 'javascript'])

      await expect.poll(() => {
        return vm.route.query.categories
      }).toEqual(['frontend', 'backend'])

      wrapper.unmount()
    })

    it('syncs arrays from the URL to state', async () => {
      const { wrapper, vm } = setupWithWrapper(() => {
        const router = useRouter()

        router.replace({
          query: {
            tags: ['react', 'vue'],
            ids: ['1', '2', '3']
          }
        })

        const data = reactive({
          tags: ['typescript'],
          ids: [] as string[]
        })

        useUrlQuerySync(data)

        return { data }
      })

      // State arrays should be updated from URL
      await expect.poll(() => vm.data.tags).toEqual(['react', 'vue'])
      await expect.poll(() => vm.data.ids).toEqual(['1', '2', '3'])

      wrapper.unmount()
    })

    it('does not show default values in the URL', async () => {
      const { wrapper, vm } = setupWithWrapper(() => {
        const data = reactive({
          page: 1,
          size: 10,
          search: ''
        })

        useUrlQuerySync(data)

        const route = useRoute()
        return { data, route }
      })

      // Change one value from default
      vm.data.page = 2

      await expect.poll(() => {
        return vm.route.query.page
      }).toBe('2')

      // Other default values should still not be in URL
      expect(vm.route.query.size).toBeUndefined()
      expect(vm.route.query.search).toBeUndefined()

      wrapper.unmount()
    })

    it('clears the URL when values return to default', async () => {
      const { wrapper, vm } = setupWithWrapper(() => {
        const data = reactive({
          page: 1,
          search: ''
        })

        useUrlQuerySync(data)

        const route = useRoute()
        return { data, route }
      })

      // Change values away from defaults
      vm.data.page = 3
      vm.data.search = 'test'

      // Wait for URL to update
      await expect.poll(() => {
        return vm.route.query.page
      }).toBe('3')

      await expect.poll(() => {
        return vm.route.query.search
      }).toBe('test')

      // Reset one value to default and check if it gets removed
      vm.data.page = 1 // back to default
      await expect.poll(() => vm.route.query.page).toBeUndefined()

      // Change back to non-default to verify sync still works
      vm.data.page = 5

      await expect.poll(() => {
        return vm.route.query.page
      }).toBe('5')

      // This confirms bidirectional sync is working correctly
      expect(vm.data.page).toBe(5)

      wrapper.unmount()
    })

    it('works with a ref instead of reactive', async () => {
      const { wrapper, vm } = setupWithWrapper(() => {
        const data = ref({
          page: 1,
          name: 'test'
        })

        useUrlQuerySync(data)

        const route = useRoute()
        return { data, route }
      })

      // Change ref value
      vm.data.page = 5
      vm.data.name = 'updated'

      await expect.poll(() => {
        return vm.route.query.page
      }).toBe('5')

      await expect.poll(() => {
        return vm.route.query.name
      }).toBe('updated')

      wrapper.unmount()
    })

    it('handles a complex scenario with all features', async () => {
      const { wrapper, vm } = setupWithWrapper(() => {
        const router = useRouter()

        // Set initial URL with various data types
        router.replace({
          query: {
            page: '5',
            search: 'initial',
            tags: ['tag1', 'tag2'],
            showDeleted: 'true'
          }
        })

        const data = reactive({
          page: 1,
          search: '',
          tags: [] as string[],
          showDeleted: false,
          perPage: 20, // will be excluded
          internalToken: 'secret' // will be excluded
        })

        useUrlQuerySync(data, {
          casts: {
            page: (v) => Number(v),
            showDeleted: (v) => v === 'true'
          },
          exclude: ['perPage', 'internalToken']
        })

        const route = useRoute()
        return { data, route, router }
      })

      // Initial sync from URL should work with casting
      await expect.poll(() => vm.data.page).toBe(5)
      await expect.poll(() => vm.data.search).toBe('initial')
      await expect.poll(() => vm.data.tags).toEqual(['tag1', 'tag2'])
      await expect.poll(() => vm.data.showDeleted).toBe(true)

      // Change values
      vm.data.page = 10
      vm.data.search = 'updated'
      vm.data.tags = ['new-tag']
      vm.data.showDeleted = false // Set back to default
      vm.data.perPage = 50 // excluded, should not appear in URL
      vm.data.internalToken = 'new-secret' // excluded, should not appear in URL

      // URL should reflect changes (except excluded and defaults)
      await expect.poll(() => vm.route.query.page).toBe('10')
      await expect.poll(() => vm.route.query.search).toBe('updated')
      await expect.poll(() => vm.route.query.tags).toEqual(['new-tag'])

      // showDeleted is set back to default (false), so it should not be in URL
      await expect.poll(() => vm.route.query.showDeleted).toBeUndefined()

      // Excluded values should not be in URL
      expect(vm.route.query.perPage).toBeUndefined()
      expect(vm.route.query.internalToken).toBeUndefined()

      wrapper.unmount()
    })

    // #578
    it('preserves state when the path changes', async () => {
      const { wrapper, vm } = setupWithWrapper(() => {
        const router = useRouter()

        const data = reactive({
          page: 1,
          search: ''
        })

        useUrlQuerySync(data)

        const route = useRoute()
        return { data, route, router }
      })

      // Set initial state and sync to URL
      vm.data.page = 2
      vm.data.search = 'test'

      // Wait for sync to URL
      await expect.poll(() => vm.route.query.page).toBe('2')
      await expect.poll(() => vm.route.query.search).toBe('test')

      // Change the state values
      vm.data.page = 5
      vm.data.search = 'modified'

      // Verify state changes are reflected in URL
      await expect.poll(() => vm.route.query.page).toBe('5')
      await expect.poll(() => vm.route.query.search).toBe('modified')

      // Add a new route dynamically to test path changes
      vm.router.addRoute({
        path: '/about',
        component: { render: () => null }
      })

      // Navigate to the new route with different query parameters
      await vm.router.push({
        path: '/about',
        query: { page: '99', search: 'different', otherParam: 'value' }
      })

      // Wait a bit to ensure any potential sync has time to occur
      await new Promise((resolve) => setTimeout(resolve, 100))

      // The internal state should be preserved (not updated from the new query)
      // because the path changed, but the internal state is only associated with the previous path
      expect(vm.data.page).toBe(5) // Should still be our modified value
      expect(vm.data.search).toBe('modified') // Should still be our modified value

      // Verify the route has actually changed to the new path and query
      expect(vm.route.path).toBe('/about')
      expect(vm.route.query.page).toBe('99')
      expect(vm.route.query.search).toBe('different')
      expect(vm.route.query.otherParam).toBe('value')

      wrapper.unmount()
    })
  })
})
