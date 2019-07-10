<template lang="md">
# Placeholders: Blank

Placeholders are for showing temporary state when waiting for a certain component to be loaded, for example, a preloader icon could be shown while waiting for an image to be downloaded.

<ShowcasePlaceholderBlank />

## API

<SpecProps :props="props" />
</template>

<script>
import ShowcasePlaceholderBlank from '@/components/stories/placeholders/ShowcasePlaceholderBlank'
import SpecProps from '@/components/specs/SpecProps'

export default {
  components: {
    ShowcasePlaceholderBlank,
    SpecProps
  },

  head: {
    title: 'Placeholders: Blank'
  },

  scrollToTop: true,

  data () {
    return {
      props: [
        {
          name: 'loaded',
          type: 'Boolean',
          required: true,
          default: '—',
          description: 'Whether the content is loaded or not.'
        }
      ]
    }
  }
}
</script>
