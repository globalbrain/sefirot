import { type LensQuerySort } from 'sefirot/blocks/lens/LensQuery'
import { useCatalogUrlQuerySync } from 'sefirot/blocks/lens/composables/CatalogUrlQuerySync'
import { setupWithWrapper } from 'tests/Utils'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Pass `null` as `initialQuery` to keep the current query of the shared
// router untouched.
function setupCatalog(
  initialQuery: Record<string, any> | null = {},
  initialFilters: any[] = []
) {
  return setupWithWrapper(() => {
    const router = useRouter()

    if (initialQuery) {
      router.replace({ query: initialQuery })
    }

    const query = ref<string | null>(null)
    const filters = ref<any[]>(initialFilters)
    const sort = ref<LensQuerySort[]>([])
    const page = ref(1)

    const calls = ref(0)

    useCatalogUrlQuerySync({ query, filters, sort, page }, () => {
      calls.value++
    })

    const route = useRoute()
    return { query, filters, sort, page, calls, route, router }
  })
}

describe('blocks/lens/composables/CatalogUrlQuerySync', () => {
  it('syncs the catalog state to the URL', async () => {
    const { wrapper, vm } = setupCatalog()

    vm.query = 'acme'
    vm.filters = [['name', '=', 'foo']]
    vm.sort = [['name', 'desc']]
    vm.page = 2

    await expect.poll(() => vm.route.query.q).toBe('acme')
    expect(vm.route.query.filters).toBe('[["name","=","foo"]]')
    expect(vm.route.query.sort).toBe('[["name","desc"]]')
    expect(vm.route.query.page).toBe('2')

    // Params should be removed when the state returns to the defaults.
    vm.query = null
    vm.filters = []
    vm.sort = []
    vm.page = 1

    await expect.poll(() => vm.route.query.q).toBeUndefined()
    expect(vm.route.query.filters).toBeUndefined()
    expect(vm.route.query.sort).toBeUndefined()
    expect(vm.route.query.page).toBeUndefined()

    wrapper.unmount()
  })

  it('restores the catalog state from the URL on initialization', async () => {
    const { wrapper, vm } = setupCatalog({
      q: 'acme',
      filters: '[["name","=","foo"],["$or",[["age",">",30],["age","<",10]]]]',
      sort: '[["name","asc"]]',
      page: '3'
    })

    await expect.poll(() => vm.query).toBe('acme')
    expect(vm.filters).toEqual([['name', '=', 'foo'], ['$or', [['age', '>', 30], ['age', '<', 10]]]])
    expect(vm.sort).toEqual([['name', 'asc']])
    expect(vm.page).toBe(3)

    wrapper.unmount()
  })

  it('falls back to the initial state for malformed params', async () => {
    const { wrapper, vm } = setupCatalog({
      q: '',
      filters: 'not-a-json',
      sort: '[["name","sideways"]]',
      page: 'NaN'
    }, [['status', '=', 'open']])

    // Malformed params are dropped from the URL, and the state keeps the
    // initial values, exactly as if the params were absent.
    await expect.poll(() => vm.route.query.filters).toBeUndefined()
    expect(vm.route.query.q).toBeUndefined()
    expect(vm.route.query.sort).toBeUndefined()
    expect(vm.route.query.page).toBeUndefined()

    expect(vm.query).toBe(null)
    expect(vm.filters).toEqual([['status', '=', 'open']])
    expect(vm.sort).toEqual([])
    expect(vm.page).toBe(1)

    wrapper.unmount()
  })

  it('falls back to the initial state even after in-place filter mutations', async () => {
    const { wrapper, vm } = setupCatalog({}, [['status', '=', 'open']])

    // Mutate the filters in place, as the catalog's inline filter path
    // does. This must not drift the fallback snapshot of the initial
    // filters along with it.
    vm.filters.push(['name', '=', 'foo'])

    await expect.poll(() => vm.route.query.filters)
      .toBe('[["status","=","open"],["name","=","foo"]]')

    await vm.router.replace({ query: { filters: 'broken' } })

    // The malformed param falls back to the initial filters, not to the
    // mutated current value, and drops itself from the URL. Note that the
    // URL is written back after the state is updated, so it must be the
    // one to poll on.
    await expect.poll(() => vm.route.query.filters).toBeUndefined()
    expect(vm.filters).toEqual([['status', '=', 'open']])

    wrapper.unmount()
  })

  it('rejects filters with an unknown shape or operator', async () => {
    const { wrapper, vm } = setupCatalog({
      filters: '[["name","~","foo"]]'
    })

    await expect.poll(() => vm.route.query.filters).toBeUndefined()
    expect(vm.filters).toEqual([])

    wrapper.unmount()
  })

  it('calls onChange when the URL drives the state', async () => {
    const { wrapper, vm } = setupCatalog({ q: 'initial' })

    await expect.poll(() => vm.query).toBe('initial')

    const callsAfterInit = vm.calls

    await vm.router.replace({ query: { q: 'updated' } })

    await expect.poll(() => vm.query).toBe('updated')
    expect(vm.calls).toBeGreaterThan(callsAfterInit)

    wrapper.unmount()
  })

  it('warns when multiple synced catalogs are active at once', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const first = setupCatalog()
    expect(warn).not.toHaveBeenCalled()

    const second = setupCatalog(null)
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('`url-sync`'))

    first.wrapper.unmount()
    second.wrapper.unmount()
    warn.mockRestore()
  })
})
