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

## Props

Here are the list of props you may pass to the component.

### `:options`

The whole definition of the table. The `Table` object should be created via `useTable` composable. For the details on each options, please refer to the corresponding section of this document.

```ts
interface Props {
  options?: Table
}

interface Table {
  orders: string[]
  columns: TableColumns
  records?: Record<string, any>[] | null
  total?: number | null
  page?: number | null
  perPage?: number | null
  reset?: boolean
  borderless?: boolean
  loading?: boolean
  onPrev?(): void
  onNext?(): void
  onReset?(): void
}

interface TableColumns {
  [name: string]: TableColumn
}

interface TableColumn {
  label: string
  className?: string
  dropdown?: DropdownSection[]
  cell?: TableCell | ((value: any, record: any) => TableCell)
}

type TableCell =
  | TableCellText
  | TableCellDay
  | TableCellPill
  | TableCellPills
  | TableCellAvatar
  | TableCellAvatars
  | TableCellComponent

type TableCellType =
  | 'text'
  | 'day'
  | 'pill'
  | 'pills'
  | 'avatar'
  | 'avatars'
  | 'component'

interface TableCellBase {
  type: TableCellType
}

interface TableCellText extends TableCellBase {
  type: 'text'
  icon?: any
  value?: string | ((value: any, record: any) => string)
  link?(value: any, record: any): string
  color?: TableCellTextColor | ((value: any, record: any) => TableCellTextColor)
  iconColor?: TableCellTextColor | ((value: any, record: any) => TableCellTextColor)
  onClick?(value: any, record: any): void
}

type TableCellTextColor =
  | 'neutral'
  | 'soft'
  | 'mute'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'

interface TableCellDay extends TableCellBase {
  type: 'day'
  format?: string
  color?: 'neutral' | 'soft' | 'mute'
}

interface TableCellPill extends TableCellBase {
  type: 'pill'
  value?: string | ((value: any) => string)
  color?: TableCellPillColor | ((value: any) => TableCellPillColor)
}

type TableCellPillColor =
  | 'neutral'
  | 'mute'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'

interface TableCellPills extends TableCellBase {
  type: 'pills'
  pills(value: any, record: any): TableCellPillItem[]
}

interface TableCellPillItem {
  label: string
  color: TableCellPillColor
}

interface TableCellAvatar extends TableCellBase {
  type: 'avatar'
  image?(value: any, record: any): string | undefined
  name?(value: any, record: any): string
  link?(value: any, record: any): string
  color?: 'neutral' | 'soft' | 'mute'
}

interface TableCellAvatars extends TableCellBase {
  type: 'avatars'
  avatars(value: any, record: any): TableCellAvatarsOption[]
  color?: 'neutral' | 'soft' | 'mute'
}

interface TableCellComponent extends TableCellBase {
  type: 'component'
  component: Component
  props?: Record<string, any>
}

interface TableCellAvatarsOption {
  image?: string
  name?: string
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

### Table padding on both sides

You may define `--table-padding-right` and `--table-padding-left` to adjust the padding of the table. This is useful when you want to have "full width" table and increase the first and last cell item padding.

```css
:root {
  --table-padding-right: 0;
  --table-padding-left: 0;
}
```
