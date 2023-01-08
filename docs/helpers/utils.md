# Utils

`Utils` module provides generic helper functions.

## `isNullish`

Checks if the given value is `null` or `undefined`.

```ts
function isNullish(value: unknown): value is undefined | null
```

```ts
import { isNullish } from '@globalbrain/sefirot/lib/support/Utils'

isNullish(undefined) // <- true
isNullish(null)      // <- true
isNullish('')        // <- false
```

## `isString`

Checks if the given value is `string`.

```ts
function isString(value: unknown): value is string
```

```ts
import { isString } from '@globalbrain/sefirot/lib/support/Utils'

isString('abc') // <- true
```

## `isNumber`

Checks if the given value is `number`.

```ts
function isNumber(value: unknown): value is number
```

```ts
import { isNumber } from '@globalbrain/sefirot/lib/support/Utils'

isNumber(123) // <- true
```

## `isArray`

Checks if the given value is `array`.

```ts
function isArray(value: unknown): value is unknown[]
```

```ts
import { isArray } from '@globalbrain/sefirot/lib/support/Utils'

isArray([1, 2, 3]) // <- true
```

## `isObject`

Checks if the given value is `object`. this function will return `false` for `null` and `array`.

```ts
function isObject(value: unknown): value is Record<string, any>
```

```ts
import { isObject } from '@globalbrain/sefirot/lib/support/Utils'

isObject({ foo: 'bar' }) // <- true
isArray([1, 2, 3])       // <- false
isArray(null)            // <- false
```
