# Utils

`Utils` module provides generic helper functions. It includes functions to check the type of a value. These functions work cross-realm (e.g., across vm contexts, iframes, etc.).

## `isBlob`

Checks if a value is a `Blob`.

```ts
function isBlob(value: unknown): value is Blob
```

**Parameters:**

- `value`: The value to check.

**Returns:**

- `true` if the value is a `Blob`.
- `false` otherwise.

**Example:**

```ts
import { isBlob } from '@globalbrain/sefirot/lib/support/Utils'

const blob = new Blob()
console.log(isBlob(blob)) // true
console.log(isBlob({})) // false
```

## `isDate`

Checks if a value is a `Date`.

```ts
function isDate(value: unknown): value is Date
```

**Parameters:**

- `value`: The value to check.

**Returns:**

- `true` if the value is a `Date`.
- `false` otherwise.

**Example:**

```ts
import { isDate } from '@globalbrain/sefirot/lib/support/Utils'

const date = new Date()
console.log(isDate(date)) // true
console.log(isDate('2023-01-01')) // false
```

## `isError`

Checks if a value is an `Error`.

```ts
function isError(value: unknown): value is Error
```

**Parameters:**

- `value`: The value to check.

**Returns:**

- `true` if the value is an `Error`.
- `false` otherwise.

**Example:**

```ts
import { isError } from '@globalbrain/sefirot/lib/support/Utils'

const error = new Error('Something went wrong')
console.log(isError(error)) // true
console.log(isError({})) // false
```

## `isFile`

Checks if a value is a `File`.

```ts
function isFile(value: unknown): value is File
```

**Parameters:**

- `value`: The value to check.

**Returns:**

- `true` if the value is a `File`.
- `false` otherwise.

**Example:**

```ts
import { isFile } from '@globalbrain/sefirot/lib/support/Utils'

const file = new File(['content'], 'file.txt')
console.log(isFile(file)) // true
console.log(isFile({})) // false
```

## `isFormData`

Checks if a value is `FormData`.

```ts
function isFormData(value: unknown): value is FormData
```

**Parameters:**

- `value`: The value to check.

**Returns:**

- `true` if the value is `FormData`.
- `false` otherwise.

**Example:**

```ts
import { isFormData } from '@globalbrain/sefirot/lib/support/Utils'

const formData = new FormData()
console.log(isFormData(formData)) // true
console.log(isFormData({})) // false
```

## `isNumber`

Checks if a value is a `number`.

```ts
function isNumber(value: unknown): value is number
```

**Parameters:**

- `value`: The value to check.

**Returns:**

- `true` if the value is a `number`.
- `false` otherwise.

**Example:**

```ts
import { isNumber } from '@globalbrain/sefirot/lib/support/Utils'

console.log(isNumber(123)) // true
console.log(isNumber('123')) // false
```

## `isObject`

Checks if a value is a plain object.

```ts
function isObject(value: unknown): value is Record<string, unknown>
```

**Parameters:**

- `value`: The value to check.

**Returns:**

- `true` if the value is a plain object.
- `false` otherwise.

**Example:**

```ts
import { isObject } from '@globalbrain/sefirot/lib/support/Utils'

console.log(isObject({})) // true
console.log(isObject(new Date())) // false
```

## `isRequest`

Checks if a value is a `Request`.

```ts
function isRequest(value: unknown): value is Request
```

**Parameters:**

- `value`: The value to check.

**Returns:**

- `true` if the value is a `Request`.
- `false` otherwise.

**Example:**

```ts
import { isRequest } from '@globalbrain/sefirot/lib/support/Utils'

const request = new Request('https://example.com')
console.log(isRequest(request)) // true
console.log(isRequest({})) // false
```

## `isResponse`

Checks if a value is a `Response`.

```ts
function isResponse(value: unknown): value is Response
```

**Parameters:**

- `value`: The value to check.

**Returns:**

- `true` if the value is a `Response`.
- `false` otherwise.

**Example:**

```ts
import { isResponse } from '@globalbrain/sefirot/lib/support/Utils'

const response = new Response()
console.log(isResponse(response)) // true
console.log(isResponse({})) // false
```

## `isString`

Checks if a value is a `string`.

```ts
function isString(value: unknown): value is string
```

**Parameters:**

- `value`: The value to check.

**Returns:**

- `true` if the value is a `string`.
- `false` otherwise.

**Example:**

```ts
import { isString } from '@globalbrain/sefirot/lib/support/Utils'

console.log(isString('Hello')) // true
console.log(isString(123)) // false
```
