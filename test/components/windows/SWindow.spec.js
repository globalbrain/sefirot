import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueThinModal from 'vue-thin-modal'
import Sefirot from '@/store/Sefirot'
import SWindowFull from './_fixtures/SWindowFull'
import SWindowBlank from './_fixtures/SWindowBlank'

const localVue = createLocalVue()

localVue.use(Vuex)

localVue.use(VueThinModal, {
  autoMountPortal: false
})

describe('Components - Windows - SWindow', () => {
  let store = {}

  beforeAll(() => {
    store = new Vuex.Store({
      plugins: [Sefirot]
    })
  })

  test('it can have title, lead and actions', async () => {
    const wrapper = mount(SWindowFull, { localVue, store })

    store.dispatch('window/open', {
      name: 's-window-full'
    })

    await localVue.nextTick()

    expect(wrapper.find('.SWindow .title').exists()).toBe(true)
    expect(wrapper.find('.SWindow .lead').exists()).toBe(true)
    expect(wrapper.find('.SWindow .actions').exists()).toBe(true)

    wrapper.find('.SWindow .actions .action .SButton').trigger('click')

    await localVue.nextTick()

    expect(wrapper.find('.SWindow').exists()).toBe(false)
  })

  test('it can be blank', async () => {
    const wrapper = mount(SWindowBlank, { localVue, store })

    store.dispatch('window/open', {
      name: 's-window-blank'
    })

    await localVue.nextTick()

    expect(wrapper.find('.SWindow .title').exists()).toBe(false)
    expect(wrapper.find('.SWindow .lead').exists()).toBe(false)
    expect(wrapper.find('.SWindow .actions').exists()).toBe(false)

    wrapper.find('.SWindow .close').trigger('click')

    await localVue.nextTick()

    expect(wrapper.find('.SWindow').exists()).toBe(false)
  })
})
