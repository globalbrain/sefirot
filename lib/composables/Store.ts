import { getCurrentInstance } from '@vue/composition-api'
import { Store } from 'vuex'

export function useStore() {
  const vm = getCurrentInstance()?.proxy as any

  return vm.$store as Store<any>
}
