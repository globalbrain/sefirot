<template lang="md">
# Responsive

A Responsive component handles content size changes, and add as a class name. It's very useful when you need a media query against the container element instead of the viewport of the window.

<StoryResponsiveShowcase />

## API

<SpecProps :props="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryResponsiveShowcase from '@/components/StoryResponsiveShowcase.vue'
import SpecProps from '@/components/SpecProps.vue'
import { useSpec } from '@/composables/Spec'

export default defineComponent({
  components: {
    StoryResponsiveShowcase,
    SpecProps
  },

  scrollToTop: true,

  setup() {
    return useSpec({
      props: [
        {
          name: 'bp',
          type: 'BP',
          required: false,
          default: '{}',
          description: 'The breakpoints for the container.'
        }
      ]
    })
  },

  head: {
    title: 'Responsive'
  }
})
</script>
