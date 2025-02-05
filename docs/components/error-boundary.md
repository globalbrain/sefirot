# SErrorBoundary <Badge text="3.9.0" />

`<SErrorBoundary>` handles errors that are thrown from its children components.

## Import

```ts
import SErrorBoundary from '@globalbrain/sefirot/lib/components/SErrorBoundary.vue'
```

## Usage

Define `#default` and `#error` to handle errors accordingly. Errors in inline children are not captured. Make sure to move the logic to a separate component and put it in the default slot.

```vue
<script setup lang="ts">
function check404(err: any) {
  // Throw if the error is not expected.
  if (err.status !== 404) {
    throw err
  }
}
</script>

<template>
  <SErrorBoundary @error="check404">
    <template #default>
      <ChildComponentThatMightThrowError />
    </template>

    <template #error="{ error, clearError }">
      <p>Page not found</p>
      <button @click="clearError({ redirect: '/' })">
        Go to home
      </button>
    </template>
  </SErrorBoundary>
</template>
```

## Events

```ts
interface Emits {
  (e: 'error', value: any): void
}
```

### `@error`

Emitted when an error is thrown from its children components.

```ts
interface Emits {
  (e: 'error', value: any): void
}
```

```vue-html
<SErrorBoundary @error="handleError">
  ...
</SErrorBoundary>
```

## Slots

### `#default`

Renders the children components when no error is thrown.

```vue-html
<SErrorBoundary>
  <p>Lorem ipsum...</p>
</SErrorBoundary>
```

### `#error`

Renders when an error is thrown from its children components.

```ts
interface SlotProps {
  error: Error | null
  clearError(options?: ClearErrorOptions): Promise<void>
}

interface ClearErrorOptions {
  // When defined, redirects to the given path.
  redirect?: string
}
```

```vue-html
<SErrorBoundary>
  <template #default>
    <p>Lorem ipsum...</p>
  </template>
  <template #error="{ error, clearError }">
    <p>Error!</p>
  </template>
</SErrorBoundary>
```
