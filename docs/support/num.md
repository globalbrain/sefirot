# Num

`Num` module provides number related helper functions.

## `format`

Adds comma to every 3rd digits to the given value.

```ts
function format(value: number): string
```

```ts
import { format } from '@globalbrain/sefirot/lib/support/Num'

format(100000) // <- '100,000'
```

## `abbreviate`

Abbreviates the given value to a human readable format (such as `1K` or `1M`).

```ts
function abbreviate(value: number, precision = 0): string
```

```ts
import { abbreviate } from '@globalbrain/sefirot/lib/support/Num'

abbreviate(1_000)         // <- '1K'
abbreviate(1_250_000, 2)  // <- '1.25M'
```
