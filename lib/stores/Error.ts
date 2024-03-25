import { defineStore } from 'pinia'
import { shallowRef } from 'vue'

export const useError = defineStore('sefirot-error', () => {
  const error = shallowRef()

  function setError(err: unknown): void {
    error.value = err
  }

  function clearError(): void {
    error.value = undefined
  }

  return {
    error,
    setError,
    clearError
  }
})
