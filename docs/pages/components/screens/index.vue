<template lang="md">
# Screens

Screens is full screen modal like component.

<StoryScreenShowcase />

## API

<SpecProps :props="props" />
</template>

<script>
import StoryScreenShowcase from '@/components/StoryScreenShowcase'
import SpecProps from '@/components/SpecProps'

export default {
  components: {
    StoryScreenShowcase,
    SpecProps
  },

  data () {
    return {
      props: [
        {
          name: 'name',
          type: 'String',
          required: true,
          default: '—',
          description: 'The name for the screen. The value is used when opening modal through Vuex Action.'
        },
        {
          name: 'title',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The title text for the screen.'
        }
      ]
    }
  },

  head: {
    title: 'Screens'
  },

  scrollToTop: true
}
</script>
