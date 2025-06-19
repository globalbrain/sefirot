import { useUrlQuerySync } from 'sefirot/composables/Url'
import { setup } from 'tests/Utils'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

describe('composables/Url', () => {
  describe('useUrlQuerySync', () => {
    test('URL query should be synced with data', async () => {
      const vm = setup(() => {
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
        console.error(vm.route.query)
        return vm.route.query.page
      }).toBe('2')
    })
  })
})
