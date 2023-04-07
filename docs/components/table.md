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
.table :deep(.col-status) { --table-col-width: 128px; }
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

## Disable column resize

By default, all columns are resizable via the user. You may disable resizing for each column you specify by setting `resizable` option.

```ts
import { useTable } from '@globalbrain/sefirot/lib/composables/Table'

const options = useTable({
  orders: [...],
  columns: {
    item_1: {
      label: 'Item 1'
    },
    // This column is no longer resizable.
    item_2: {
      label: 'Item 2',
      resizable: false
    }
  },
  records: [...]
})
```

## Auto grow column

You may define `grow` option to automatically grow the column if there is space left on the table.

```ts
import { useTable } from '@globalbrain/sefirot/lib/composables/Table'

const options = useTable({
  orders: [...],
  columns: {
    // This column will grow if there is space left.
    item_1: {
      label: 'Item 1',
      grow: true
    },
    item_2: {
      label: 'Item 2'
    }
  },
  records: [...]
})
```

If the user adjusts any column's width, the `grow` option will be ignored and the last column will fill up the remaining space.

## Total number of records

You may define `total` option to display the total number of records in the table.

```ts
const options = useTable({
  total: 50
})
```

## Reset filters button

Define `reset` option to show "Reset filters" button on table header. You can define `onReset` callback to listen to the click event on this button.

```ts
const options = useTable({
  reset: true,
  onReset: () => { ... }
})
```

## Pagination

By passing in `total`, `page`, and `perPage` option, the table footer gets displayed with pagination. You can listen to "Prev" and "Next" button click callback via `onPrev` and `onNext` option. Note that if both `onPrev` or `onNext` is not defined, it will not show the "Prev" and "Next" buttons.

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

The Table Header and Footer is the part where it shows additional information such as total number of records or pagination. The header and footer gets displayed depending on it has any data to display or not. For example, header gets displayed when there's `total` or `reset` option is set.

If you would like to display or hide the header and footer regardless of the other options present, set `boolean` to `header` or `footer` option.

```ts
const options = useTable({
  header: true,
  footer: true
})
```

## Summary row

You may define `summary` option to display a summary row at the bottom of the table. It's useful to display information such as the total of each column.

```ts
const options = useTable({
  orders: ['name', 'amount'],
  columns: { ... },

  summary: {
    name: 'Total',
    amount: 100
  }
})
```

Each field defined at the `summary` option must match the key of the `columns` option, and the type of cell is applied as same as other records. For example, if the cell type of the `name` field is `text`, then the `name` field of the `summary` option will be displayed as `text` type.

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

### Font style

Use `--table-cell-font-size` and `--table-cell-font-weight` to customize the base font style in the table. Also, you can use `--table-cell-summary-font-weight` to adjust the font weight of the cell added by `summary` option.

```css
:root {
  --table-cell-font-size: 14px;
  --table-cell-font-weight: 400;

  --table-cell-summary-font-weight: 600;
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
