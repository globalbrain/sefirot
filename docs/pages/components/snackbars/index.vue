<template>
  <div class="ComponentsSnackbars u-story">
    <div class="u-story-content">
      <h1>Snackbars</h1>
      <p>Snackbars provide brief messages about app processes at the bottom of the screen.</p>

      <section>
        <h2>Vue Component</h2>

        <SSnackbar />
      </section>
    </div>
  </div>
</template>

<script>
import SSnackbar from '@/components/stories/snackbars/SSnackbar'

export default {
  components: {
    SSnackbar
  },

  head: {
    title: 'Snackbars'
  },

  scrollToTop: true
}
</script>
