import { type ComputedRef, type Ref, computed, inject, provide, ref, toValue } from 'vue'

export interface CardState {
  isCollapsed: Ref<boolean>
  setCollapse(value: boolean): void
  toggleCollapse(): void
}

export type CardBlockSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'

export const CardStateKey = 'sefirot-card-state-key'
export const CardBlockSizeKey = 'sefirot-card-block-size-key'

export function provideCardState(): CardState {
  const isCollapsed = ref(false)

  function setCollapse(value: boolean): void {
    isCollapsed.value = value
  }

  function toggleCollapse(): void {
    isCollapsed.value = !isCollapsed.value
  }

  const cardState = {
    isCollapsed,
    setCollapse,
    toggleCollapse
  }

  provide(CardStateKey, cardState)

  return cardState
}

export function provideCardBlockSize(cardBlockSize: ComputedRef<CardBlockSize | null>): void {
  provide(CardBlockSizeKey, cardBlockSize)
}

export function useCardState(): CardState {
  const cardState = inject<CardState | null>(CardStateKey, null) || null

  if (!cardState) {
    throw new Error(
      '[sefirot] Unexpected call to `useCardState`. This probably means you'
      + ' are using `<SCard>` child component outside of `<SCard>`. Make sure'
      + ' to wrap the component within `<SCard>` component.'
    )
  }

  return cardState
}

export function useCardBlockSize(): ComputedRef<CardBlockSize | null> {
  const cardSize = inject<ComputedRef<CardBlockSize | null> | null>(CardBlockSizeKey, null) || null
  return computed(() => toValue(cardSize))
}
