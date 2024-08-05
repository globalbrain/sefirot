# File

`File` module provides file object related helper functions.

## `getExtension`

Gets the file extension of the given `File` object.

```ts
function getExtension(file: File): string
```

```ts
import { getExtension } from '@globalbrain/sefirot/lib/support/File'

const file = new File([], 'example.txt')

getExtension(file) // <- 'txt'
```

## `formatSize`

Formats the file size in bytes to a human-readable format. It also accepts array of files and returns the total size.

```ts
function formatSize(files: File | File[]): string
```

```ts
import { formatSize } from '@globalbrain/sefirot/lib/support/File'

formatSize(file)           // <- '10.00MB'
formatSize([file1, file2]) // <- '20.00MB'
```
