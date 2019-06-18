<template>
  <PageBase class="ComponentsModalsWindow u-story">
    <div class="u-story-content">
      <h1>Modals: Window</h1>
      <p>A window is a most customizable modal component which can display almost anything.</p>

      <section>
        <h2>Vue Component</h2>

        <SWindow />
      </section>
    </div>
  </PageBase>
</template>

<script>
import PageBase from '@/components/pages/PageBase'
import SWindow from '@/components/stories/modals/SWindow'

export default {
  components: {
    PageBase,
    SWindow
  },

  head: {
    title: 'Modals: Window'
  },

  scrollToTop: true
}
</script>
