# Time

`Time` module provides convinient async functions that can be used to "sleep" or "delay" function calls. 

## `sleep`

Use to "wait" for speficied amount of time combining with `await`.

```ts
function sleep(ms: number = 500): Promise<undefined>
```

```ts
import { sleep } from '@globalbrain/sefirot/lib/support/Time'

console.log(1)

await sleep(1000)

console.log(2) // Logs after 1 second.
```

## `delay`

Wait at least given amount of time before resolving the given promises. This function will execute the given promise immediately but do not resolves it until the time you specified.

```ts
type Awaited<T> = T extends undefined
  ? T
  : T extends PromiseLike<infer U> ? U : T

function delay<T extends any[]>(
  iterable: T,
  ms?: number = 500
): Promise<{ [P in keyof T]: Awaited<T[P]> }>
```

```ts
import { delay } from '@globalbrain/sefirot/lib/support/Time'

const [resultA, resultB] = await delay([
  apiCallA(),
  apiCallB()
], 1000)
```
