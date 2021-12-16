import { VueWrapper } from '@vue/test-utils'

export function assertEmitted(
  wrapper: VueWrapper<any>,
  event: string,
  count: number,
  value: any
): void {
  expect((wrapper.emitted(event) as any[][])[count][0]).toBe(value)
}
