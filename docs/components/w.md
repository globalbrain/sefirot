# SW <Badge text="3.3.0" />

`<SW>`, where "W" stands for "Word", is a simple helper component that marks separated words as a single word and prevent them from being word broken. See in action on [playground](/stories/w-01-playground).

## Overview

Use this component to prevent word breaks for certain words. Mainly useful when building marketing sites in Japanese.

## Import

```ts
import SW from '@globalbrain/sefirot/lib/components/SW.vue'
```

## Usage

Wrap any words within this component to prevent them from being word broken. Under the hood, it will inject `<wbr>` and wrap the content in `<span>` with `white-space: nowrap`.

```vue-html
<p>
  When resizing the container, <SW>This word</SW> should not be
  word borken and should be treated as a single word.
</p>
```

## Slots

### `#default`

`<SM>` will render any passed slot by wrapping it with `<span>`

```vue-html
<SW>...</SW>
```
