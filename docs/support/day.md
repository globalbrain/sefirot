# Day

`Day` module provides date object related helper functions. The main function `day` is actually [Day.js](https://day.js.org/) with a little syntax suger for ease of use.

The `Day` object exported from Sefirot extends following Day.js plugins.

- [UTC](https://day.js.org/docs/en/plugin/utc)
- [Timezone](https://day.js.org/docs/en/plugin/timezone)
- [RelativeTime](https://day.js.org/docs/en/plugin/relative-time)

You may import the module from `support/Day`.

```ts
import * as Day from '@globalbrain/sefirot/lib/support/Day'
```

## `Day`

The `Dayjs` type alias.

```ts
import { Dayjs } from 'dayjs'

type Day = Dayjs
```

```ts
import type { Day } from '@globalbrain/sefirot/lib/support/Day'
```

## `Input`

The `ConfigType` alias from Day.js.

```ts
import { ConfigType } from 'dayjs'

type Input = ConfigType
```

```ts
import type { ConfigType } from '@globalbrain/sefirot/lib/support/Day'
```

## `Ymd`

The year, month, and date object interface.

```ts
interface Ymd {
  year: number | null
  month: number | null
  date: number | null
}
```

```ts
import type { Ymd } from '@globalbrain/sefirot/lib/support/Day'
```

## `Hms`

The hour, minute, and second object interface.

```ts
interface Hms {
  hour: string | null
  minute: string | null
  second: string | null
}
```

```ts
import type { Hms } from '@globalbrain/sefirot/lib/support/Day'
```

## `day`

Creates a new `Day` instance.

```ts
function day(input?: Input): Day
```

```ts
import { day } from '@globalbrain/sefirot/lib/support/Day'

const d = day()

d.format('YYYY-MM-DD')
```

## `utc`

Creates a new UTC `Day` instance. This function is the alias of `dayjs.utc`.

```ts
function utc(input?: Input): Day
```

```ts
import { utc } from '@globalbrain/sefirot/lib/support/Day'

utc()
```

## `tz`

Creates a new timezone aware `Day` instance. This function is the alias of `dayjs.tz`.

```ts
function utc(input?: Input): Day
```

```ts
import { tz } from '@globalbrain/sefirot/lib/support/Day'

tz('1985-10-10 12:00:00', 'Asia/Tokyo')
  .tz('America/New_York')
  .format('YYYY/MM/DD HH:mm:ss')
```

## `createYmd`

Creates a new [`Ymd`](#ymd) object.

```ts
function createYmd(
  year: number | null = null,
  month: number | null = null,
  date: number | null = null
): Ymd
```

```ts
import { createYmd } from '@globalbrain/sefirot/lib/support/Day'

createYmd(1985, 10, 10)
```

## `createHms`

Creates a new [`Hms`](#hms) object.

```ts
function createHms(
  hour: string | null = null,
  minute: string | null = null,
  second: string | null = null
): Hms
```

```ts
import { createHms } from '@globalbrain/sefirot/lib/support/Day'

createHms('12', '00', '00')
```
