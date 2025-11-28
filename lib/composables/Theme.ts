import { useDark } from '@vueuse/core'
import { type WritableComputedRef, computed } from 'vue'

export type Theme = 'light' | 'dark'

export function useTheme(): WritableComputedRef<Theme> {
  const _isDark = useDark()

  return computed({
    get: () => (_isDark.value ? 'dark' : 'light'),
    set: (v) => { _isDark.value = v === 'dark' }
  })
}
