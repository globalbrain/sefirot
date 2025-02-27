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
  story="table-01-playground"
>
  <ClientOnly>
    <STable class="table" :options="options" />
  </ClientOnly>
</Showcase>

## Usage

Import `<STable>` component and `useTable` composable. Create a table object with `useTable` composable and pass it to the `:options` props of the `STable` component. Here are the relatively simple table definitions.

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

The `orders` defines the existing columns on the table and the order to display them. In the below example, you can see we have 3 items in this table definition.

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

Next, you should define `columns` that match the value defined on the `orders` property. Each column must contain a `label` key. This value will be used for the column name.

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

The `columns` key may contain several more options. We'll go through them in the later section of this page.

Next, define the `records` key with the data you would like to display. The key for each record must match the key of the `columns` property else it gets ignored.

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

## Header options

The header is the top part of the table. The header displays information such as the total number of records or menu items.

### Header menu

You may define `menu` option to display a menu button on the table header. The menu is dropdown options that can display any kind of dropdown items.

This is useful when you would like to add filter options that does not make sense adding it to the column options.

```ts
const options = useTable({
  menu: [
    {
      label: 'Option A',
      dropdown: {
        type: 'menu',
        options: [
          { label: 'Option 1', onClick: () => {} },
          { label: 'Option 2', onClick: () => {} },
          { label: 'Option 3', onClick: () => {} }
        ]
      }
    }
  ]
})
```

You may also pass `state` option to change how the menu button looks. The `state` option can be one of `inactive`, `active`, or `indicate`.

- `inactive` – The default state. The menu button fill looks slightly muted.
- `active` – The menu button label text will appear with `--c-text-1` color.
- `indicate` – Adds blue dot indicator on the menu button. Use this to indicate the user that the menu is now different than its default state (e.g. user has selected some option).

```ts
const options = useTable({
  menu: [
    {
      label: 'Option A',
      state: 'indicate',
      dropdown: { ... }
    }
  ]
})
```

### Total number of records

You may define `total` option to display the total number of records in the table.

```ts
const options = useTable({
  total: 50
})
```

### Reset filters button

Define `reset` option to show the "Reset filters" button on the table header. You can define `onReset` callback to listen to the click event on this button.

```ts
const options = useTable({
  reset: true,
  onReset: () => { ... }
})
```

### Hide Header

The header gets displayed depending on when it has any data to display. For example, the header gets displayed when `total` or `reset` option is set.

If you would like to display or hide the header regardless of the other options presence, set `boolean` to `header`.

```ts
const options = useTable({
  header: true
})
```

## Column options

The columns are the part where it displays the label of each record. You may add several options to the column such as displaying the dropdown menu or adjusting how the user can resize the column.

### Auto grow column

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

Note that if the user adjusts any column's width, the `grow` option will be ignored and the last column will fill up the remaining space (in the above case it's `item_2`).

### Disable column resize

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

### Conditionally hide columns

You can conditionally hide columns by defining `show` option.

```ts
import { useTable } from '@globalbrain/sefirot/lib/composables/Table'

const options = useTable({
  orders: ['name', 'age', 'email'],

  columns: computed(() => ({
    name: { ... },
    age: { ... },
    email: {
      label: 'Email',
      show: showEmail
    }
  }))
  ...
})
```

::: warning Limitation when using with `grow` option
When toggling the `show` option on a column with the `grow` option set to `true`, the auto-growing feature will be disabled. It is recommended to avoid using the `grow` option on columns that might be hidden.
:::

## Records & Cell options

The records are each row of data in the table and the cell is each item within the record. You may define various types of cells such as text, pill, or date.

### Text cell

You may use `type: 'text'` cell to define the cell as a text type. Use this cell to display any kind of text. However, when displaying more data with more specific formats, consider using other cell types such as `type: 'number'` or `type: 'day'`.

```ts
const options = useTable({
  orders: ['name'],
  columns: {
    age: {
      label: 'Name',
      cell: {
        type: 'text'
      }
    }
  }
})
```

Below are the complete list of options you may pass to the text type cell.

