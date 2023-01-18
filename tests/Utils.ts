import { DOMWrapper, VueWrapper, config } from '@vue/test-utils'
import { Validatable } from 'sefirot/composables/Validation'
import { createMemoryHistory, createRouter } from 'vue-router'

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
  return (wrapper.element as any).value
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
  value: any
): void {
  expect((wrapper.emitted(event) as any[][])[count - 1][0]).toBe(value)
}

export function assertNotEmitted(wrapper: VueWrapper<any>, event: string): void {
  expect(wrapper.emitted(event)).toBe(undefined)
}
