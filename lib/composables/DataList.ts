import { type ComputedRef, inject, provide } from 'vue'

export interface DataListState {
  labelWidth: ComputedRef<string>
}

export const DataListStateKey = 'sefirot-data-list-state-key'

export function provideDataListState(state: DataListState): void {
  provide(DataListStateKey, state)
}

export function useDataListState(): DataListState {
  const state = inject<DataListState | null>(DataListStateKey, null) || null
  if (!state) {
    throw new Error(
      'Unexpected call to `useDataListState`. This probably means you are using'
      + '`<DDataList>` child component outside of `<DDataList>`. Make sure'
      + ' to wrap the component within `<DDataList>` component.'
    )
  }
  return state
}
