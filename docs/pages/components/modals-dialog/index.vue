<template lang="md">
# Modals: Dialog

Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.

<StoryDialogsShowcase />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryDialogsShowcase from '@/components/StoryDialogsShowcase.vue'

export default defineComponent({
  components: {
    StoryDialogsShowcase
  },

  scrollToTop: true,

  head: {
    title: 'Modals: Dialog'
  }
})
</script>
