import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import { useRouter } from 'vue-router'

export const useError = defineStore('sefirot-error', () => {
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
