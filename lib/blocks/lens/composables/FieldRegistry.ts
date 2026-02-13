import { type InjectionKey, inject, provide } from 'vue'
import { type FieldRegistry } from '../FieldRegistry'

export const FieldRegistryKey: InjectionKey<FieldRegistry> = Symbol.for('lens-field-registry')

export function provideFieldRegistry(registry: FieldRegistry): void {
  provide(FieldRegistryKey, registry)
}

export function useFieldRegistry(): FieldRegistry {
  const registry = inject(FieldRegistryKey)
  if (!registry) {
    throw new Error('FieldRegistry is not provided. Make sure to call SetupLens.')
  }
  return registry
}
