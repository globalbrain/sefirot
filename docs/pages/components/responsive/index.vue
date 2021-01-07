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
import SpecProps, { Prop } from '@/components/SpecProps.vue'

export default defineComponent({
  components: {
    StoryResponsiveShowcase,
    SpecProps
  },

  scrollToTop: true,

  setup() {
    const props: Prop[] = [
      {
        name: 'bp',
        type: 'BP',
        required: false,
        default: '{}',
        description: 'The breakpoints for the container.'
      }
    ]

    return {
      props
    }
  },

  head: {
    title: 'Responsive'
  }
})
</script>
