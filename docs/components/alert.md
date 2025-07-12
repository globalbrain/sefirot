<script setup lang="ts">
import SAlert from 'sefirot/components/SAlert.vue'
</script>

# SAlert <Badge text="3.8.0" />

`<SAlert>` is used to display informative messages to the user.

<Showcase
  path="/components/SAlert.vue"
  story="/stories-components-salert-01-playground-story-vue"
>
  <SAlert mode="info">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et <a href="#">dolore magna</a> aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </SAlert>
</Showcase>

## Import

```ts
import SAlert from '@globalbrain/sefirot/lib/components/SAlert.vue'
```

## Usage

`<SAlert>` takes `:mode` to define the type of the alert, and slot to display the content. The content should be wrapped in an element such as `<p>`.

```vue-html
<SAlert mode="info">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
    do eiusmod tempor incididunt ut labore et <a href="#">dolore
    magna</a> aliqua. Ut enim ad minim veniam, quis nostrud
    exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat.
  </p>
</SAlert>
```

### Modes

`<SAlert>` has the following modes where each mode uses a different color and icon:

- `info` - Use this mode to display informative messages or tips.
- `success` - Use this mode to display that something has succeeded.
- `warning` - Use this mode to display that something is not right but not critical.
- `danger` - Use this mode to display critical information such as a action is destructive.

## Supported elements inside slot

`<SAlert>` supports the following elements inside the slot.

- `<p>`
- `<a>`

## Props

```ts
interface Props {
  mode?: 'info' | 'success' | 'warning' | 'danger'
}
```

### `:mode`

Defines the type of the alert. See [Modes](#modes) for more information.

```ts
interface Props {
  // @default 'info'
  mode: 'info' | 'success' | 'warning' | 'danger'
}
```

```vue-html
<SAlert mode="success">
  ...
</SAlert>
```

## Slots

### `#default`

`<SAlert>` will render any passed slot as is. See [Supported elements inside slot](#supported-elements-inside-slot) for more information.

```vue-html
<SAlert>
  <p>Lorem ipsum...</p>
</SAlert>
```
