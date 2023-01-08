# Utils

`Utils` composable module provides varias helper functions to create reactivity related objects.

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
