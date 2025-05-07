<script setup lang="ts">
import SGrid from 'sefirot/components/SGrid.vue'
import SGridItem from 'sefirot/components/SGridItem.vue'
</script>

# SGrid

`<SGrid>` is a utility component to handle CSS grid layout.

<Showcase
  path="/components/SGrid.vue"
  story="/stories-components-sgrid-01-playground-story-vue"
>
  <SGrid cols="4" gap="24">
    <SGridItem>
      <div class="h-64 rounded-6 bg-info" />
    </SGridItem>
    <SGridItem>
      <div class="h-64 rounded-6 bg-info" />
    </SGridItem>
    <SGridItem>
      <div class="h-64 rounded-6 bg-info" />
    </SGridItem>
    <SGridItem>
      <div class="h-64 rounded-6 bg-info" />
    </SGridItem>
    <SGridItem>
      <div class="h-64 rounded-6 bg-info" />
    </SGridItem>
    <SGridItem>
      <div class="h-64 rounded-6 bg-info" />
    </SGridItem>
    <SGridItem>
      <div class="h-64 rounded-6 bg-info" />
    </SGridItem>
    <SGridItem>
      <div class="h-64 rounded-6 bg-info" />
    </SGridItem>
  </SGrid>
</Showcase>

## Usage

Use `<SGrid>` and `<SGridItem>` component to construct the grid structure.

```vue
<script setup lang="ts">
import SGrid from '@globalbrain/sefirot/lib/components/SGrid.vue'
import SGridItem from '@globalbrain/sefirot/lib/components/SGridItem.vue'
</script>

<template>
  <SGrid cols="4">
    <SGridItem span="2">
      <div>...</div>
    </SGridItem>
    <SGridItem span="1">
      <div>...</div>
    </SGridItem>
  </SGrid>
</template>
```

You have the flexibility to define the `:cols` and `:gap` props when using the `<SGrid>` component, allowing you to have full control over the grid layout.

The `:cols` prop serves as a shorthand for the `grid-template-columns` CSS property. Similarly, the `:gap` prop acts as a shorthand for the `gap` CSS property.

Notably, the `:gap` prop automatically appends the required `px` unit to the value, so there is no need to include it explicitly.

```ts
interface Props {
  cols?: string | number
  gap?: string | number
}
```

```vue-html
<SGrid cols="4" gap="48">
  ...
</SGrid>
```

Once you have defined the grid layout, you can use the `:span` prop on the `<SGridItem>` component to define the number of columns that the item should span. The `:span` prop serves as a shorthand for the `grid-column` CSS property.

```ts
interface Props {
  span?: string | number
}
```

```vue-html
<SGrid cols="4" gap="48">
  <SGridItem span="2">...</SGridItem>
  <SGridItem span="2">...</SGridItem>
</SGrid>
```

### Responsive design

If you need to adjust the overall grid layout based on different screen sizes or other conditions, it is recommended to use CSS instead of props. The props are provided for convenience but, for more complex layout structures and fine-grained control, the use of CSS styling is encouraged.

```vue
<template>
  <SGrid class="grid">
    <SGridItem class="name">...</SGridItem>
    <SGridItem class="age">...</SGridItem>
    <SGridItem class="email">...</SGridItem>
  </SGrid>
</template>

<style scoped lang="postcss">
.grid {
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .email {
    grid-column: span 2;
  }
}
</style>
```
