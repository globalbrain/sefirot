<template>
  <PageBase class="ComponentsPlaceholders u-story">
    <div class="u-story-content">
      <h1>Placeholders</h1>
      <p>Placeholders are for showing temporary state when waiting for a certain component to be loaded, for example, a preloader icon could be shown while waiting for an image to be downloaded.</p>

      <section>
        <h2>Vue Component</h2>

        <SPlaceholderBlank />
        <SPlaceholderImage />
      </section>
    </div>
  </PageBase>
</template>

<script>
import PageBase from '@/components/pages/PageBase'
import SPlaceholderBlank from '@/components/stories/placeholders/SPlaceholderBlank'
import SPlaceholderImage from '@/components/stories/placeholders/SPlaceholderImage'

export default {
  components: {
    PageBase,
    SPlaceholderBlank,
    SPlaceholderImage
  },

  head: {
    title: 'Placeholders'
  },

  scrollToTop: true
}
</script>
