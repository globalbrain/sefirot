import { type DOMWrapper, type VueWrapper, config, mount } from '@vue/test-utils'
import { type Validatable } from 'sefirot/composables/Validation'
import { type UnwrapRef } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'

export function setupWithWrapper<T>(
  setup: () => T,
  options?: any
): VueWrapper<any> {
  const wrapper = mount({
    setup,
    template: '<div />'
  }, options)

  return wrapper
}

export function setup<T>(
  setup: () => T,
  options?: any
): UnwrapRef<T> {
  return setupWithWrapper(setup, options).vm as UnwrapRef<T>
}

export function setupRouter(): void {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{
      path: '/',
      component: { render: () => null }
    }]
  })

  config.global.plugins.push(router)
}

export function getInputValue(wrapper: DOMWrapper<any>): string {
  return (wrapper.element).value
}

export function getInputPlaceholder(wrapper: DOMWrapper<any>): string {
  return (wrapper.element).placeholder
}

export function createValidatable(params: Partial<Validatable> = {}): Validatable {
  return {
    $dirty: params.$dirty ?? false,
    $invalid: params.$invalid ?? false,
    $errors: params.$errors ?? [],
    $touch: params.$touch ?? (() => {})
  }
}

export function assertEmitted(
  wrapper: VueWrapper<any>,
  event: string,
  count: number,
  value?: any
): void {
  const e = wrapper.emitted(event)

  if (!e) {
    throw new Error(`Event \`${event}\` not emitted`)
  }

  expect(e[count - 1][0]).toStrictEqual(value)
}

export function assertNotEmitted(wrapper: VueWrapper<any>, event: string): void {
  expect(wrapper.emitted(event)).toBe(undefined)
}
