import { VueWrapper, DOMWrapper } from '@vue/test-utils'

export interface EventTargetMock<T = any> {
  target: T
}

export type EventTargetValueMock<T = any> = EventTargetMock<{ value: T }>

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
