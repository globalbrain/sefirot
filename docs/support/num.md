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
