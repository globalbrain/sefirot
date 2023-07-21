<script setup lang="ts">
import SDesc from 'sefirot/components/SDesc.vue'
import SDescItem from 'sefirot/components/SDescItem.vue'
import SDescLabel from 'sefirot/components/SDescLabel.vue'
import SDescLink from 'sefirot/components/SDescLink.vue'
import SDescPill from 'sefirot/components/SDescPill.vue'
import SDescState from 'sefirot/components/SDescState.vue'
import SDescText from 'sefirot/components/SDescText.vue'
</script>

# SDesc

`<SDesc>` is a component for creating "Description List". It's a list of key-value pairs, usually used to display a list of data.

<Showcase
  path="/components/SDesc.vue"
  story="/stories-components-sdesc-01-playground-story-vue"
>
  <div>
    <SDesc cols="2" gap="24">
      <SDescItem span="1">
        <SDescLabel>Full name</SDescLabel>
        <SDescText>Margot Foster</SDescText>
      </SDescItem>
      <SDescItem span="1">
        <SDescLabel>Website</SDescLabel>
        <SDescLink>https://example.com</SDescLink>
      </SDescItem>
      <SDescItem span="1">
        <SDescLabel>Application for</SDescLabel>
        <SDescPill :pill="{ label: 'Frontend Developer' }" />
      </SDescItem>
      <SDescItem span="1">
        <SDescLabel>Interview status</SDescLabel>
        <SDescState :state="{ mode: 'info', label: 'In progress' }" />
      </SDescItem>
      <SDescItem span="2">
        <SDescLabel>About</SDescLabel>
        <SDescText>Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur <a href="https://hello.com">qui ipsum aliquip consequat</a> sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.</SDescText>
      </SDescItem>
    </SDesc>
  </div>
</Showcase>

## Usage

The `<SDesc>` has various child components that you can use to build your description list. Here is a basic example of how to use the `<SDesc>` component.

```vue
<script setup lang="ts">
import SDesc from 'sefirot/components/SDesc.vue'
import SDescItem from 'sefirot/components/SDescItem.vue'
import SDescLabel from 'sefirot/components/SDescLabel.vue'
import SDescText from 'sefirot/components/SDescText.vue'
</script>

<template>
  <SDesc cols="2" gap="24">
    <SDescItem span="1">
      <SDescLabel>Full name</SDescLabel>
      <SDescText>Margot Foster</SDescText>
    </SDescItem>
    <SDescItem span="1">
      <SDescLabel>Website</SDescLabel>
      <SDescLink>https://example.com</SDescLink>
    </SDescItem>
    <SDescItem span="2">
      <SDescLabel>About</SDescLabel>
      <SDescText>Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur <a href="https://hello.com">qui ipsum aliquip consequat</a> sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.</SDescText>
    </SDescItem>
  </SDesc>
</template>
```

## Layout

At the top level, use `<SDesc>` and `<SDescItem>` to define the layout. `<SDesc>` and `<SDescItem>` extends `<SGrid>` and `<SGridItem>` respectively, so you can use all the props that `<SGrid>` and `<SGridItem>` provides. Refer to [SGrid documentation](./grid) for more details including how to handle responsive design.

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    ...
  </SDescItem>
  <SDescItem span="1">
    ...
  </SDescItem>
</SDesc>
```

## Label

Place labels with `<SDescLabel>` followed by value components such as `<SDescText>` or `<SDescLink>` under `<SDescItem>`.

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel>Full name</SDescLabel>
    <SDescText>Margot Foster</SDescText>
  </SDescItem>
  <SDescItem span="1">
    <SDescItem span="1">
      <SDescLabel>Website</SDescLabel>
      <SDescLink>https://example.com</SDescLink>
    </SDescItem>
  </SDescItem>
</SDesc>
```

You may also pass value through `:value` prop instead of the default slot to `<SDescLabel>`. When you define both `:value` prop and default slot, the slot value will take precedence.

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel value="Full name" />
    ...
  </SDescItem>
</SDesc>
```

## Text value

Use `<SDescText>` to display text value. Note that this component is the most generic one to display a value. Explore other specialized components like `<SDescNumber>` or `<SDescDay>` before resorting to `<SDescText>`. These dedicated components are tailored to display specific types of values, ensuring a more accurate and appropriate representation.

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel>Name</SDescLabel>
    <SDescText>John Doe</SDescText>
  </SDescItem>
</SDesc>
```

You may also use `:value` prop instead of the default slot. When you define both `:value` prop and default slot, the slot value will take precedence.

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel value="Name" />
    <SDescText value="John Doe" />
  </SDescItem>
