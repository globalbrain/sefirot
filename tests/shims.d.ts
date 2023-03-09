import '@vue/test-utils'

// Required due to Vue type change breaking test utils types.
// see: https://github.com/vuejs/test-utils/issues/1973
declare module '@vue/test-utils' {
  export function mount<T extends DefineComponent<{}, {}, any>>(
    component: T,
    options?: ComponentMountingOptions<T>
  ): VueWrapper<InstanceType<T>>
}
