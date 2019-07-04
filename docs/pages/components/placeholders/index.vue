<template>
  <PageBase class="ComponentsPlaceholders u-story">
    <div class="u-story-content">
      <h1>Placeholders</h1>
      <p>Placeholders are for showing temporary state when waiting for a certain component to be loaded, for example, a preloader icon could be shown while waiting for an image to be downloaded.</p>

      <section>
        <h2>Vue Component</h2>

        <SPlaceholder />
      </section>
    </div>
  </PageBase>
</template>

<script>
import PageBase from '@/components/pages/PageBase'
import SPlaceholder from '@/components/stories/placeholders/SPlaceholder'

export default {
  components: {
    PageBase,
    SPlaceholder
  },

  head: {
    title: 'Placeholders'
  },

  scrollToTop: true
}
</script>
