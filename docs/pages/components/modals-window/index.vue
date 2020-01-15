<template lang="md">
# Modals: Window

A window is a most customizable modal component which can display almost anything.

<StoryWindowShowcase />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script>
import StoryWindowShowcase from '@/components/StoryWindowShowcase'
import SpecProps from '@/components/SpecProps'
import SpecEvents from '@/components/SpecEvents'

export default {
  components: {
    StoryWindowShowcase,
    SpecProps,
    SpecEvents
  },

  data () {
    return {
      props: [
        {
          name: 'name',
          type: 'String',
          required: true,
          default: '—',
          description: 'The name for the window. The value is used when opening modal through Vuex Action.'
        },
        {
          name: 'title',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The title text for the window.'
        },
        {
          name: 'lead',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The lead text for the window. Only visible when `title` is not null.'
        },
        {
          name: 'actions',
          type: 'Array',
          required: false,
          default: 'null',
          description: 'Adds action buttons at end of the window. The array should contain object with properties of `type`, `mode`, `label`, and `callback`. `type`, `mode`, and `label` is same as "SButton" props, and `callback` should be a function which will be triggered when users clicks the button.'
        },
        {
          name: 'closable',
          type: 'Boolean',
          required: false,
          default: 'false',
          description: 'When this is set to true, users may click backdrop to close the modal. Also, the close icon will be shown at the top right of the window.'
        }
      ],

      events: [
        {
          name: 'before-open',
          description: 'Fires before opening window.'
        },
        {
          name: 'openend',
          description: 'Fires when window is opened.'
        },
        {
          name: 'before-close',
          description: 'Fires before closing window.'
        },
        {
          name: 'closed',
          description: 'Fires when window is closed.'
        }
      ]
    }
  },

  head: {
    title: 'Modals: Window'
  },

  scrollToTop: true
}
</script>
