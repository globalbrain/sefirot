# Validators

The `Validators` provides set of functions to validate values.

You may import functions from `validation/validators`.

```ts
import { ... } from '@globalbrain/sefirot/lib/validation/validators'
```

## `checked`

Checks if the given value is `true`. This is useful for validating inputs for things like a checkbox.

```ts
function checked(value: boolean): boolean
```

```ts
checked(false)
```

## `fileExtension`

Checks if the given `File` has a given extension.

```ts
function fileExtension(file: File, extensions: string[]): boolean
```

```ts
fileExtension(file, ['jpg', 'png'])
```

## `hms`

Checks if the given hour, minute and second has a valid value. This validator will not validate the presence of the value so it will return `true` if a value is `null`. To check the presence of the value, use [`requiredHms`](#requiredhms) validator.

```ts
import { type Hms } from '@globalbrain/sefirot/lib/support/Day'

function hms(
  hms: Hms,
  required: ('h' | 'm' | 's')[] = ['h', 'm', 's']
): boolean
```

```ts
const time = {
  hour: '10',
  minute: '61', // Invalid value.
  second: '00'
}

hms(time) // <- false
```

You may pass 2nd argument to specify which fields to validate. For example,if you pass `['h', 'm']`, it will validate only hour and minute.

```ts
const time = {
  hour: '10',
  minute: '30',
  second: '61' // Invalid seconds, but this will be ignored.
}

hms(time, ['h', 'm']) // <- true
```

## `maxFileSize`

Checks if the given `File` in smaller the given size. You can specify size in b, kb, mb or gb by passing a string such as `100mb` or `2gb`.

```ts
function maxFileSize(file: File, size: string): boolean
```

```ts
maxFileSize(file, '100mb')
```

## `maxTotalFileSize`

Checks if the total size of the given files is smaller the specified size. You can specify size in b, kb, mb or gb by passing a string such as `100mb` or `2gb`.

```ts
function maxTotalFileSize(files: File[], size: string): boolean
```

```ts
maxTotalFileSize([fileA, fileB], '100mb')
```

## `month`

Checks if the given number is a valid month number (1–12).

```ts
function month(value: number): boolean
```

```ts
month(13) // <- false
```

## `requiredHms`

Checks if the given hour, minute and second is present. This validator will not validate if the values are valid numbers. To check the validity of the value, use [`hms`](#hms) validator.

```ts
import { type Hms } from '@globalbrain/sefirot/lib/support/Day'

function requiredHms(
  hms: Hms,
  required: ('h' | 'm' | 's')[] = ['h', 'm', 's']
): boolean
```

```ts
const time = {
  hour: '10',
  minute: null, // Value missing.
  second: '00'
}

requiredHms(time) // <- false
```

You may pass 2nd argument to specify which fields to validate. For example,if you pass `['h', 'm']`, it will validate only hour and minute.

```ts
const time = {
  hour: '10',
  minute: '30',
  second: null // Valud missing, but this will be ignored.
}

requiredHms(time, ['h', 'm']) // <- true
```

## `requiredHmsIf`

Checks if the given hour, minute and second is present when the condition passed is truthy. This validator will not validate if the values are valid numbers. To check the validity of the value, use [`hms`](#hms) validator.

```ts
import { type Hms } from '@globalbrain/sefirot/lib/support/Day'
import { type RequiredIfCondition } from '@globalbrain/sefirot/lib/validation/validators'

function requiredHms(
  hms: Hms,
  condition: RequiredIfCondition
  required: ('h' | 'm' | 's')[] = ['h', 'm', 's']
): boolean
```

```ts
const time = {
  hour: '10',
  minute: null, // Value missing.
  second: '00'
}

requiredHmsIf(time, true) // <- false
requiredHmsIf(time, false) // <- true
```

You may pass 3rd argument to specify which fields to validate. For example,if you pass `['h', 'm']`, it will validate only hour and minute.

```ts
const time = {
  hour: '10',
  minute: '30',
  second: null // Valud missing, but this will be ignored.
}

requiredHmsIf(time, true, ['h', 'm']) // <- true
requiredHmsIf(time, false, ['h', 'm']) // <- true
```

## `requiredYmd`

Checks if the given year, month and date is present. This validator will not validate if the values are valid numbers. To check the validity of the value, use [`ymd`](#ymd) validator.

```ts
import { type Ymd } from '@globalbrain/sefirot/lib/support/Day'

function requiredYmd(
  ymd: Ymd,
  required: ('y' | 'm' | 'd')[] = ['y', 'm', 'd']
): boolean
```

```ts
const date = {
  year: 1985,
  month: null, // Value missing.
  date: 10
}

requiredYmd(date) // <- false
```

You may pass 2nd argument to specify which fields to validate. For example,if you pass `['y', 'm']`, it will validate only year and month.

```ts
const date = {
  year: 1985,
  month: 10,
  date: null // Valud missing, but this will be ignored.
}

requiredYmd(date, ['y', 'm']) // <- true
```

## `requiredYmdIf`

Checks if the given year, month and date is present when the condition passed is truthy. This validator will not validate if the values are valid numbers. To check the validity of the value, use [`ymd`](#ymd) validator.

```ts
import { type Ymd } from '@globalbrain/sefirot/lib/support/Day'
import { type RequiredIfCondition } from '@globalbrain/sefirot/lib/validation/validators'

function requiredYmd(
  ymd: Ymd,
  condition: RequiredIfCondition
  required: ('y' | 'm' | 'd')[] = ['y', 'm', 'd']
): boolean
```

```ts
const date = {
  year: 1985,
  month: null, // Value missing.
  date: 10
}

requiredYmdIf(date, true) // <- false
requiredYmdIf(date, false) // <- true
```

You may pass 3rd argument to specify which fields to validate. For example,if you pass `['y', 'm']`, it will validate only year and month.

```ts
const date = {
  year: 1985,
  month: 10,
  date: null // Valud missing, but this will be ignored.
}

requiredYmdIf(date, true, ['y', 'm']) // <- true
requiredYmdIf(date, false, ['y', 'm']) // <- true
```


## `ymd`

Checks if the given year, month and date has a valid value. This validator will not validate the presence of the value so it will return `true` if a value is `null`. To check the presence of the value, use [`requiredYmd`](#requiredymd) validator.

```ts
import { type Ymd } from '@globalbrain/sefirot/lib/support/Day'

function ymd(
  ymd: Ymd,
  required: ('y' | 'm' | 'd')[] = ['y', 'm', 'd']
): boolean
```

```ts
const date = {
  year: 1985,
  month: 15, // Invalid value.
  date: 10
}

ymd(date) // <- false
```

You may pass 2nd argument to specify which fields to validate. For example,if you pass `['y', 'm']`, it will validate only year and month.

```ts
const date = {
  hour: 1985,
  minute: 10,
  second: 35 // Invalid date, but this will be ignored.
}

ymd(date, ['y', 'm']) // <- true
```