```ts
export interface TableCellText {
  // Type of the cell. Must be `text`.
  type: 'text'

  // The alignment of the value in the cell. Defaults to `left`.
  align?: 'left' | 'center' | 'right'

  // Icon to display in front of the value.
  icon?: Component

  // The value for the cell. If omitted, it will use the value
  // from the record.
  value?: string | null

  // URL to link the value. When specified, cell becomes a link.
  link?: string | null

  // Color of the value. Defaults to `neutral`.
  color?: TableCellValueColor

  // Color of the icon. If not defined, it will use the same
  // color as `color` option.
  iconColor?: TableCellValueColor

  // When defined, this callback gets called when user clicks
  // on the cell.
  onClick?(value: any, record: any): void
}

export type TableCellValueColor =
  | 'neutral'
  | 'soft'
  | 'mute'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
```

### Number cell

You may use `type: 'number'` cell to define the cell as a number type. It has several number-specific options and also it changes the font style to monospace so that all numbers in the table get aligned.

```ts
const options = useTable({
  orders: ['age'],
  columns: {
    age: {
      label: 'Age',
      cell: {
        type: 'number'
      }
    }
  }
})
```

Below are the complete list of options you may pass to the number type cell.

```ts
export interface TableCellNumber {
  // Type of the cell. Must be `number`.
  type: 'number'

  // The alignment of the value in the cell. Defaults to `left`.
  align?: 'left' | 'center' | 'right'

  // Icon to display in front of the value.
  icon?: Component

  // The value for the cell. If omitted, it will use the value
  // from the record.
  value?: number | null

  // When set to `true`, it will display the value with
  // thousand separator. e.g. 1000 -> 1,000.
  separator?: boolean

  // URL to link the value. When specified, cell becomes a link.
  link?: string | null

  // Color of the value. Defaults to `neutral`.
  color?: TableCellValueColor

  // Color of the icon. If not defined, it will use the same
  // color as `color` option.
  iconColor?: TableCellValueColor

  // When defined, this callback gets called when user clicks
  // on the cell.
  onClick?(value: any, record: any): void
}

export type TableCellValueColor =
  | 'neutral'
  | 'soft'
  | 'mute'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
```

### Actions cell

Actions type cell displays any number of actions as a clickable button in the cell by defining `type: 'actions'`. Usually, place actions at the end of the column.

```ts
import IconNotePencil from '~icons/ph/note-pencil'
import IconTrash from '~icons/ph/trash'

const options = useTable({
  orders: ['actions'],
  columns: {
    age: {
      cell: {
        type: 'actions',
        actions: [
          { icon: IconNotePencil, onClick: () => {} },
          { icon: IconTrash, onClick: () => {} }
        ]
      }
    }
  }
})
```

Below are the complete list of options you may pass to the actions type cell. Each action is a `<SButton :type="text">` instances. You may pass options such as `mode` or `label` to them. 

```ts
interface TableCellActions {
  // Type of the cell. Must be `actions`.
  type: 'number'

  // Options for button stylings. Refer to `<SButton>` docs
  // for more details. Note that for actions, `type` is fixed
  // to `text`, and `mode` defaults to `mute`.
  mode?: ColorModes
  icon?: Component
  iconMode?: ColorModes
  label?: string
  labelMode?: ColorModes

  // Callback function when the button is clicked.
  onClick(record: any): void

  // Whether to show the button for the record.
  show?(record: any): boolean
}

type ColorModes =
  | 'default'
  | 'mute'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
```

### Summary row

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

## Footer options

The footer is the very bottom part of the table. The footer provides features such as pagination.

### Pagination

By passing in `total`, `page`, and `perPage` option, the table footer gets displayed with pagination. You can listen to "Prev" and "Next" buttons and click callback via `onPrev` and `onNext` option. Note that if both `onPrev` or `onNext` is not defined, it will not show the "Prev" and "Next" buttons.

```ts
const options = useTable({
  total: 50,
  page: 1,
  perPage: 25,
  onPrev: () => { ... },
  onNext: () => { ... }
})
```

### Hide Footer

The footer gets displayed when it has any data to display. For example, fotter gets displayed when  pagination options are set.

If you would like to display or hide the footer regardless of the other options present, set `boolean` to `footer` option.

```ts
const options = useTable({
  footer: true
})
```

## Props

Here are the list of props you may pass to the component.

### `:options`

The whole definition of the table. The `Table` object should be created via `useTable` composable. For the details on each option, please refer to the corresponding section of this document.

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

You may also adjust the border-radius via `--table-border-radius` variable.

```css
:root {
  --table-border: 1px solid var(--c-divider);

  --table-border-top: var(--table-border);
  --table-border-right: var(--table-border);
  --table-border-bottom: var(--table-border);
  --table-border-left: var(--table-border);

  --table-border-radius: 6px;
}
```
