<template>
  <div class="ComponentsModalsAlert u-story">
    <div class="u-story-content">
      <h1>Modals: Alert</h1>
      <p>Alert dialogs interrupt users with urgent information, details, or actions.</p>

      <section>
        <h2>Vue Component</h2>

        <SAlert />
      </section>
    </div>
  </div>
</template>

<script>
import SAlert from '@/components/stories/modals/SAlert'

export default {
  components: {
    SAlert
  },

  head: {
    title: 'Modals: Alert'
  },

  scrollToTop: true
}
</script>
