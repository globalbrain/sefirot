import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Snackbar {
  text: string
  mode?: 'neutral' | 'info' | 'warning' | 'danger'
  actions?: SnackbarAction[]
  timeout?: number
}

export interface SnackbarWithId extends Snackbar {
  id: number
}

export interface SnackbarAction {
  label: string
  onClick(): void
}

export const useSnackbars = defineStore('sefirot-snackbars', () => {
  const maxItemSize = 4

  let nextId = 0

  const items = ref<SnackbarWithId[]>([])

  function push(snackbar: Snackbar): void {
    if (items.value.length > maxItemSize) {
      items.value.shift()
    }

    const id = nextId++

    items.value.push({ id, ...snackbar })

    setTimeout(() => { pop(id) }, snackbar.timeout ?? 10000)
  }

  function pop(id: number): void {
    items.value = items.value.filter((item) => item.id !== id)
  }

  return {
    items,
    push,
    pop
  }
})
