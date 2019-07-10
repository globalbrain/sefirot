<template lang="md">
# Grids

Grids displays sets of data.

<ShowcaseGrid />

## Examples

<ExampleBasicGrid />
<ExampleMultiItemGrid />
<ExampleWithHeader />
<ExampleWithLinkAction />
<ExampleWithSingleAction />
<ExampleWithMultiActions />
<ExampleLoadingState />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script>
import ShowcaseGrid from '@/components/stories/grids/ShowcaseGrid'
import ExampleBasicGrid from '@/components/stories/grids/ExampleBasicGrid'
import ExampleMultiItemGrid from '@/components/stories/grids/ExampleMultiItemGrid'
import ExampleWithHeader from '@/components/stories/grids/ExampleWithHeader'
import ExampleWithLinkAction from '@/components/stories/grids/ExampleWithLinkAction'
import ExampleWithSingleAction from '@/components/stories/grids/ExampleWithSingleAction'
import ExampleWithMultiActions from '@/components/stories/grids/ExampleWithMultiActions'
import ExampleLoadingState from '@/components/stories/grids/ExampleLoadingState'
import SpecProps from '@/components/specs/SpecProps'
import SpecEvents from '@/components/specs/SpecEvents'

export default {
  components: {
    ShowcaseGrid,
    ExampleBasicGrid,
    ExampleMultiItemGrid,
    ExampleWithHeader,
    ExampleWithLinkAction,
    ExampleWithSingleAction,
    ExampleWithMultiActions,
    ExampleLoadingState,
    SpecProps,
    SpecEvents
  },

  head: {
    title: 'Grids'
  },

  scrollToTop: true,

  data () {
    return {
      props: [
        {
          name: 'columns',
          type: 'Array',
          required: true,
          default: '—',
          description: 'The columns for the grid. The array should contain object with properties of `name` and  `label`. `name` is used as class name for the column.'
        },
        {
          name: 'records',
          type: 'Array',
          required: true,
          default: '—',
          description: 'The records for the grid. The array must contain object with property of primary key.'
        },
        {
          name: 'actions',
          type: 'String | Object | Array',
          required: false,
          default: 'null',
          description: 'The actions for each row. For String, it accepts `link` as the only value. For Object, it must contain properties of `icon` and `callback`. For Array, it must contain objects with properties of `name`, `icon` and `callback`.'
        },
        {
          name: 'primary-key',
          type: 'String',
          required: false,
          default: 'id',
          description: 'The primary key to use as `:key` bind for each row.'
        },
        {
          name: 'clickable',
          type: 'Boolean',
          required: false,
          default: 'true',
          description: 'Whether each rows can be clicked.'
        },
        {
          name: 'loading',
          type: 'Boolean',
          required: false,
          default: 'false',
          description: 'Show loading indicator.'
        }
      ],

      events: [
        {
          name: 'click',
          description: 'Fires when a user clicks a row. Only fires when `clickable` prop is `true`. It will also pass the corresponding record as the first argument.'
        }
      ]
    }
  }
}
</script>
