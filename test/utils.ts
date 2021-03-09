import Vue, { VueConstructor, PluginFunction, PluginObject } from 'vue'
import { createLocalVue, Wrapper as VTUWrapper, MountOptions } from '@vue/test-utils'

interface CreateVueContext {
  localVue: VueConstructor<Vue>
  use<T>(plugin: PluginObject<T> | PluginFunction<T>, options?: T): CreateVueContext
}

export type Wrapper<V extends Vue = Vue> = VTUWrapper<V & Record<string, any>>

export type CreateWrapperFn<V extends Vue = Vue> = (options?: MountOptions<V>) => Wrapper<V>

export function createVue(): CreateVueContext {
  const localVue = createLocalVue()

  return {
    localVue,
    use(plugin, options) {
      localVue.use(plugin, options)
      return this
    }
  }
}
