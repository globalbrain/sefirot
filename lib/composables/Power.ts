import { type Ref, ref } from 'vue'

export interface Power {
  state: Ref<boolean>
  on(fn?: () => void): boolean
  onAfter(fn: () => Promise<any>): Promise<boolean>
  off(fn?: () => void): boolean
  offAfter(fn: () => Promise<any>): Promise<boolean>
  toggle(fn?: () => void): boolean
  toggleAfter(fn: () => Promise<any>): Promise<boolean>
}

export function usePower(initialValue = false): Power {
  const state = ref(initialValue)

  function on(fn: () => void = () => {}): boolean {
    typeof fn === 'function' && fn()
    state.value = true
    return state.value
  }

  async function onAfter(fn: () => Promise<any>): Promise<boolean> {
    await fn()
    return on()
  }

  function off(fn: () => void = () => {}): boolean {
    typeof fn === 'function' && fn()
    state.value = false
    return state.value
  }

  async function offAfter(fn: () => Promise<any>): Promise<boolean> {
    await fn()
    return off()
  }

  function toggle(fn: () => void = () => {}): boolean {
    typeof fn === 'function' && fn()
    state.value = !state.value
    return state.value
  }

  async function toggleAfter(fn: () => Promise<any>): Promise<boolean> {
    await fn()
    return toggle()
  }

  return {
    state,
    on,
    onAfter,
    off,
    offAfter,
    toggle,
    toggleAfter
  }
}
