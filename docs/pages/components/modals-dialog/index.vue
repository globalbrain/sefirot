<template>
  <div class="ComponentsModalsDialog u-story">
    <div class="u-story-content">
      <h1>Modals: Dialog</h1>
      <p>Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.</p>

      <section>
        <h2>Vue Component</h2>

        <SDialog />
      </section>
    </div>
  </div>
</template>

<script>
import SDialog from '@/components/stories/modals/SDialog'

export default {
  components: {
    SDialog
  },

  head: {
    title: 'Modals: Dialog'
  },

  scrollToTop: true
}
</script>
