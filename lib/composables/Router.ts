import { getCurrentInstance } from '@vue/composition-api'
import VueRouter, { Route } from 'vue-router'

export function useRouter(): VueRouter {
  const { proxy } = getCurrentInstance()!

  return proxy.$router
}

export function useRoute(): Route {
  const { proxy } = getCurrentInstance()!

  return proxy.$route
}
