import { type InjectionKey, type Ref, inject, provide, ref } from 'vue'

export interface CardState {
  isCollapsed: Ref<boolean>
  setCollapse(value: boolean): void
  toggleCollapse(): void
}

export const cardStateKey = Symbol('card-state') as InjectionKey<CardState>

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

  provide(cardStateKey, cardState)

  return cardState
}

export function useCardState(): CardState {
  const cardState = inject(cardStateKey)

  if (!cardState) {
    throw new Error(
      '[sefirot] Unexpected call to `useCardState`. This probably means you'
      + ' are using `<SCard>` child component outside of `<SCard>`. Make sure'
      + ' to wrap the component within `<SCard>` component.'
    )
  }

  return cardState
}
