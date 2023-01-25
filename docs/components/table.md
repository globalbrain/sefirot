<script setup lang="ts">
import { useTable } from 'sefirot/composables/Table'
import STable from 'sefirot/components/STable.vue'

const options = useTable({
  orders: [
    'name',
    'group',
    'status'
  ],
  columns: {
    name: {
      label: 'Name',
      cell: {
        type: 'text'
      }
    },
    group: {
      label: 'Group',
      cell: {
        type: 'text',
        color: 'soft'
      }
    },
    status: {
      label: 'Status',
      cell: (value) => ({
        type: 'pill',
        value,
        color: value === 'Active' ? 'success' : 'mute'
      })
    }
  },
  records: [
    { name: 'John Doe', group: 'Admin', status: 'Active' },
    { name: 'Mia Green', group: 'Editor', status: 'Active' },
    { name: 'Daniel Loe', group: 'Editor', status: 'Inactive' }
  ]
})
</script>

<style scoped>
.table :deep(.col-name)   { --table-col-width: 128px; }
.table :deep(.col-group)  { --table-col-width: 128px; }
.table :deep(.col-status) { --table-col-width: 128px; --table-col-max-width: auto; }
</style>

# STable

`<STable>` is a common table component.

<Showcase
  path="/components/STable.vue"
  story="/stories-components-stable-01-playground-story-vue"
>
  <ClientOnly>
    <STable class="table" :options="options" />
  </ClientOnly>
</Showcase>

## Usage

Import `<STable>` component and `useTable` composable. Create table object with `useTable` composable and pass it to the `:options` props of the `STable` component. Here is the relatively simple table definitions.

```vue
<script setup lang="ts">
import { useTable } from '@globalbrain/sefirot/lib/composables/Table'
import STable from '@globalbrain/sefirot/lib/components/STable.vue'

const options = useTable({
  orders: [
    'name',
    'group',
    'status'
  ],
  columns: {
    name: {
      label: 'Name',
      cell: {
        type: 'text'
      },
    },
    group: {
      label: 'Group',
      cell: {
        type: 'text',
        color: 'soft'
      },
    },
    status: {
      label: 'Status',
      cell: (value) => ({
        type: 'pill',
        value,
        color: value === 'Active' ? 'success' : 'mute'
      }),
    }
  },
  records: [
    { name: 'John Doe', group: 'Admin', status: 'Active' },
    { name: 'Mia Green', group: 'Editor', status: 'Active' },
    { name: 'Daniel Loe', group: 'Editor', status: 'Inactive' }
  ]
})
</script>

<template>
  <STable :options="options" />
</template>
```

`Orders`, `columns`, and `Records` are the base building block of the table. In order to display table records, you must define all of them.

The `orders` defines the existing columns on the table and the order to display it. In below example, you can see we have 3 items in this table definition.

```ts
import { useTable } from '@globalbrain/sefirot/lib/composables/Table'

const options = useTable({
  orders: [
    'item_1',
    'item_2',
    'item_3'
  ]
})
```

Next, you should define `columns` that matches the value defined on `orders` property. Each columns must contain `label` key. This value will be used for the column name.

```ts
import { useTable } from '@globalbrain/sefirot/lib/composables/Table'

const options = useTable({
  orders: [
    'item_1',
    'item_2',
    'item_3'
  ],
  columns: {
    item_1: {
      label: 'Item 1'
    },
    item_2: {
      label: 'Item 2'
    },
    item_3: {
      label: 'Item 3'
    }
  }
})
```

The `columns` key may contain several more options. We'll go through them on the later section of this page.

Next, define `records` key with the data you would like to display. The key for the each record must match the key of the `columns` property else it gtes ignored.

