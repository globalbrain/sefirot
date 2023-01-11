# Day

`Day` module provides date object related helper functions. It is actually [Day.js](https://day.js.org/) object with a little syntax suger for ease of use.

The `Day` object exported from Sefirot extends the [RelativeTime plugin](https://day.js.org/docs/en/plugin/relative-time) from Day.js.

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
