<template lang="md">
# Modals: Alert

Alert dialogs interrupt users with urgent information, details, or actions.

<StoryAlertsShowcase />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryAlertsShowcase from '@/components/StoryAlertsShowcase.vue'

export default defineComponent({
  components: {
    StoryAlertsShowcase
  },

  scrollToTop: true,

  head: {
    title: 'Modals: Alert'
  }
})
</script>
