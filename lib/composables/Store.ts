import { getCurrentInstance } from '@vue/composition-api'
import { Store } from 'vuex'
import { State } from '../store/Sefirot'

export function useStore(): Store<State> {
  const { proxy } = getCurrentInstance()!

  return proxy.$store
}
