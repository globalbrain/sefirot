# Utils

`Utils` composable module provides varias helper functions to create reactivity related objects.

## `WhenCondition`

A type alias of `MaybeRefOrGetter` from `@vueuse/core`. Used in "when" related utilities.

```ts
import { MaybeRefOrGetter } from '@vueuse/core'

type WhenCondition<T> = MaybeRefOrGetter<T>
```

## `computedWhen`

Creates `computed` object with the given closure only when the condition is met. Useful when you want for example wait until api call resolves, and then perform some computing.

```ts
import { ComputedRef } from 'vue'

export function computedWhen<T, C>(
  condition: WhenCondition<C>,
  fn: (item: NonNullable<C>) => T
): ComputedRef<T | undefined>

export function computedWhen<T, C, D>(
  condition: WhenCondition<C>,
  fn: (item: NonNullable<C>) => T,
  whenFalse: D
): ComputedRef<T | D>
```

```ts
import { computedWhen } from '@globalbrain/sefirot/lib/composables/Utils'

// Data is initially `undefined`.
const { data } = apiCall('...')

// The closure gets called only when `data` is truthy. The arg
// of the closure is the non-nullable value of the condition.
// The value when condition is falthy is `undefined`.
const isEmpty = computedWhen(data, (d) => {
  // `d` is non nullalbe, and unwrapped if it's a Ref object.
  return d.length === 0
})
```

You may also pass 3rd argument as the default value returned when the condition is falthy.

```ts
import { computedWhen } from '@globalbrain/sefirot/lib/composables/Utils'

const c = computedWhen(condition, () => {
  return /* ... */
}, 'Default Value')

c.value // <- 'Default Value'
```

## `computedArray`

Shorthand function for creating `computed` object that returns an array. Useful when array items might change depending on some condition.

The closure you pass to the function will get empty array as an argument, and you would push items to the array instead of returning it.

```ts
import { ComputedRef } from 'vue'

function computedArray<T = any>(
  fn: (arr: T[]) => void
): ComputedRef<T[]>
```

```ts
import { computedArray } from '@globalbrain/sefirot/lib/composables/Utils'

const menu = computedArray((arr) => {
  arr.push({ label: 'Dashboard' })
  arr.push({ label: 'Members' })

  if (userIsAdmin) {
    arr.push({ label: 'Administration' })
  }
})
```
