<template lang="md">
# Screens

Screens is full screen modal like component.

<StoryScreenShowcase />

## API

<SpecProps :props="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryScreenShowcase from '@/components/StoryScreenShowcase.vue'
import SpecProps from '@/components/SpecProps.vue'
import { useSpec } from '@/composables/Spec'

export default defineComponent({
  components: {
    StoryScreenShowcase,
    SpecProps
  },

  scrollToTop: true,

  setup() {
    return useSpec({
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
    })
  },

  head: {
    title: 'Screens'
  }
})
</script>
