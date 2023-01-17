import { DOMWrapper, VueWrapper, config } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'

export interface EventTargetMock<T = any> {
  target: T
}

export type EventTargetValueMock<T = any> = EventTargetMock<{ value: T }>

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

export function eventTargetValue<T>(value: T): EventTargetValueMock<T> {
  return {
    target: { value }
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
