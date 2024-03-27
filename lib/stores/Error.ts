import { defineStore } from 'pinia'
import { shallowRef, toRef } from 'vue'
import { useRouter } from 'vue-router'

const _useError = defineStore('sefirot-error', () => {
  const error = shallowRef()

  function setError(err: unknown): void {
    error.value = err
  }

  async function clearError(options: { redirect?: string } = {}): Promise<void> {
    if (options.redirect) {
      await useRouter().replace(options.redirect)
    }
    error.value = undefined
  }

  return {
    error,
    setError,
    clearError
  }
})

export function useError() {
  const errorStore = _useError()
  return {
    error: toRef(() => errorStore.error),
    setError: errorStore.setError,
    clearError: errorStore.clearError
  }
}
