<template>
  <PageBase class="ComponentsButtons u-story">
    <div class="u-story-content">
      <h1>Buttons</h1>
      <p>Buttons allow users to take actions, and make choices, with a single tap.</p>

      <section>
        <h2>Vue Component</h2>

        <SButton />
      </section>
    </div>
  </PageBase>
</template>

<script>
import PageBase from '@/components/pages/PageBase'
import SButton from '@/components/stories/buttons/SButton'

export default {
  components: {
    PageBase,
    SButton
  },

  head: {
    title: 'Buttons'
  },

  scrollToTop: true
}
</script>
