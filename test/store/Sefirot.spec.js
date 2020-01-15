import Vue from 'vue'
import Vuex from 'vuex'
import Sefirot from 'sefirot/store/Sefirot'

Vue.use(Vuex)

describe('Store - Sefirot', () => {
  test('it registers Sefirot modules', () => {
    const store = new Vuex.Store({
      plugins: [Sefirot]
    })

    expect(store.state.modal).toBeTruthy()
    expect(store.state.snackbars).toBeTruthy()
  })
})
