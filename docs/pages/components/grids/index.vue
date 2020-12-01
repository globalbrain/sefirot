<template lang="md">
# Grids

Grids displays sets of data.

<StoryGridShowcase />

## Examples

<StoryGridEXBasic />
<StoryGridEXMultiItem />
<StoryGridEXWithLinkAction />
<StoryGridEXWithSingleAction />
<StoryGridEXWithMultiActions />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryGridShowcase from '@/components/StoryGridShowcase.vue'
import StoryGridEXBasic from '@/components/StoryGridEXBasic.vue'
import StoryGridEXMultiItem from '@/components/StoryGridEXMultiItem.vue'
import StoryGridEXWithLinkAction from '@/components/StoryGridEXWithLinkAction.vue'
import StoryGridEXWithSingleAction from '@/components/StoryGridEXWithSingleAction.vue'
import StoryGridEXWithMultiActions from '@/components/StoryGridEXWithMultiActions.vue'
import SpecProps, { Prop } from '@/components/SpecProps.vue'
import SpecEvents, { Event } from '@/components/SpecEvents.vue'

export default defineComponent({
  components: {
    StoryGridShowcase,
    StoryGridEXBasic,
    StoryGridEXMultiItem,
    StoryGridEXWithLinkAction,
    StoryGridEXWithSingleAction,
    StoryGridEXWithMultiActions,
    SpecProps,
    SpecEvents
  },

  scrollToTop: true,

  setup () {
    const props: Prop[] = [
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
      }
    ]

    const events: Event[] = [
      {
        name: 'click',
        description: 'Fires when a user clicks a row. Only fires when `clickable` prop is `true`. It will also pass the corresponding record as the first argument.'
      }
    ]

    return {
      props,
      events
    }
  },

  head () {
    return {
      title: 'Grids'
    }
  }
})
</script>
