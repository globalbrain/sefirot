<template lang="md">
# Grids

Grids displays sets of data.

<StoryGridShowcase />

## Examples

<!-- <StoryGridEXBasic />
<StoryGridEXMultiItemGrid />
<StoryGridEXWithHeader />
<StoryGridEXWithLinkAction />
<StoryGridEXWithSingleAction />
<StoryGridEXWithMultiActions />
<StoryGridEXLoadingState /> -->

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import StoryGridShowcase from '@/components/StoryGridShowcase.vue'
// import StoryGridEXBasicGrid from '@/components/StoryGridEXBasic.vue'
// import StoryGridEXMultiItemGrid from '@/components/StoryGridEXMultiItem.vue'
// import StoryGridEXWithHeader from '@/components/StoryGridEXWithHeader.vue'
// import StoryGridEXWithLinkAction from '@/components/StoryGridEXWithLinkAction.vue'
// import StoryGridEXWithSingleAction from '@/components/StoryGridEXWithSingleAction.vue'
// import StoryGridEXWithMultiActions from '@/components/StoryGridEXWithMultiActions.vue'
// import StoryGridEXLoadingState from '@/components/StoryGridEXLoadingState.vue'
import SpecProps, { Prop } from '@/components/SpecProps.vue'
import SpecEvents, { Event } from '@/components/SpecEvents.vue'

export default createComponent({
  components: {
    StoryGridShowcase,
    // StoryGridEXBasicGrid,
    // StoryGridEXMultiItemGrid,
    // StoryGridEXWithHeader,
    // StoryGridEXWithLinkAction,
    // StoryGridEXWithSingleAction,
    // StoryGridEXWithMultiActions,
    // StoryGridEXLoadingState,
    SpecProps,
    SpecEvents
  },

  data () {
    return {
      props: [
        {
          name: 'columns',
          type: 'Array',
          required: true,
          default: '—',
          description: 'The columns for the grid. The array should contain an object with properties of `name` ,  `label`, and `style`. `name` is used as a class name for the column. If `style` is defined, it will be added as inline CSS style for the column.'
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
  },

  head: {
    title: 'Grids'
  },

  scrollToTop: true
})
</script>
