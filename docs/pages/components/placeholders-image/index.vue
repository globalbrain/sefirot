<template lang="md">
# Placeholders: Image

Placeholders are for showing temporary state when waiting for a certain component to be loaded, for example, a preloader icon could be shown while waiting for an image to be downloaded.

<ShowcasePlaceholderImage />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script>
import ShowcasePlaceholderImage from '@/components/stories/placeholders/ShowcasePlaceholderImage'
import SpecProps from '@/components/specs/SpecProps'
import SpecEvents from '@/components/specs/SpecEvents'

export default {
  components: {
    ShowcasePlaceholderImage,
    SpecProps,
    SpecEvents
  },

  data () {
    return {
      props: [
        {
          name: 'img',
          type: 'String',
          required: true,
          default: '—',
          description: 'The path (`src`) for the image.'
        },
        {
          name: 'width',
          type: 'Number',
          required: true,
          default: '—',
          description: 'The width of the image.'
        },
        {
          name: 'height',
          type: 'Number',
          required: true,
          default: '—',
          description: 'The height of the image.'
        },
        {
          name: 'delay',
          type: 'Number',
          required: false,
          default: '0',
          description: 'Delay showing the image after it is loaded. The value is in ms.'
        }
      ],

      events: [
        {
          name: 'load',
          description: 'Fires when the image is loaded. It will be fired after the `delay`.'
        }
      ]
    }
  },

  head: {
    title: 'Placeholders: Image'
  },

  scrollToTop: true
}
</script>
