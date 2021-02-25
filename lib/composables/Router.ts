import { getCurrentInstance } from '@vue/composition-api'
import VueRouter, { Route } from 'vue-router'

export function useRouter() {
  const vm = getCurrentInstance()?.proxy as any

  return vm.$router as VueRouter
}

export function useRoute() {
  const vm = getCurrentInstance()?.proxy as any

  return vm.$route as Route
}
