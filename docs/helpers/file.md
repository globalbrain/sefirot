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