</SDesc>
```

The `<SDescText>` has builtin styling support for links. You may make part of the text a link without having to add additional CSS your self.

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel>About</SDescLabel>
    <SDescText>
      For more details <SLink href="...">refer to this link</SLink>.
    </SDescText>
  </SDescItem>
</SDesc>
```

When displaying long text, there might be a case where you want to trim the texts into certain length. You can do so by passing `:line-clamp` prop. The value is the number of lines you want to display.

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel>About</SDescLabel>
    <SDescText line-clamp="3">
      Long text...
    </SDescText>
  </SDescItem>
</SDesc>
```

You may also use `:pre-wrap` prop to preserve users line breaks in the text. This is especially helpful when the content comes from user inputs, such as through a `<textarea>` element. With this feature, the original formatting provided by users will be retained, making the displayed text consistent with their input.

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel>About</SDescLabel>
    <SDescText pre-wrap>
      Text with line breaks...
    </SDescText>
  </SDescItem>
</SDesc>
```

## Number value

Use `<SDescNumber>` component, which is a specialized version of `<SDescText>` that is tailored to display numbers. It provides additional styling and formatting options that are not available in `<SDescText>`.

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel>Age</SDescLabel>
    <SDescNumber>37</SDescText>
  </SDescItem>
</SDesc>
```

You may also use `:value` prop instead of the default slot. When you define both `:value` prop and default slot, the slot value will take precedence.

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel value="Age" />
    <SDescText :value="37" />
  </SDescItem>
</SDesc>
```

The `<SDescNumber>` supports `:separator` prop add thousand separators to the number.

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel value="Amount" />
    <!-- Displays "123,456" -->
    <SDescText :value="123456" separator />
  </SDescItem>
</SDesc>
```

## Link value

If the whole value should be a link, use `<SDescLink>` component. The displayed value is similar to how `<SDescText>` displays links. However, `<SDescLink>` will always trim the value in single line.

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel>Website</SDescLabel>
    <SDescLink>https://example.com</SDescLink>
  </SDescItem>
</SDesc>
```

You may also use `:value` prop instead of the default slot. When you define both `:value` prop and default slot, the slot value will take precedence.

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel value="Website" />
    <SDescText value="https://example.com" />
  </SDescItem>
</SDesc>
```

You may pass in `:href` prop to specify the link destination. Use this to make link value and link destination different.

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel value="Website" />
    <SDescText
      value="Official Website"
      href="https://example.com"
    />
  </SDescItem>
</SDesc>
```

## Date value

When displaying a date, use `<SDescDay>` component. This component adds slightly different styling specialized for dates, and also provides additional formatting options.

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel>Birthday</SDescLabel>
    <SDescDay>1985-10-10</SDescLink>
  </SDescItem>
</SDesc>
```

You may also pass in the value as [`Day`](../support/day) object with optional `:format` prop. The `:format` prop supports [formatting syntax of Day.js](https://day.js.org/docs/en/display/format) with the default being `YYYY-MM-DD HH:mm:ss`.

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel value="Birthday" />
    <SDescDay :value="day" format="MM-DD-YYYY" />
  </SDescItem>
</SDesc>
```

## Pill value

You may use `<SDescPill>` component to display a value using [`<SPill>`](./pill) component. The size of the pill will be automatically adjusted to fit the description list item.

```ts
interface Props {
  pill?: Pill | Pill[] | null
}

interface Pill {
  mode?: Mode
  label: string
}

type Mode =
  | 'neutral'
  | 'mute'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
```

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel value="Type" />
    <SDescPill :pill="{
      mode: 'info',
      label: 'Photo'
    }" />
  </SDescItem>
</SDesc>
```

You may also pass in mutiple pills as an array.

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel value="Categories" />
    <SDescPill :pill="[
      { mode: 'info', label: 'Book' },
      { mode: 'info', label: 'Si-Fi' },
    ]" />
  </SDescItem>
</SDesc>
```

## State value

Use `<SDescState>` component to display a value using [`<SState>`](./state) component. The size of the pill will be automatically adjusted to fit the description list item.

```ts
interface Props {
  pill?: State | null
}

interface State {
  mode?: Mode
  label: string
}

type Mode =
  | 'neutral'
  | 'mute'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
```

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel value="Status" />
    <SDescState :state="{
      mode: 'success',
      label: 'Complete'
    }" />
  </SDescItem>
</SDesc>
```

## Empty state

All components that support `:value` can accept empty values, which are represented as `null` or `undefined`. When `:value` is not present or is empty, the `<SDescEmpty>` component is displayed.

Although it may not be very useful, you have the option to directly use `<SDescEmpty>` to display empty values.

```vue-html
<SDesc cols="2" gap="24">
  <SDescItem span="1">
    <SDescLabel>...</SDescLabel>
    <SDescEmpty />
  </SDescItem>
</SDesc>
```
