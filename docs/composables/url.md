# Url <Badge text="3.9.0" />

`Url` composable module provides helper functions to handle URL related operations.

## `useUrlQuerySync`

Sync given reactive object with the URL query parameters.

```ts
import { type MaybeRefOrGetter } from 'vue'

interface UseUrlQuerySyncOptions {
  casts?: Record<string, (value: string) => any>
  exclude?: string[]
}

function useUrlQuerySync(
  state: Record<string, any>,
  options?: UseUrlQuerySyncOptions
): void
```

```ts
import { useUrlQuerySync } from '@globalbrain/sefirot/lib/composables/Url'

const options = {
  page: 1,
  perPage: 50
}

useUrlQuerySync(options)
```

### Cast values

You may use `casts` option to cast values into different types since URL query will always be a string.

```ts
const options = {
  page: 1
}

useUrlQuerySync(options, {
  casts: {
    page: (v) => Number(v)
  }
})
```

### Exclude keys

You may use `exclude` option to exclude some keys from being synced with URL query.

```ts
const options = {
  page: 1,
  perPage: 50
}

useUrlQuerySync(options, {
  exclude: ['perPage']
})
```
