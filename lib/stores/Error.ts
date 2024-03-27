import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import { useRouter } from 'vue-router'

export const useError = defineStore('sefirot-error', () => {
  const data = shallowRef<unknown>()

  function set(err: unknown): void {
    data.value = err
  }

  async function clear(options: { redirect?: string } = {}): Promise<void> {
    if (options.redirect) {
      await useRouter().replace(options.redirect)
    }
    data.value = undefined
  }

  return {
    data,
    set,
    clear
  }
})
