# Day

`Day` module provides date object related helper functions. It is actually [Day.js](https://day.js.org/) object with a little syntax suger for ease of use.

The `Day` object exported from Sefirot extends following Day.js plugins.

- [UTC](https://day.js.org/docs/en/plugin/utc)
- [Timezone](https://day.js.org/docs/en/plugin/timezone)
- [RelativeTime](https://day.js.org/docs/en/plugin/relative-time)

## `Day`

The `Dayjs` type alias.

```ts
import { Dayjs } from 'dayjs'

type Day = Dayjs
```

## `Input`

The `ConfigType` alias from Day.js.

```ts
import { ConfigType } from 'dayjs'

type Input = ConfigType
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