```ts
import { useTable } from '@globalbrain/sefirot/lib/composables/Table'

const options = useTable({
  orders: [
    'item_1',
    'item_2',
    'item_3'
  ],
  columns: {
    item_1: {
      label: 'Item 1'
    },
    item_2: {
      label: 'Item 2'
    },
    item_3: {
      label: 'Item 3'
    }
  },
  records: [
    { item_1: 'Data 1', item_2: 'Data 2', item_3: 'Data 3' },
    { item_2: 'Data 4', item_2: 'Data 5', item_3: 'Data 6' },
    { item_3: 'Data 7', item_2: 'Data 8', item_3: 'Data 9' }
  ]
})
```

## Total number of records

You may define `total` option to display the total number of records in the table.

```ts
import { MaybeRef } from '@vueuse/core'

interface UseTableOptions {
  total?: MaybeRef<number | null | undefined>
}
```

```ts
const options = useTable({
  total: 50
})
```

## Reset filters button

Define `reset` option to show "Reset filters" button on table header. You can define `onReset` callback to listen to the click event on this button.

```ts
import { MaybeRef } from '@vueuse/core'

interface UseTableOptions {
  reset?: MaybeRef<boolean | undefined>
  onReset?(): void
}
```

```ts
const options = useTable({
  reset: true,
  onReset: () => { ... }
})
```

## Pagination

By passing in `total`, `page`, and `perPage` option, the table footer gets displayed with pagination. You can listen to "Prev" and "Next" button click callback via `onPrev` and `onNext` option. Note that if both `onPrev` or `onNext` is not defined, it will not show the "Prev" and "Next" buttons.

```ts
import { MaybeRef } from '@vueuse/core'

interface UseTableOptions {
  total?: MaybeRef<number | null | undefined>
  page?: MaybeRef<number | null | undefined>
  perPage?: MaybeRef<number | null | undefined>
  onPrev?(): void
  onNext?(): void
}
```

```ts
const options = useTable({
  total: 50,
  page: 1,
  perPage: 25,
  onPrev: () => { ... },
  onNext: () => { ... }
})
```

## Table Header & Footer

The Table Header and Footer is the part where it shows additional information such as total number of records or pagnation. The header and footer gets displayed depending on it has any data to display or not. For example, header gets displayed when there's `total` or `reset` option is set.

If you would like to diaplay or hide the header and footer regardless of the other options presense, set `boolean` to `header` or `footer` option.

```ts
import { MaybeRef } from '@vueuse/core'

interface UseTableOptions {
  header?: MaybeRef<number | undefined>
  footer?: MaybeRef<number | undefined>
}
```

```ts
const options = useTable({
  header: true,
  footer: true
})
```

## Props

Here are the list of props you may pass to the component.

### `:options`

The whole definition of the table. The `Table` object should be created via `useTable` composable. For the details on each options, please refer to the corresponding section of this document.

```ts
import { Table } from '@globalbrain/sefirot/composables/Table'

interface Props {
  options?: Table
}
```

```vue-html
<STooltip :options="options" />
```

## Styles

You may customize the styles by overriding `--table` prefixed CSS variables.

### Global font style

Use `--table-cell-font-size` and `--table-cell-font-weight` to customize the base font style in the table.

```css
:root {
  --table-cell-font-size: 14px;
  --table-cell-font-weight: 400;
}
```

### Padding on both sides

You may define `--table-padding-right` and `--table-padding-left` to adjust the padding of the table. This is useful when you want to have "full width" table and increase the first and last cell item padding.

```css
:root {
  --table-padding-right: 0;
  --table-padding-left: 0;
}
```

### Borders customization

You may customize table borders via `--table-border` variable. `--table-border` will set all borders styles at once. If you want to only adjust top and bottom, or left and right part of the border, use dedicated variables such as `--table-border-top`.

You may also adjust the border radius via `--table-border-radius` variable.

```css
:root {
  --table-border: 1px solid var(--c-divider-2);

  --table-border-top: var(--table-border);
  --table-border-right: var(--table-border);
  --table-border-bottom: var(--table-border);
  --table-border-left: var(--table-border);

  --table-border-radius: 6px;
}
```