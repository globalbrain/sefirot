<template>
  <PageBase class="ComponentsModalsAlert u-story">
    <div class="u-story-content">
      <h1>Modals: Alert</h1>
      <p>Alert dialogs interrupt users with urgent information, details, or actions.</p>

      <section>
        <h2>Vue Component</h2>

        <SAlert />
      </section>
    </div>
  </PageBase>
</template>

<script>
import PageBase from '@/components/pages/PageBase'
import SAlert from '@/components/stories/modals/SAlert'

export default {
  components: {
    PageBase,
    SAlert
  },

  head: {
    title: 'Modals: Alert'
  },

  scrollToTop: true
}
</script>
