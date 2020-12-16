import { getCurrentInstance } from '@vue/composition-api'
import VueRouter, { Route } from 'vue-router'

export function useRouter () {
  const vm = getCurrentInstance() as any

  return vm.$router as VueRouter
}

export function useRoute () {
  const vm = getCurrentInstance() as any

  return vm.$route as Route
}
