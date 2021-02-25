import { computed, ComputedRef, getCurrentInstance } from '@vue/composition-api'
import VueRouter, { Route } from 'vue-router'

export function useRouter(): VueRouter {
  const { proxy } = getCurrentInstance()!

  return proxy.$router
}

export function useRoute(): ComputedRef<Route> {
  const { proxy } = getCurrentInstance()!

  return computed(() => proxy.$route)
}

export function useParams(): ComputedRef<Record<string, string>> {
  const { proxy } = getCurrentInstance()!

  return computed(() => proxy.$route.params)
}
