<template lang="md">
# Screens

Screens is full screen modal like component.

<ShowcaseScreen />

## API

<SpecProps :props="props" />
</template>

<script>
import ShowcaseScreen from '@/components/stories/screens/ShowcaseScreen'
import SpecProps from '@/components/specs/SpecProps'

export default {
  components: {
    ShowcaseScreen,
    SpecProps
  },

  head: {
    title: 'Screens'
  },

  scrollToTop: true,

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
  }
}
</script>
